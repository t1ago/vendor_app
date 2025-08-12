//Utilitários gerais
const el = id => document.getElementById(id);

//Carrega as cores doii localStorage
function carregarCores() {
    return JSON.parse(localStorage.getItem("listaCores")) || [];
}

//Salva as cores no localStorage
function salvarCores(lista) {
    localStorage.setItem("listaCores", JSON.stringify(lista));
}

//Exclui item por id de uma lista
function apagarCorId(lista, id) {
    const index = lista.findIndex(item => item.id == id);
    if (index !== -1) {
        lista.splice(index, 1);
    }
    return lista;
}

//Redireciona para tela de edição
function alterarCor(id) {
    window.location.href = `../cores/cadastro_cores.html?id=${id}`;
}

// Emoji, tooltip e evento
function criarBotao(emoji, title, onClick) {
    const btn = document.createElement("button")
    btn.innerHTML = emoji;
    btn.title = title;
    btn.onclick = onClick;
    return btn;
}

//Exclui cor do sistema
function excluirCor(id) {
    let cores = carregarCores();
    cores = apagarCorId(cores, id);
    salvarCores(cores);
    exibirDados();
}

//Exibe os dados na tabela
function exibirDados() {
    const corpoTabela = el ("corpoTabela");
    corpoTabela.innerHTML = "";

    const cores = carregarCores();

    cores.forEach(item => {
        const linha = document.createElement("tr");

        //coluna da cor visual (quadrado)
        const colunaCor = document.createElement("td");
        const quadrado = document.createElement("div");
        quadrado.style.cssText = `
            width: 20px; height: 20px; border-radius: 4px;
            background: ${item.hex}; display: inline-block;
        `;
        colunaCor.appendChild(quadrado);

        //Coluna do hexadecimal
        const colunaHex = document.createElement("td");
        colunaHex.innerHTML = item.hex;

        //coluna de ações
        const colunaAcoes = document.createElement("td");
        const botaoEditar = criarBotao("✏️", "Editar", () => alterarCor(item.id));
        const botaoExcluir = criarBotao("🗑️", "Excluir", () => excluirCor(item.id));
        colunaAcoes.append(botaoEditar, botaoExcluir);

        linha.append(colunaCor, colunaHex, colunaAcoes);
        corpoTabela.appendChild(linha);
    })
}

//Botões da página
function abrirCadastro() {
    window.location.href = "../cores/cadastro_cores.html";
}

function irParaIndex() {
    window.location.href = "../../../index.html"
}

//Carregar a página
exibirDados();