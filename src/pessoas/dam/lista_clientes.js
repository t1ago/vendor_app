// /src/produtos/clientes/dam/lista_clientes.js

const API_HOST = "http://127.0.0.1:3000";
const el = id => document.getElementById(id);

const corpoTabela = el('corpoTabela');
const tabela = el('tabela');
const mensagem = el('mensagem');
const imagem = el('imagem');

const modalOverlay = el('modal-confirmacao');
const modalTitulo = el('modal-titulo');
const modalMensagem = el('modal-mensagem');
const btnConfirmarModal = el('btn-confirmar-modal');
const btnCancelarModal = el('btn-cancelar-modal');

let textos = null;

function verificarFeedback() {
    const feedbackMsg = localStorage.getItem('feedbackMensagem');
    const elementoFeedback = el('feedbackMensagem');

    if (feedbackMsg && elementoFeedback) {
        elementoFeedback.textContent = feedbackMsg;
        localStorage.removeItem('feedbackMensagem');

        setTimeout(() => {
            elementoFeedback.textContent = '';
        }, 5000);
    }
}

async function exibirDados() {
    verificarFeedback(); 
    exibirSituacaoOperacao('BUSCANDO');

    try {
        // Carrega textos se ainda não existirem
        if (!textos) {
            const requisicaoTextos = await fetch(`../dam/textos.json`); 
            if (!requisicaoTextos.ok) throw new Error('Falha ao recuperar textos.');
            textos = await requisicaoTextos.json();
            aplicarTextos(textos); 
        }
        
        const lista_clientes = await buscarDados();

        if (lista_clientes != null && lista_clientes.length > 0) {
            montarTabela(lista_clientes);
            exibirSituacaoOperacao('TEM_DADOS');
        } else {
            exibirSituacaoOperacao('SEM_DADOS');
        }
    } catch (erro) {
        console.error(erro);
        exibirSituacaoOperacao('ERRO', erro.message);
    }
}

function criarColuna(conteudo, align = 'left') {
    const coluna = document.createElement("td");
    const span = document.createElement('span');
    span.textContent = conteudo;
    coluna.appendChild(span);
    coluna.style.textAlign = align;
    return coluna;
}

function criarBotao(emoji, title, onClick) {
    const btn = document.createElement("button");
    btn.innerHTML = emoji;
    btn.title = title;
    btn.onclick = onClick;
    btn.style.cursor = "pointer";
    btn.style.margin = "0 5px";
    btn.style.fontSize = "1.2rem"; // Aumentei um pouco para ficar mais clicável
    btn.style.background = "none";
    btn.style.border = "none";
    return btn;
}

function montarTabela(clientes) {
    corpoTabela.innerHTML = '';

    clientes.forEach(item => {
        const linha = document.createElement("tr");

        // --- Lógica Visual do Status (Quadrado Colorido) ---
        const colunaStatus = document.createElement("td");
        const divStatus = document.createElement("div");
        divStatus.classList.add("status-quadrado");
        
        if (item.ativo) {
            divStatus.classList.add("status-verde");
            divStatus.title = textos.ativo_sim || "Ativo"; 
        } else {
            divStatus.classList.add("status-vermelho");
            divStatus.title = textos.ativo_nao || "Inativo";
        }
        colunaStatus.appendChild(divStatus);

        linha.append(
            criarColuna(item.nome, 'left'),
            criarColuna(item.apelido, 'left'),
            criarColuna(item.cpf || textos.indisponivel, 'left'),
            criarColuna(item.rg || textos.indisponivel, 'left'),
            criarColuna(item.sexo === 'M' ? textos.sexo_masculino : textos.sexo_feminino, 'left'),
            colunaStatus 
        );

        const colunaAcoes = document.createElement("td");
        
        colunaAcoes.appendChild(
            criarBotao(textos.emoji_editar || '✏️', textos.editar || 'Editar', () => alterarCliente(item.id))
        );

        if (item.ativo) {
            colunaAcoes.appendChild(
                criarBotao('🚫', 'Inativar Cliente', () => alternarSituacaoCliente(item.id, false))
            );
        } else {
            colunaAcoes.appendChild(
                criarBotao('✅', 'Reativar Cliente', () => alternarSituacaoCliente(item.id, true))
            );
        }

        colunaAcoes.appendChild(
            criarBotao(textos.emoji_excluir || '🗑️', textos.deletar || 'Excluir Definitivamente', () => excluirCliente(item.id))
        );

        linha.appendChild(colunaAcoes);
        corpoTabela.appendChild(linha);
    });
}

