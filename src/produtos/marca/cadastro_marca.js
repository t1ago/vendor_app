campo_nome = document.getElementById("name")
campo_id = document.getElementById("id")
mensagem_nome = document.getElementById('id_mensagem')

function validar_campo() {
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
function animacao_carregar(elemento, chave = true) {
    elemento_selecionado = elemento.parentNode.parentNode
    elemento_animado = document.createElement('div');
    elemento_animado.classList.add('elemento_animado');
    if (chave == true) {
        animacao = document.createElement('img');
        animacao.src = '../../../imagens/loading.png';
        animacao.classList.add('animar');
        elemento_animado.appendChild(animacao);
        elemento_selecionado.appendChild(elemento_animado);
    } else {
        elemento_animado = document.getElementsByClassName("elemento_animado")[0];
        elemento_animado.remove();
    } 
}
async function cadastrar_marca() {
    if (validar_campo() == true) {
        marca = { 
            'id': null,
            'nome': campo_nome.value 
        }
        elemento = document.getElementById("name");
        animacao_carregar(elemento)
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
                animacao_carregar(elemento,false)
                navegarPara('lista_marca.html');
            }, 3000);
        }
    }
}

async function alterar_marca() {
    marca = {
        'id' : campo_id.value,
        'nome': campo_nome.value
    }
    elemento = document.getElementById("name");
    animacao_carregar(elemento)
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
            animacao_carregar(elemento,false)
            navegarPara('lista_marca.html');
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

async function exibir_dados() {
    parametros = window.location.search
    if (parametros) {
        elemento = document.getElementById("name");
        animacao_carregar(elemento)
        parametrosQuebrado = new URLSearchParams(parametros)
        parametrosId = parametrosQuebrado.get("id")
        requisicao = await fetch (`${API_HOST}/marca`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        animacao_carregar(elemento,false)
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

exibir_dados()