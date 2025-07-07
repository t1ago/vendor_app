campo_id = document.getElementById("id")
campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")

function voltarmoeda() {
    window.location.href = "lista_moeda.html"; // redireciona para a lista
}


function cadastrar_moeda() {
    if (window.localStorage.getItem("moeda") == null) {
        window.localStorage.setItem("moeda", "[]")
    }

    moedas = window.localStorage.getItem("moeda")
    listasmoedas = JSON.parse(moedas)
    moeda = {
        'id': null,
        'moeda': campo_moeda.value,
        'nome': campo_nome.value
    }
    if (listasmoedas.length == 0) {
        moeda.id = 1
    } else {
        listasmoedas_ordenada = listasmoedas.sort(
            function (a, b) {
                return a - b
            }
        ).reverse()
        ultimamoeda = listasmoedas_ordenada[0]
        moeda.id = ultimamoeda.id + 1
    }
    campo_id.value = moeda.id


    listasmoedas.push(moeda)
    moedas = JSON.stringify(listasmoedas)
    window.localStorage.setItem("moeda", moedas)
}


alterar_moeda = function () {
    moedas = window.localStorage.getItem("moeda")

    listasmoedas = JSON.parse(moedas)


    indice = listasmoedas.findIndex(function (valor, array_indice, array) {
        return valor.id == campo_id.value
    })

    moeda = listasmoedas[indice]
    moeda.nome = campo_nome.value
    moeda.moeda = campo_moeda.value
    listasmoedas[indice] = moeda


    window.localStorage.setItem('moeda', JSON.stringify(listasmoedas))

}

botao_salvar_click = function () {
    if (campo_id.value == "") {
        cadastrar_moeda()
    }
    else {
        alterar_moeda()
    }
    window.location.href = "lista_moeda.html"
}

function exibirdados() {
    let parametros = window.location.search

    if (parametros) {
        // ?id=10
        parametrosquebrado = new URLSearchParams(parametros)
        // [id, 10]
        parametrosid = parametrosquebrado.get("id")
        // 10
        let moedas = window.localStorage.getItem("moeda")

        let listasmoedas = JSON.parse(moedas)

        let localizado = listasmoedas.find(function (item, array_indice, array) {
            return item.id == parametrosid
        })
        campo_id.value = localizado.id
        campo_nome.value = localizado.nome
        campo_moeda.value = localizado.moeda
    }
}

exibirdados()


