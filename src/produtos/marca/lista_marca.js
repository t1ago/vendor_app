function abrirCadastro() {
    window.location.href = "cadastro_marca.html"
}

function voltarIndex() {
    window.location.href = "../../../index.html"
}

let listaMarca = [];
function carregarMarca() {
    const corpotabela = document.getElementById("tabela-marca")
    corpotabela.innerHTML = "";

    let marca = localStorage.getItem("marca");
    if (marca) {
        listaMarca = JSON.parse(marca);
        listaMarca.forEach(function (item) {
            const linha = document.createElement("tr");
            const coluna_nome = document.createElement("td")
            const coluna_acoes = document.createElement("td")
            const span_nome = document.createElement("span")
            const botao_editar = document.createElement("button")
            const botao_excluir = document.createElement("button")

            botao_editar.innerHTML = "editar"
            botao_editar.onclick = () => editar_coluna(item.id);

            botao_excluir.innerHTML = "excluir"
            botao_excluir.onclick = () => excluir_coluna(item.id);

            span_nome.innerHTML = item.nome

            linha.appendChild(coluna_nome)
            coluna_nome.appendChild(span_nome)
            coluna_acoes.appendChild(botao_editar)
            coluna_acoes.appendChild(botao_excluir)
            linha.appendChild(coluna_acoes)
            corpotabela.appendChild
        });
    }
}
function excluir_coluna(id) {
    let marca = localStorage.getItem("marca")
    let listamarca = JSON.parse(marca)

    indice = listamarca.findIndex(function (valor) {
        return valor.id == id
    })
    listamarca.splice(indice,1)
    window.localStorage.setItem("marca",JSON.stringify(listamarca))
    carregarMarca()
}
function editar_coluna(id) {
    window.location.href = "cadastro_marca.html?id="+id
}
carregarMarca();