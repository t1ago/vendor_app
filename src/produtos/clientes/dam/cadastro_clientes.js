// /src/produtos/clientes/dam/cadastro_clientes.js

const API_HOST = "http://127.0.0.1:3000";

const SECAO_PF = document.getElementById('secao-pf');
const SECAO_PJ = document.getElementById('secao-pj');
const CAMPO_NOME_LABEL = document.getElementById('label-nome');
const CAMPO_APELIDO_LABEL = document.getElementById('label-apelido');
const FORM_END_CONTAINER = document.getElementById("form-endereco-container");
const TABELA_END_CONTAINER = document.getElementById("corpo-tabela-enderecos");
const FORM_CLIENTE = document.getElementById("form-cliente");
const CARREGANDO_MSG = document.getElementById("carregando-msg");

const valores = {
  id: null,
  tipo_pessoa: "PF", 
  ativo: true,
  nome: null,
  apelido: null,
  cpf: null,
  rg: null,
  cnpj: null,
  inscricao_estadual: null,
  sexo: null,
  data_nascimento: null,
  id_pessoa_juridica: null,
  enderecos: [], 
};

function voltar() {
  window.location.href = "../dam/lista_clientes.html" 
}

function clique_geral() {
}

function alternarTipoPessoa(tipo) {
    valores.tipo_pessoa = tipo;

    if (tipo === 'PF') {
        SECAO_PF.classList.remove('oculto');
        SECAO_PJ.classList.add('oculto');

        CAMPO_NOME_LABEL.textContent = 'Nome Completo';
        CAMPO_APELIDO_LABEL.textContent = 'Apelido/Nome Social';

        valores.cnpj = null;
        valores.inscricao_estadual = null;
        document.getElementById('cnpj').removeAttribute('required');
        document.getElementById('inscricao_estadual').removeAttribute('required');

        document.getElementById('cpf').setAttribute('required', 'required');
        document.getElementById('rg').setAttribute('required', 'required');
        document.getElementById('data_nascimento').setAttribute('required', 'required');
        document.getElementById('sexo').setAttribute('required', 'required');

    } else if (tipo === 'PJ') {
        SECAO_PF.classList.add('oculto');
        SECAO_PJ.classList.remove('oculto');

        CAMPO_NOME_LABEL.textContent = 'Razão Social';
        CAMPO_APELIDO_LABEL.textContent = 'Nome Fantasia';

        valores.cpf = null;
        valores.rg = null;
        valores.data_nascimento = null;
        valores.sexo = null;
        document.getElementById('cpf').removeAttribute('required');
        document.getElementById('rg').removeAttribute('required');
        document.getElementById('data_nascimento').removeAttribute('required');
        document.getElementById('sexo').removeAttribute('required');

        document.getElementById('cnpj').setAttribute('required', 'required');
    }
}

function atualizarCampoEndereco(index, campo, valor) {

    if (campo === 'ativo') {
        valores.enderecos[index][campo] = valor;
    } else {
        valores.enderecos[index][campo] = valor;
    }
}

function renderizarEnderecos() {
    ENDERECO_CONTAINER.innerHTML = '';
    valores.enderecos.forEach((end, index) => {
      criarBlocoEnderecoHTML(end, index);
    });
}

async function buscarEnderecoPorCep(index, cep) {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return;

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const resultado = await resposta.json();

        if (resultado.erro) throw new Error('CEP não encontrado');

        const idUnico = `endereco-${index}`;
        
        const logradouro_el = document.getElementById(`${idUnico}-logradouro`);
        logradouro_el.value = resultado.logradouro;
        logradouro_el.setAttribute('disabled', 'disabled');

        const bairro_el = document.getElementById(`${idUnico}-bairro`);
        bairro_el.value = resultado.bairro;
        bairro_el.setAttribute('disabled', 'disabled');

        const cidade_el = document.getElementById(`${idUnico}-cidade`);
        cidade_el.value = resultado.localidade;
        cidade_el.setAttribute('disabled', 'disabled');

        const estado_el = document.getElementById(`${idUnico}-estado`);
        estado_el.value = resultado.uf;
        estado_el.setAttribute('disabled', 'disabled');

        valores.enderecos[index].logradouro = resultado.logradouro;
        valores.enderecos[index].bairro = resultado.bairro;
        valores.enderecos[index].cidade = resultado.localidade;
        valores.enderecos[index].estado = resultado.uf;
        
    } catch (erro) {
        console.warn('CEP inválido ou erro na consulta:', erro);

        const idUnico = `endereco-${index}`;

const camposParaLimpar = ['logradouro', 'bairro', 'cidade', 'estado'];
        camposParaLimpar.forEach(campo => {
          const el = document.getElementById(`${idUnico}-${campo}`);
          if (el) {
            el.value = '';
            el.removeAttribute('disabled');
            valores.enderecos[index][campo] = '';
          }
        });
        
        alert("CEP não encontrado. Por favor, verifique o número.");
    }
}

