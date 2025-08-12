campo_nome = document.getElementById("name")
campo_id = document.getElementById("id")
mensagem_nome = document.getElementById('id_mensagem')

function voltar() {
    window.location.href = "lista_marca.html";
}

function validarCampoNome() {
    campo_nome.classList.remove('erro')
    mensagem_nome.innerHTML = ''
    mensagem_nome.classList.remove('erro')

    if (campo_nome.validity.valueMissing == true) {
        campo_nome.classList.add('erro')
        mensagem_nome.innerHTML = 'Informe o Nome'
        mensagem_nome.classList.add('erro')
        return false
    }

    if (campo_nome.validity.tooShort == true) {
        campo_nome.classList.add('erro')
        mensagem_nome.innerHTML = 'Informe uma palavra com 3 letras'
        mensagem_nome.classList.add('erro')
        return false
    }

    if (campo_nome.validity.tooLong == true) {
        campo_nome.classList.add('erro')
        mensagem_nome.innerHTML = 'Informe um texto com até 64 letras'
        mensagem_nome.classList.add('erro')
        return false
    }

    return true
}

async function cadastrar_marca() {
    if (validarCampoNome() == true) {
        marca = { 
            'id': null,
            'nome': campo_nome.value 
        }
        requisicao = await fetch ('http://localhost:3000/marca', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        if (requisicao.ok == true) {
            setTimeout(() => {
                voltar()
            }, 3000);
        }
    }
}

async function alterar_marca() {
    // marcas = window.localStorage.getItem("marca")
    // listamarca = JSON.parse(marcas)
    // indice = listamarca.findIndex(function (valor) {
    //     return valor.id == campo_id.value
    // })
    // marca = listamarca[indice]
    // marca.nome = campo_nome.value
    // listamarca[indice] = marca
    // window.localStorage.setItem("marca",JSON.stringify(listamarca))
    marca = {
        'id' : campo_id.value,
        'nome': campo_nome.value
    }
    requisicao = await fetch (`http://localhost:3000/marca/${marca.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(marca)
    })
    if (requisicao.ok == true) {
        setTimeout(() => {
            voltar()
        }, 3000);
    }
}

function botao_salvar() {
    if(campo_id.value == "") {
        cadastrar_marca()
    } else {
        alterar_marca()
    }
}

async function exibirDados() {
    parametros = window.location.search
    if (parametros) {
        parametrosQuebrado = new URLSearchParams(parametros)
        parametrosId = parametrosQuebrado.get("id")
        requisicao = await fetch ('http://localhost:3000/marca', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        if (requisicao.ok == true) {
            listamarca = await requisicao.json()
            localizado = listamarca.data.find(function (item) {
                return item.id = parametrosId
            })
            campo_id.value = localizado.id
            campo_nome.value = localizado.nome
        }
    }
}

exibirDados()