// /src/produtos/clientes/dam/cadastro_clientes.js

const API_HOST = "http://127.0.0.1:3000";

const formCliente = document.getElementById("form-cliente");
const carregandoMsg = document.getElementById("carregando-msg");
const btnSalvar = document.getElementById("btn-salvar");
const iconSalvar = document.getElementById("icon-salvar");
const textSalvar = document.getElementById("text-salvar");
const loadingSalvar = document.getElementById("loading-salvar");

// Elementos de Endereço
const corpoTabelaEnderecos = document.getElementById("corpo-tabela-enderecos");
const formEnderecoContainer = document.getElementById("form-endereco-container");
const msgSemEnderecos = document.getElementById("msg-sem-enderecos");

// Modal Elements
const modalGlobal = document.getElementById("modal-global");
const modalTitulo = document.getElementById("modal-titulo");
const modalMensagem = document.getElementById("modal-mensagem");
const modalAcoes = document.getElementById("modal-acoes");

let textos = {};

const valores = {
    id: null,
    tipo_pessoa: "PF",
    ativo: true,
    nome: null,
    apelido: null,
    documento_federal: null,
    documento_estadual: null,
    sexo: null,
    data_nascimento: null,
    enderecos: []
};

// --- FUNÇÕES DE MÁSCARA (REGEX PURO) ---

function mascaraDocumento(input) {
    let v = input.value;
    const tipo = valores.tipo_pessoa;

    if (tipo === 'PF') {
        // Máscara CPF: 000.000.000-00
        v = v.replace(/\D/g, ""); // Remove tudo que não é dígito
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        input.maxLength = 14;
    } else {
        // Máscara CNPJ: 00.000.000/0000-00
        v = v.replace(/\D/g, "");
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
        input.maxLength = 18;
    }
    input.value = v;
}

function mascaraCEP(input) {
    let v = input.value.replace(/\D/g, "");
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    input.value = v;
}

function mascaraNumeros(input) {
    input.value = input.value.replace(/\D/g, "");
}

// --- SISTEMA DE MODAL SUAVE ---

function mostrarModal(titulo, mensagem, callbackConfirmar = null) {
    modalTitulo.innerText = titulo;
    modalMensagem.innerHTML = mensagem; // Permite HTML simples (quebra de linha)
    modalAcoes.innerHTML = ''; // Limpa botões anteriores

    // Botão de fechar/cancelar (sempre existe)
    const btnCancelar = document.createElement('button');
    btnCancelar.innerText = callbackConfirmar ? 'Cancelar' : 'OK';
    btnCancelar.className = 'modal-btn btn-secundario';
    btnCancelar.onclick = fecharModal;
    modalAcoes.appendChild(btnCancelar);

    // Se houver callback, cria botão de confirmação
    if (callbackConfirmar) {
        const btnConfirmar = document.createElement('button');
        btnConfirmar.innerText = 'Confirmar';
        btnConfirmar.className = 'modal-btn btn-primario';
        btnConfirmar.onclick = () => {
            fecharModal();
            callbackConfirmar();
        };
        modalAcoes.appendChild(btnConfirmar);
    }

    modalGlobal.classList.add('mostrar');
}

function fecharModal() {
    modalGlobal.classList.remove('mostrar');
}

// --- LÓGICA DO SISTEMA ---

function alternarEstadoBotaoSalvar(salvando) {
    if (salvando) {
        btnSalvar.setAttribute('disabled', true);
        iconSalvar.classList.add('esconder');
        textSalvar.textContent = textos.botao_salvando || 'Salvando...';
        loadingSalvar.classList.remove('esconder');
    } else {
        btnSalvar.removeAttribute('disabled');
        iconSalvar.classList.remove('esconder');
        textSalvar.textContent = textos.botao_salvar || 'Salvar Cliente';
        loadingSalvar.classList.add('esconder');
    }
}

