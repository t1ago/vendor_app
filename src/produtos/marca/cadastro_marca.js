campo_nome = document.getElementById("name")
campo_id = document.getElementById("id")
mensagem_nome = document.getElementById('id_mensagem')


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
        requisicao = await fetch (`${API_HOST}/marca`, {
            method:'POST',
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
}

async function alterar_marca() {
    marca = {
        'id' : campo_id.value,
        'nome': campo_nome.value
    }
    requisicao = await fetch (`${API_HOST}/marca/${marca.id}`, {
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
        requisicao = await fetch (`${API_HOST}/marca`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        if (requisicao.ok == true) {
            listamarca = await requisicao.json()
            localizado = listamarca.data.find(function (item) {
                return item.id == parametrosId
            })
            campo_id.value = localizado.id
            campo_nome.value = localizado.nome
        }
    }
}
function voltar() {
    window.location.href = "lista_marca.html";
}
exibirDados()