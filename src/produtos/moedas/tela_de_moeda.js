campo_id = document.getElementById("id")
campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")
mensagemmoeda = document.getElementById("mensagemmoeda")
mensagemnome = document.getElementById("mensagemnome")

function validarcampomoeda() {
    mensagemmoeda.innerHTML = ""

    if (campo_moeda.validity.valueMissing == true) {
        mensagemmoeda.innerHTML = "informe a moeda"
        return false
    }

    if (campo_moeda.validity.tooShort == true) {
        mensagemmoeda.innerHTML = "Mínimo de 3 letras"
        return false
    }

    if (campo_moeda.validity.tooLong == true) {
        mensagemmoeda.innerHTML = "Máximo de 64 letras"
        return false
    }

    return false
}


function validarcamponome() {
    mensagemnome.innerHTML = ""

    if (campo_nome.validity.valueMissing == true) {
        mensagemnome.innerHTML = "informe o nome"
        return false
    }

    if (campo_nome.validity.tooShort == true) {
        mensagemnome.innerHTML = "Mínimo de 3 letras"
        return false
    }

    if (campo_nome.validity.tooLong == true) {
        mensagemnome.innerHTML = "Máximo de 64 letras"
        return false
    }
    return true

}


function voltarmoeda() {
    window.location.href = "lista_moeda.html"; // redireciona para a lista
}


function cadastrar_moeda() {
    // Verifica se não há nenhum item "moeda" no localStorage, e se não houver, inicializa como um array vazio
    if (window.localStorage.getItem("moeda") == null) {
        window.localStorage.setItem("moeda", "[]")
    }

    // Recupera o item "moeda" do localStorage
    moedas = window.localStorage.getItem("moeda")
    // Converte o JSON armazenado no localStorage em um array de objetos
    listasmoedas = JSON.parse(moedas)
    // Cria um novo objeto moeda com os valores dos campos de entrada
    moeda = {
        'id': null,
        'moeda': campo_moeda.value,
        'nome': campo_nome.value
    }
    // Se o array de moedas estiver vazio, define o ID como 1
    if (listasmoedas.length == 0) {
        moeda.id = 1
    } else {
        // Ordena as moedas pelo ID em ordem decrescente
        listasmoedas_ordenada = listasmoedas.sort(
            function (a, b) {
                return a - b
            }
        ).reverse()
        // Obtém a última moeda (com o maior ID)
        ultimamoeda = listasmoedas_ordenada[0]
        // Define o ID da nova moeda como o próximo número após o maior ID existente
        moeda.id = ultimamoeda.id + 1
    }
    // Define o valor do campo ID com o ID gerado para a nova moeda
    campo_id.value = moeda.id

    // Adiciona a nova moeda ao array de moedas
    listasmoedas.push(moeda)
    // Converte o array atualizado de moedas para JSON
    moedas = JSON.stringify(listasmoedas)
    // Armazena o array atualizado no localStorage
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


