campo_id = document.getElementById("idgrupo")
campo_nome = document.getElementById("grupo")
mensagem = document.getElementById("mensagemgrupo")

function validacampo() {
    mensagem.innerHTML = ""
    mensagem.style.color = ""

    if (campo_nome.validity.valueMissing == true) {
        mensagem.innerHTML = "Informe o grupo"
        mensagem.style.color = "red"
        mensagem.style.fontSize = "13px"
        mensagem.style.backgroundColor = "red"

        return false
    }

    if (campo_nome.validity.tooShort == true) {
        mensagem.innerHTML = "Mínimo de 3 letras"
        mensagem.style.color = "red"
        mensagem.style.fontSize = "13px"
        return false
    }

    if (campo_nome.validity.tooLong == true) {
        mensagem.innerHTML = "Máximo de 64 letras"
        return false
    }

    return true
}

function voltar() {
    window.location.href = "listagrupo.html"
}

function cadastrargrupo() {

    // Verificando se esta nulo, para criar um array
    if (window.localStorage.getItem("grupo") == null)
        window.localStorage.setItem("grupo", "[]")
    // Dando a variavel a array e usando JSON
    let grupo = localStorage.getItem("grupo")
    let listagrupo = JSON.parse(grupo)
    // Valor da array
    grupo = {
        'id': null,
        'nome': campo_nome.value
    }
    // Vendo o tamanho de lista se for 0 valor id = 1
    if (listagrupo.length == 0) {
        grupo.id = 1
    } else {
        // deixando a lista em forma decrescente pelo id
        let lista_ordem = listagrupo.sort(
            function (a, b) {
                return b - a
            }
        ).reverse()
        // Pegando o ultimo valor (maior id)
        let ultimogrupo = lista_ordem[0]
        // Acrescentando + 1 ao valor id
        grupo.id = ultimogrupo.id + 1
    }
    // Define o valor do campo ID com o ID gerado para a nova moeda
    campo_id.value = grupo.id

    // Adiciona a nova moeda ao array de moedas
    listagrupo.push(grupo)

    // Converte o array atualizado de moedas para JSON
    let grupoarray = JSON.stringify(listagrupo)

    // Armazena o array atualizado no localStorage
    window.localStorage.setItem("grupo", grupoarray)
}

alterargrupo = function () {
    grupo = window.localStorage.getItem("grupo")

    listagrupo = JSON.parse(grupo)


    indice = listagrupo.findIndex(function (valor) {
        return valor.id == campo_id.value
    })

    grupo = listagrupo[indice]
    grupo.nome = campo_nome.value
    listagrupo[indice] = grupo


    window.localStorage.setItem('grupo', JSON.stringify(listagrupo))

}


botao_salvar_click = function () {

    if (validacampo() == false) {
        campo_nome.focus()
        return
    }

    if (campo_id.value == "") {
        cadastrargrupo()
    }
    else {
        alterargrupo()
    }
    window.location.href = "listagrupo.html"
}

function dados() {
    let parametros = window.location.search
    if (parametros) {

        parametrosquebrado = new URLSearchParams(parametros)

        let parametrosid = parametrosquebrado.get("id")

        let grupo = window.localStorage.getItem("grupo")

        let listagrupo = JSON.parse(grupo)

        let localizado = listagrupo.find(function (item) {
            return item.id == parametrosid
        })
        campo_id.value = localizado.id
        campo_nome.value = localizado.nome

    }
}

dados()