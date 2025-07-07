
campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")

function abrirCadastro() {
    window.location.href = "tela_de_moeda.html"
}


function voltarparaindex() {
    window.location.href = "../../../index.html"
}

let listamoeda = [];
function carregarMoedas() {
    const corpotabela = document.getElementById("tabela-moedas")
    corpotabela.innerHTML = "";

    let moeda = localStorage.getItem("moeda");
    if (moeda) {
        listamoeda = JSON.parse(moeda);



        listamoeda.forEach(function (item, i) {
            const linha = document.createElement("tr");

            const coluna_moeda = document.createElement("td")

            const coluna_nome = document.createElement("td")

            const coluna_acoes = document.createElement("td")
            const span_moeda = document.createElement("span")
            const span_nome = document.createElement("span")
            const btn_editar = document.createElement("button")
            const btn_excluir = document.createElement("button")

            btn_editar.innerHTML = "editar"
            btn_editar.onclick = () => editar_coluna(item.id);



            btn_excluir.innerHTML = "excluir"
            btn_excluir.onclick = () => excluir_coluna(item.id);



            span_moeda.innerHTML = item.moeda
            span_nome.innerHTML = item.nome

            linha.appendChild(coluna_moeda)
            coluna_moeda.appendChild(span_moeda)
            linha.appendChild(coluna_nome)
            coluna_nome.appendChild(span_nome)
            coluna_acoes.appendChild(btn_editar)
            coluna_acoes.appendChild(btn_excluir)
            linha.appendChild(coluna_acoes)
            corpotabela.appendChild(linha)
        })

    }
}


function excluir_coluna(id) {
    let moeda = localStorage.getItem("moeda");
    let listasmoeda = JSON.parse(moeda)

    indice = listasmoeda.findIndex(function (valor, array_indice, array) {
        return valor.id == id
    })
    listasmoeda.splice(indice, 1)

    window.localStorage.setItem('moeda', JSON.stringify(listasmoeda))

    carregarMoedas()

}

function editar_coluna(id) {
    window.location.href = "tela_de_moeda.html?id=" + id

}
carregarMoedas();