async function salvarCliente() {
    const metodo = valores.id ? "PUT" : "POST";
    const url = `${API_HOST}/clientesDam`;

    valores.nome = document.getElementById("nome").value;
    valores.apelido = document.getElementById("apelido").value;
    
    if (!document.getElementById("form-cliente").reportValidity()) {
      return;
    }

    try {
        const requisicao = await fetch(url, {
          method: metodo,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(valores)
        });

        const resposta = await requisicao.json();

        if (requisicao.ok) {
          alert(`Cliente ${valores.id ? 'atualizado' : 'incluído'} com sucesso!`);
          voltar();
        } else {
          alert(`Erro: ${resposta.mensagem || 'Falha ao processar.'}`);
        }
    } catch (erro) {
        console.error("Erro de conexão:", erro);
        alert("Erro de conexão com o servidor.");
    }
}

function abrirFormularioNovoEndereco() {
    FORM_END_CONTAINER.classList.remove('oculto');
    limparFormularioEndereco();
}

function abrirFormularioEditarEndereco(index) {
    const endereco = valores.enderecos[index];
    
    document.getElementById('end-id').value = endereco.id || '';
    document.getElementById('end-index').value = index;

    document.getElementById('end-tipo').value = endereco.tipo_endereco;
    document.getElementById('end-ativo').checked = endereco.ativo;
    document.getElementById('end-cep').value = endereco.cep;
    document.getElementById('end-logradouro').value = endereco.logradouro;
    document.getElementById('end-numero').value = endereco.numero;
    document.getElementById('end-bairro').value = endereco.bairro;
    document.getElementById('end-cidade').value = endereco.cidade;
    document.getElementById('end-estado').value = endereco.estado;
    
    aplicarDesabilitacaoCEP(endereco.logradouro.length > 0);

    FORM_END_CONTAINER.classList.remove('oculto');
}

function limparFormularioEndereco() {
    document.getElementById('end-id').value = '';
    document.getElementById('end-index').value = ''; 
    document.getElementById('end-tipo').value = 'Moradia'; 
    document.getElementById('end-ativo').checked = true;
    document.getElementById('end-cep').value = '';
    document.getElementById('end-logradouro').value = '';
    document.getElementById('end-numero').value = '';
    document.getElementById('end-bairro').value = '';
    document.getElementById('end-cidade').value = '';
    document.getElementById('end-estado').value = '';

    aplicarDesabilitacaoCEP(false);
}

function cancelarEdicaoEndereco() {
    FORM_END_CONTAINER.classList.add('oculto');
    limparFormularioEndereco();
}

function salvarEndereco() {
    const index = document.getElementById('end-index').value;
    const isEditing = index !== '';
    
    const novoEnd = {
        id: document.getElementById('end-id').value || null,
        tipo_endereco: document.getElementById('end-tipo').value,
        ativo: document.getElementById('end-ativo').checked,
        cep: document.getElementById('end-cep').value,
        logradouro: document.getElementById('end-logradouro').value,
        numero: document.getElementById('end-numero').value,
        bairro: document.getElementById('end-bairro').value,
        cidade: document.getElementById('end-cidade').value,
        estado: document.getElementById('end-estado').value,
    };
    
    if (!novoEnd.cep || !novoEnd.logradouro || !novoEnd.numero) {
        alert("CEP, Logradouro e Número são obrigatórios.");
        return;
    }

    if (isEditing) {
        valores.enderecos[parseInt(index)] = novoEnd;
    } else {
        valores.enderecos.push(novoEnd);
    }

    renderizarEnderecosNaTabela();
    cancelarEdicaoEndereco();
}

function removerEndereco(index) {
    if (!confirm(`Deseja remover o Endereço de ${valores.enderecos[index].tipo_endereco}?`)) return;

    const endereco = valores.enderecos[index];

    if (endereco.id) {
        endereco.ativo = false;
        alert(`Endereço de ${endereco.tipo_endereco} será desativado no servidor após salvar o cliente.`);
    }

    valores.enderecos.splice(index, 1);
    renderizarEnderecosNaTabela();
}

function renderizarEnderecosNaTabela() {
    TABELA_END_CONTAINER.innerHTML = '';

    if (valores.enderecos.length === 0) {
        TABELA_END_CONTAINER.innerHTML = `<tr><td colspan='6'>Nenhum endereço adicionado.</td></tr>`;
        return;
    }

    valores.enderecos.forEach((end, index) => {
        const linha = document.createElement('tr');

        const ativoTexto = end.ativo ? "✅ Sim" : "❌ Não";
        const ativoStyle = end.ativo ? '' : 'style="opacity: 0.5;"';

        linha.innerHTML = `
            <td ${ativoStyle}>${end.tipo_endereco}</td>
            <td ${ativoStyle}>${end.logradouro}, ${end.numero}</td>
            <td ${ativoStyle}>${end.bairro} - ${end.cidade}/${end.estado}</td>
            <td ${ativoStyle}>${end.cep}</td>
            <td ${ativoStyle}>${ativoTexto}</td>
            <td>
                <button type="button" onclick="abrirFormularioEditarEndereco(${index})">✏️ Editar</button>
                <button type="button" onclick="removerEndereco(${index})" style="color:red;">🗑️ Remover</button>
            </td>
        `;
        TABELA_END_CONTAINER.appendChild(linha);
    });
}