async function iniciar() {
    try {
        const respTextos = await fetch('../dam/textos.json');
        if (respTextos.ok) textos = await respTextos.json();
        
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id) {
            await carregarCliente(id);
        } else {
            prepararNovoCadastro();
        }
    } catch (error) {
        console.error(error);
        mostrarModal("Erro", "Erro crítico ao iniciar a página.");
    }
}

async function carregarCliente(id) {
    try {
        const resp = await fetch(`${API_HOST}/clientesDam/id/${id}`);
        if (!resp.ok) throw new Error("Erro ao buscar cliente");
        
        const json = await resp.json();
        const cliente = json.data || json;

        Object.assign(valores, cliente);
        
        // Formatar documentos para exibição com máscara
        if (cliente.tipo_pessoa === 'PF') {
            valores.documento_federal = cliente.cpf;
            valores.documento_estadual = cliente.rg;
            if(cliente.data_nascimento) valores.data_nascimento = cliente.data_nascimento.split('T')[0];
        } else {
            valores.documento_federal = cliente.cnpj;
            valores.documento_estadual = cliente.inscricao_estadual;
        }

        // Preenche inputs
        document.getElementById('id').value = valores.id;
        
        // Seta o Radio do Tipo Pessoa
        const radioTipo = document.querySelector(`input[name="tipo_pessoa"][value="${valores.tipo_pessoa}"]`);
        if(radioTipo) radioTipo.checked = true;

        document.getElementById('nome').value = valores.nome;
        document.getElementById('apelido').value = valores.apelido;
        document.getElementById('documento_federal').value = valores.documento_federal;
        document.getElementById('documento_estadual').value = valores.documento_estadual;
        document.getElementById('data_nascimento').value = valores.data_nascimento;
        
        // Seta Sexo
        if (valores.sexo) {
            const radioSexo = document.querySelector(`input[name="sexo"][value="${valores.sexo}"]`);
            if (radioSexo) radioSexo.checked = true;
        }
        
        // Seta Ativo (Toggle Switch)
        const toggleAtivo = document.getElementById('ativo_toggle');
        toggleAtivo.checked = valores.ativo;
        document.getElementById('texto-ativo-status').innerText = valores.ativo ? "Sim" : "Não";

        // Aplica máscaras visuais nos dados carregados
        mascaraDocumento(document.getElementById('documento_federal'));

        alternarTipoPessoa(valores.tipo_pessoa);
        renderizarTabelaEnderecos();
        finalizarCarregamento();

    } catch (e) {
        console.error(e);
        mostrarModal("Erro", "Falha ao carregar dados do cliente.");
    }
}

function prepararNovoCadastro() {
    alternarTipoPessoa('PF');
    finalizarCarregamento();
}

function finalizarCarregamento() {
    carregandoMsg.classList.add('esconder');
    formCliente.classList.remove('esconder');
}

function alternarTipoPessoa(tipo) {
    valores.tipo_pessoa = tipo;
    
    // Limpa campo de documento ao trocar para não ficar máscara errada
    const docInput = document.getElementById('documento_federal');
    docInput.value = ""; 
    docInput.focus();

    const camposPF = document.querySelectorAll('[data-visible="F"]');
    camposPF.forEach(el => {
        if (tipo === 'PF') el.classList.remove('esconder');
        else el.classList.add('esconder');
    });

    aplicarTextos(tipo);
}

function aplicarTextos(tipo) {
    if (!textos || Object.keys(textos).length === 0) return;

    const setTxt = (dataAttr, txt) => {
        const el = document.querySelector(`[${dataAttr}]`);
        if (el) el.innerText = txt;
    };

    // Textos Gerais
    setTxt('data-texto-titulo-endereco', textos.titulo_endereco);
    setTxt('data-texto-botao-novo-endereco', textos.novo_endereco);
    setTxt('data-texto-botao-salvar', textos.botao_salvar);
    setTxt('data-texto-botao-cancelar', textos.botao_cancelar);
    setTxt('data-texto-cep', textos.cep);
    // ... adicione os outros textos conforme seu JSON ...

    if (tipo === 'PF') {
        setTxt('data-texto-titulo', textos.titulo_tpf || "Cadastro Pessoa Física");
        setTxt('data-texto-documento-federal', "CPF");
        setTxt('data-texto-documento-estadual', "RG");
    } else {
        setTxt('data-texto-titulo', textos.titulo_tpj || "Cadastro Pessoa Jurídica");
        setTxt('data-texto-documento-federal', "CNPJ");
        setTxt('data-texto-documento-estadual', "Inscrição Estadual");
    }
}

