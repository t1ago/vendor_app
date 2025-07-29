//Elemento DOM para buscar ID
const el = id => document.getElementById(id);

//Objeto para facilitar acesso aos elementos
const campos = {
    id: el("campoId"),
    cor: el("novaCor"),
    hex: el("hexCor"),
    form: el("formCor"),
}

//Atualiza o campo hexadecimal com base no seletor de cor
function sincHex() {
    campos.hex.value = campos.cor.value.toUpperCase();
}

//Limpa todos os campos do formulário
function limparCampos() {
    campos.id.value = "";
    campos.cor.value= "#000000";
    campos.hex.value = "";
}

//Voltar para a lista de cores
function voltar() {
    window.location.href = "../cores/lista_cores.html"
}

//Gera o próximo ID sequencial
function gerarProximoId() {
    let ultimoId = parseInt(localStorage.getItem("ultimoIdCor")) || 0;
    let novoId = ultimoId + 1;
    localStorage.setItem("ultimoIdCor", novoId);
    return novoId;
}

//salva uma nova cor
function cadastrarCor() {
    const corHex = campos.hex.value;
    let listaCores = JSON.parse(localStorage.getItem("listaCores")) || [];

    const novoId = gerarProximoId();
    const novaCor = { id: novoId, hex: corHex };

    listaCores.push(novaCor);
    localStorage.setItem("listaCores", JSON.stringify(listaCores));

    alert("Cor salva com sucesso!");
    limparCampos();
    setTimeout(voltar, 1000);
}

//Alterar uma cor existente
function alterarCor() {
    let listaCores = JSON.parse(localStorage.getItem("listaCores")) || [];

    let indice = listaCores.findIndex(cor => cor.id == campos.id.value);

    if (indice !== -1) {
        listaCores[indice].hex = campos.hex.value;
        localStorage.setItem("listaCores", JSON.stringify(listaCores));

        alert("Cor alterada com sucesso!");
        limparCampos();
        setTimeout(voltar, 1000);
    } else {
        alert("Erro: cor não encontrada para alteração.")
    }
}

//Salva (decide entre cadastrar ou alterar)
function salvarCor() {
    if (campos.id.value != ""){
        alterarCor();
    } else {
        cadastrarCor();
    }
}

//Importar cor para edição (URL)
function importarCor() {
    const parametros = new URLSearchParams(window.location.search);
    const parametroId = parametros.get("id");

    if (parametroId) {
        let listaCores = JSON.parse(localStorage.getItem("listaCores")) || [];
        let localizado = listaCores.find(item => item.id == parametroId);

        if (localizado) {
            campos.id.value = localizado.id;
            campos.hex.value = localizado.hex;
            campos.cor.value = localizado.hex;
            sincHex();
        }
    }
}

//Atualizar hex automaticamente
campos.cor.addEventListener("input", sincHex);

//Submit do formulário
campos.form.addEventListener("submit", function (e) {
    e.preventDefault();

    const erro = campos.hex.nextElementSibling;

    if (!campos.hex.checkValidity()) {
        erro.textContent = "Informe um código hexadecimal válido.";
        campos.hex.classList.add("erro-input");
    } else {
        erro.textContent = "";
        campos.hex.classList.remove("erro-input");
        salvarCor();
    }
})

//Inicializa
importarCor();