function exibirSituacaoOperacao(operacao, mensagemErro = '') {
    tabela.classList.add('esconder');
    mensagem.classList.add('esconder');
    imagem.classList.add('esconder');
    imagem.classList.remove('loading-animado'); 

    switch (operacao) {
        case 'BUSCANDO':
            imagem.classList.remove('esconder');
            break;
        case 'TEM_DADOS':
            tabela.classList.remove('esconder');
            break;
        case 'SEM_DADOS':
            mensagem.textContent = textos.nenhum_cliente_localizado || "Nenhum cliente localizado.";
            mensagem.classList.remove('esconder');
            break;
        case 'ERRO':
            mensagem.textContent = mensagemErro || textos.erro_padrao || "Erro desconhecido.";
            mensagem.classList.remove('esconder');
            mensagem.style.color = 'red';
            break;
        default:
            break;
    }
}

async function buscarDados(termo = '') {
    const endpoint = termo ? 
        `${API_HOST}/clientesDam/nome?termo=${termo}` :
        `${API_HOST}/clientesDam`;
    
    try {
        const requisicao = await fetch(endpoint, { method: 'GET' });
        if (!requisicao.ok) throw new Error("Falha na requisição de dados.");

        const response = await requisicao.json();
        
        // Garante que retornamos sempre um array
        const lista = Array.isArray(response.data) ? response.data : Array.isArray(response) ? response : [];
        return lista;

    } catch (erro) {
        console.error("Erro na busca:", erro);
        throw erro; 
    }
}

function aplicarTextos(textos) {
    if (!textos) return;
    const elemento_data = (data) => document.querySelector(`[${data}]`);
    
    const setHtml = (data, valor) => {
        const el = elemento_data(data);
        if (el) el.innerHTML = valor;
    };

    setHtml('data-texto-lista-titulo', textos.lista_titulo);
    setHtml('data-texto-filtro', textos.filtrar_listagem);
    setHtml('data-texto-nome', textos.nome);
    setHtml('data-texto-apelido', textos.apelido);
    setHtml('data-texto-cpf', textos.cpf);
    setHtml('data-texto-rg', textos.rg);
    setHtml('data-texto-sexo', textos.sexo);
    setHtml('data-texto-ativo', textos.ativo);
    setHtml('data-texto-acoes', textos.listagem_acoes);
}

let controladorDisparo;
function filtrarDados(event) {
    const termo = event.target.value.trim();
    clearTimeout(controladorDisparo);
    controladorDisparo = setTimeout(async function () {
        const lista = await buscarDados(termo);
        if(lista && lista.length > 0) {
            montarTabela(lista);
            exibirSituacaoOperacao('TEM_DADOS');
        } else {
            exibirSituacaoOperacao('SEM_DADOS');
        }
    }, 300); // Aumentei um pouco o delay para evitar muitas chamadas
}

function alterarCliente (id) {
    window.location.href = `cadastro_clientes.html?id=${id}`;
}

function abrirModal(titulo, texto, acaoConfirmacao) {
    modalTitulo.textContent = titulo;
    modalMensagem.innerHTML = texto;

    btnConfirmarModal.onclick = () => {
            acaoConfirmacao();
            fecharModal();
        };
        
        modalOverlay.classList.remove('esconder');
    }

function fecharModal() {
    modalOverlay.classList.add('esconder');
}

btnCancelarModal.onclick = fecharModal;

modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) fecharModal();
}

async function alternarSituacaoCliente(id, novoStatus) {
    const acao = novoStatus ? "Reativar" : "Inativar";
    const textoPerg = `Deseja realmente <strong>${acao.toUpperCase()}</strong> este cliente?`;

    abrirModal("Alterar Situação", textoPerg, async () => {
       
        try {
            const response = await fetch(`${API_HOST}/clientesDam/situacao/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ativo: novoStatus })
            });
            const result = await response.json();
    
            if (response.ok) {
                exibirDados(); 
            } else {
                alert(`Erro: ${result.mensagem}`); // Aqui pode manter alert ou criar um modal de erro
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        }
    });
}

async function excluirCliente(id) {
    abrirModal("Exclusão Permanente", "Atenção: Esta ação não pode ser desfeita. Deseja excluir permanentemente?", async () => {
        try {
            const resposta = await fetch(`${API_HOST}/clientesDam/id/${id}`, { method: "DELETE" });
            
            if (resposta.ok) {
                exibirDados(); 
            } else {
                alert(textos.erro_exclusao || "Erro ao excluir.");
            }
        } catch (erro) {
            alert(textos.erro_servidor || "Erro no servidor.");
        }
    });
}

function abrirCadastro() {
    window.location.href = "cadastro_clientes.html";
}

function irParaIndex(){
    window.location.href = "../../../../index.html"; 
}

// Inicia a aplicação
document.addEventListener('DOMContentLoaded', exibirDados);