function aplicarDesabilitacaoCEP(disable) {
    const campos = ['logradouro', 'bairro', 'cidade', 'estado'];
    campos.forEach(campo => {
        const el = document.getElementById(`end-${campo}`);
        if (disable) {
            el.setAttribute('disabled', 'disabled');
        } else {
            el.removeAttribute('disabled');
        }
    });
}

async function buscarEnderecoPorCep(cep) {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return;

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const resultado = await resposta.json();

        if (resultado.erro) throw new Error('CEP n�o encontrado');

        document.getElementById('end-logradouro').value = resultado.logradouro;
        document.getElementById('end-bairro').value = resultado.bairro;
        document.getElementById('end-cidade').value = resultado.localidade;
        document.getElementById('end-estado').value = resultado.uf;
        
        aplicarDesabilitacaoCEP(true);
        
        document.getElementById('end-numero').focus();
        

    } catch (erro) {
        console.warn('CEP inv�lido ou erro na consulta:', erro);

        document.getElementById('end-logradouro').value = '';
        document.getElementById('end-bairro').value = '';
        document.getElementById('end-cidade').value = '';
        document.getElementById('end-estado').value = '';
        aplicarDesabilitacaoCEP(false);

        alert("CEP n�o encontrado ou inv�lido. Por favor, digite o endere�o manualmente.");
    }
}

function iniciarNovoCadastro() {
    alternarTipoPessoa('PF'); 
    valores.enderecos.push({
        id: null, tipo_endereco: 'Moradia', ativo: true, cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
    });
    renderizarEnderecosNaTabela();

    if (CARREGANDO_MSG) CARREGANDO_MSG.classList.add('oculto');
    if (FORM_CLIENTE) FORM_CLIENTE.classList.remove('oculto');
}

async function exibirDadosParaEdicao() {
    if (CARREGANDO_MSG) CARREGANDO_MSG.classList.remove('oculto');
    if (FORM_CLIENTE) FORM_CLIENTE.classList.add('oculto');

    const url_paramentros = window.location.search;

    if (url_paramentros) {
        const parametros = new URLSearchParams(url_paramentros);
        const parametro_id = parametros.get('id');

        if (parametro_id && parametro_id.trim() !== '') {
            try {
                const requisicao = await fetch(`${API_HOST}/clientesDam/id/${parametro_id}`, { method: "GET" });

                if (requisicao.ok) {
                    const resposta = await requisicao.json();
                    const cliente = resposta.data && resposta.data.length > 0 ? resposta.data[0] : resposta;

                    Object.assign(valores, cliente);
                    const tipoPessoa = cliente.tipo_pessoa || 'PF';
                    alternarTipoPessoa(tipoPessoa); 

                    document.getElementById("id").value = cliente.id || '';
                    document.getElementById("tipo_pessoa").value = tipoPessoa;
                    document.getElementById("nome").value = cliente.nome || '';
                    document.getElementById("apelido").value = cliente.apelido || '';
                    
                    if (tipoPessoa === 'PF') {
                        document.getElementById("cpf").value = cliente.cpf || '';
                        document.getElementById("rg").value = cliente.rg || '';
                        document.getElementById("sexo").value = cliente.sexo || '';
                        const dataNascimento = cliente.data_nascimento ? new Date(cliente.data_nascimento).toISOString().split('T')[0] : '';
                        document.getElementById("data_nascimento").value = dataNascimento;
                    } else {
                        document.getElementById("cnpj").value = cliente.cnpj || '';
                        document.getElementById("inscricao_estadual").value = cliente.inscricao_estadual || '';
                    }

                    if (cliente.enderecos && cliente.enderecos.length > 0) {
                        renderizarEnderecosNaTabela();
                    }
                } else {
                    alert("Cliente não encontrado.");
                }
            } catch (erro) {
                console.error("Erro ao carregar cliente:", erro);
                alert("Erro ao carregar dados do cliente.");
            }
        } else {
            iniciarNovoCadastro();
        }

    } else {
        iniciarNovoCadastro();
    }

    if (CARREGANDO_MSG) CARREGANDO_MSG.classList.add('oculto');
    if (FORM_CLIENTE) FORM_CLIENTE.classList.remove('oculto'); 
}

exibirDadosParaEdicao();