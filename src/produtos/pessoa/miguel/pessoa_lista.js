const API_HOST = 'http://127.0.0.1:3000'
const API_BASE_URL = `${API_HOST}/pessoa/miguel`;

// Elementos HTML
// CORREÇÃO: Garante que 'tabela' aponta para o <tbody> usando o ID do HTML
const tabela = document.getElementById("tabela-pessoas"); 
const inputFiltro = document.getElementById("filtro_busca");
const btnFiltrar = document.getElementById("btn_filtrar");

// =========================================================
// Funções de Navegação e Ação
// =========================================================

volta_lista = function () {
    // Se o seu index.html estiver fora da pasta 'pessoa', o caminho está correto.
    window.location.href = "../../../../index.html"; 
}

cadastro_lista = function () {
    // Redireciona para o cadastro de Pessoa Física
    window.location.href = "pessoa_cadastro.html?tipo=F"; 
}

const editarPessoa = (id, tipo) => {
    window.location.href = `pessoa_cadastro.html?id=${id}&tipo=${tipo}`;
};

const inativarPessoa = async (id) => {
    if (!confirm("Deseja realmente inativar esta pessoa?")) {
        return;
    }

    const resposta = await fetch(`${API_BASE_URL}/inativar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });

    // É importante ler a resposta, mesmo que seja apenas o status.
    // Se o backend estiver retornando JSON vazio ou HTML, isso ajuda a diagnosticar.
    const contentType = resposta.headers.get("content-type");
    let respJson = { executado: false, mensagem: "Erro desconhecido." };

    if (contentType && contentType.includes("application/json")) {
        respJson = await resposta.json();
    } else if (!resposta.ok) {
        console.error("Erro do servidor:", await resposta.text());
        alert(`Erro ao inativar. Status: ${resposta.status}. Verifique o console.`);
        return;
    }


    if (resposta.ok && respJson.executado) {
        alert("Pessoa inativada com sucesso!");
        await mostrarDados(); // Recarrega a lista
    } else {
        alert("Erro ao inativar pessoa: " + (respJson.mensagem || "Verifique o console."));
    }
};

// =========================================================
// Funções de Busca e Exibição 
// =========================================================

const buscar_dados = async function () {
    const termoBusca = inputFiltro ? inputFiltro.value.trim() : "";
    
    // Buscar apenas Pessoas Físicas (tipo_pessoa=F)
    let url = `${API_BASE_URL}?tipo_pessoa=F`; 

    if (termoBusca) {
        url += `&filtro=${encodeURIComponent(termoBusca)}`;
    }
    
    try {
        const requisicao = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!requisicao.ok) {
             console.error("Erro na API:", requisicao.status);
             return [];
        }

        const response = await requisicao.json()
        return response.data || []; 
    } catch (e) {
        console.error("Erro ao buscar dados:", e);
        return [];
    }
}

const exibir_dados = async function (lista = null) {

    // VERIFICA SE A TABELA EXISTE ANTES DE TENTAR MANIPULÁ-LA
    if (!tabela) {
        console.error("Elemento 'tabela' não encontrado no DOM. Verifique o ID 'tabela-pessoas' no HTML.");
        return;
    }
    
    tabela.innerHTML = ""; // Limpa o <tbody>
    
    if (!lista || lista.length === 0) {
        let linha = document.createElement('tr');
        let coluna = document.createElement('td');
        // Colspan ajustado para 12 colunas (Nome, Apelido, Tipo, Sexo, Idade, RG, CPF, Ativo, Vínculo, Ação, Ação, Endereço)
        coluna.setAttribute('colspan', '12'); 
        coluna.innerHTML = 'Nenhum registro encontrado.';
        linha.appendChild(coluna);
        tabela.appendChild(linha);
        return;
    }

    const adicionarColuna = function (linha, valor) {
        let coluna = document.createElement('td');
        let span = document.createElement('span');
        span.innerHTML = valor || '';
        coluna.appendChild(span);
        linha.appendChild(coluna);
    }

    const adicionar_botao = function (linha, url_img, funcao) {
        let coluna = document.createElement('td')
        let botao = document.createElement('button')
        let imagem = document.createElement('img')
        
        imagem.src = url_img
        imagem.width = 20;
        imagem.height = 20;

        botao.onclick = function () {
            funcao()
        }
        
        if (url_img.includes('editar')) {
             botao.classList.add('btn-edit');
        } else if (url_img.includes('remover')) {
             botao.classList.add('btn-delete');
        }

        botao.appendChild(imagem)
        coluna.appendChild(botao)
        linha.appendChild(coluna)
    }

    const adicionar_endereco = function (linha, pessoaId) {
        let coluna = document.createElement('td')
        let botao = document.createElement('button')

        botao.innerHTML = "Endereço"
        botao.classList.add('btn-endereco'); // Adiciona classe para estilo

        botao.onclick = function () {
            window.location.href = "endereco_lista.html?pessoa_id=" + pessoaId;
        }

        coluna.appendChild(botao)
        linha.appendChild(coluna)
    }

    lista.forEach((item) => {
        let linha = document.createElement('tr');

        adicionarColuna(linha, item.nome);
        adicionarColuna(linha, item.apelido);
        adicionarColuna(linha, item.tipo_pessoa);
        adicionarColuna(linha, item.sexo);
        adicionarColuna(linha, item.idade || '-'); 
        adicionarColuna(linha, item.documento_estadual);
        adicionarColuna(linha, item.documento_federal);
        adicionarColuna(linha, item.ativo === 'A' ? 'Ativo' : 'Inativo');
        adicionarColuna(linha, item.nome_vinculo || 'Nenhum');

        // Ações: Editar
        adicionar_botao(linha, "../../../../imagens/editar.png", () => editarPessoa(item.id, item.tipo_pessoa))
        // Ações: Inativar/Remover
        adicionar_botao(linha, "../../../../imagens/remover.png", () => inativarPessoa(item.id))

        // Endereço
        adicionar_endereco(linha, item.id)

        tabela.appendChild(linha);
    });
}

const mostrarDados = async function () {
    let lista = await buscar_dados()

    if (lista != null) {
        await exibir_dados(lista)
    }
}

// Inicialização
window.onload = mostrarDados;

// Adiciona o listener para o botão de busca
if (btnFiltrar) {
    btnFiltrar.addEventListener('click', mostrarDados);
}