function atualizarValor(campo, valor) {
    // Para o toggle switch
    if (campo === 'ativo') {
         valores.ativo = valor;
         document.getElementById('texto-ativo-status').innerText = valor ? "Sim" : "Não";
         return;
    }
    
    // Para outros campos
    if (valor === 'true') valor = true;
    if (valor === 'false') valor = false;
    valores[campo] = valor;
}

// --- Gerenciamento de Endereços ---

function abrirFormularioNovoEndereco() {
    limparFormularioEndereco();
    formEnderecoContainer.classList.remove('esconder');
    formEnderecoContainer.scrollIntoView({ behavior: 'smooth' });
}

function abrirFormularioEditarEndereco(index) {
    const end = valores.enderecos[index];
    
    document.getElementById('end-index').value = index;
    document.getElementById('end-id').value = end.id || '';
    document.getElementById('end-tipo').value = end.tipo_endereco;
    
    // Toggle Endereço
    document.getElementById('end-ativo').checked = end.ativo;

    document.getElementById('end-cep').value = end.cep;
    mascaraCEP(document.getElementById('end-cep')); // Aplica máscara visual

    document.getElementById('end-logradouro').value = end.logradouro;
    document.getElementById('end-numero').value = end.numero;
    document.getElementById('end-bairro').value = end.bairro;
    document.getElementById('end-cidade').value = end.cidade;
    document.getElementById('end-estado').value = end.estado;

    travarCamposEndereco(!!end.cep && end.logradouro !== '');

    formEnderecoContainer.classList.remove('esconder');
    formEnderecoContainer.scrollIntoView({ behavior: 'smooth' });
}

function salvarEnderecoNaLista() {
    const index = document.getElementById('end-index').value;
    
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

    if (!novoEnd.cep || !novoEnd.numero) {
        mostrarModal("Atenção", "CEP e Número são obrigatórios.");
        return;
    }

    if (index !== '') {
        const original = valores.enderecos[index];
        if (original) novoEnd.id_pessoa = original.id_pessoa;
        valores.enderecos[index] = novoEnd;
    } else {
        valores.enderecos.push(novoEnd);
    }

    renderizarTabelaEnderecos();
    fecharFormularioEndereco();
}

function removerEndereco(index) {
    mostrarModal("Confirmação", "Deseja realmente remover este endereço?", () => {
        const end = valores.enderecos[index];
        if (end.id) {
            // Lógica de soft delete se necessário (ex: enviar ativo=false para o back)
            // Aqui estamos removendo da lista visual
            valores.enderecos.splice(index, 1);
        } else {
            valores.enderecos.splice(index, 1);
        }
        renderizarTabelaEnderecos();
    });
}

function renderizarTabelaEnderecos() {
    corpoTabelaEnderecos.innerHTML = '';
    const enderecosVisiveis = valores.enderecos;

    if (enderecosVisiveis.length === 0) {
        msgSemEnderecos.classList.remove('esconder');
        document.getElementById('tabela-enderecos').classList.add('esconder');
        return;
    }

    msgSemEnderecos.classList.add('esconder');
    document.getElementById('tabela-enderecos').classList.remove('esconder');

    enderecosVisiveis.forEach((end, index) => {
        const tr = document.createElement('tr');
        // Exibição mais bonita do status
        const statusIcon = end.ativo 
            ? '<span style="color:green; font-weight:bold;">Ativo</span>' 
            : '<span style="color:red;">Inativo</span>';

        tr.innerHTML = `
            <td>${end.tipo_endereco}</td>
            <td>${end.logradouro}, ${end.numero} - ${end.bairro}</td>
            <td>${end.cep}</td>
            <td>${statusIcon}</td>
            <td>
                <button type="button" class="btn-secundario" onclick="abrirFormularioEditarEndereco(${index})" style="padding: 5px 10px;">✏️</button>
                <button type="button" class="btn-secundario" onclick="removerEndereco(${index})" style="padding: 5px 10px; color:red;">🗑️</button>
            </td>
        `;
        corpoTabelaEnderecos.appendChild(tr);
    });
}

