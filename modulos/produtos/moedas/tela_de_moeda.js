campo_id = document.getElementById("id")
campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")


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
    exibir_mensagem_operacao(true, 'Alterando moeda', null)

    if (window.localStorage.getItem('moedas') == null) {
        window.localStorage.setItem('moedas', '[]')
    }

    listasmoedas = JSON.parse(window.localStorage.getItem('moedas'))

    if (listasmoedas.length == 0) {
        criar_moeda()
    } else {

        indice = listasmoedas.findIndex(function (valor, array_indice, array) {
            return valor.id == campo_id.value
        })
        moeda = listasmoedas[indice]
        moeda.nome = campo_nome.value
        listasmoedas[indice] = categoria

        window.localStorage.setItem('moedas', JSON.stringify(listasmoedas))

        exibir_mensagem_operacao(true, 'moeda alterada com Sucesso', 'sucesso')
        setInterval(function () {
            botao_cancelar_click()
        }, 2000)
    }
}