function fecharFormularioEndereco() {
    formEnderecoContainer.classList.add('esconder');
    limparFormularioEndereco();
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
    travarCamposEndereco(false);
}

// --- Busca de CEP ---

async function buscarEnderecoPorCep(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
        const resp = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await resp.json();
        
        if (dados.erro) throw new Error("CEP Inválido");

        document.getElementById('end-logradouro').value = dados.logradouro;
        document.getElementById('end-bairro').value = dados.bairro;
        document.getElementById('end-cidade').value = dados.localidade;
        document.getElementById('end-estado').value = dados.uf;
        
        travarCamposEndereco(true);
        document.getElementById('end-numero').focus();

    } catch (e) {
        mostrarModal("Aviso", "CEP não encontrado ou inválido.");
        travarCamposEndereco(false);
    }
}

function travarCamposEndereco(travar) {
    const ids = ['end-logradouro', 'end-bairro', 'end-cidade', 'end-estado'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (travar) el.setAttribute('readonly', true);
        else el.removeAttribute('readonly');
    });
}

// --- Salvar Cliente ---

async function salvarCliente() {
    // Recolhe dados
    valores.nome = document.getElementById('nome').value;
    valores.apelido = document.getElementById('apelido').value;
    // Remove mascara antes de salvar no objeto se o backend espera limpo
    // Aqui assumindo que backend limpa ou aceita masc, mas ideal é limpar:
    valores.documento_federal = document.getElementById('documento_federal').value.replace(/\D/g, "");
    valores.documento_estadual = document.getElementById('documento_estadual').value.replace(/\D/g, "");
    
    if (valores.tipo_pessoa === 'PF') {
        valores.data_nascimento = document.getElementById('data_nascimento').value;
    }

    const payload = { ...valores };
    
    // Validação
    if (!payload.nome || !payload.documento_federal) {
        mostrarModal("Atenção", "Preencha os campos obrigatórios (Nome e Documento).");
        return;
    }

    // Validação de Moradia
    const temMoradia = payload.enderecos.some(end => end.tipo_endereco === 'Moradia' && end.ativo);
    if (!temMoradia) {
        mostrarModal("Erro", "É obrigatório cadastrar um endereço de <b>Moradia ativo</b>.");
        return;
    }

    // Ajuste de PF/PJ para envio
    if (payload.tipo_pessoa === 'PF') {
        payload.cpf = payload.documento_federal;
        payload.rg = payload.documento_estadual;
        payload.cnpj = null;
        payload.inscricao_estadual = null;
    } else {
        payload.cnpj = payload.documento_federal;
        payload.inscricao_estadual = payload.documento_estadual;
        payload.cpf = null;
        payload.rg = null;
        payload.data_nascimento = null;
        payload.sexo = null;
    }

    alternarEstadoBotaoSalvar(true);
    
    const metodo = valores.id ? "PUT" : "POST";
    const url = `${API_HOST}/clientesDam${valores.id ? '/id/'+valores.id : ''}`;

    try {
        const resp = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const json = await resp.json();

        if (resp.ok) {
            mostrarModal("Sucesso", "Cliente salvo com sucesso!", () => {
                voltar();
            });
        } else {
            mostrarModal("Erro", "Erro ao salvar: " + (json.mensagem || "Desconhecido"));
        }
    } catch (e) {
        console.error(e);
        mostrarModal("Erro de Conexão", "Não foi possível contactar o servidor.");
    } finally {
        alternarEstadoBotaoSalvar(false);
    }
}

function voltar() {
    window.location.href = "../dam/lista_clientes.html";
}

// Inicia
iniciar();