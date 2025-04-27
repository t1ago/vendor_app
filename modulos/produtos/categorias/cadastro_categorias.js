
campo_nome = document.getElementById('name')
campo_id = document.getElementById('id')
mensagem_nome = document.getElementById('id_mensagem')
mensagem_operacao = document.getElementById('operacao')
grupo_botoes = document.getElementsByClassName('coluna-botoes-cadastro')[0]
grupo_mensagem = document.getElementsByClassName('coluna-operacao')[0]


campo_nome_onchange = function() {
    validar_campo_nome()
}

validar_campo_nome = function() {
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

exibir_mensagem_operacao = function(visivel, mensagem, classe_css) {
    mensagem_operacao.innerHTML = mensagem
    mensagem_operacao.setAttribute('class', 'operacao')
    if (classe_css != null) {
        mensagem_operacao.classList.add(classe_css)
    }

    grupo_botoes.style.display = visivel ? 'none' : 'block'
    grupo_mensagem.style.display = visivel ? 'block' : 'none'
}

criar_categoria = async function() {
    exibir_mensagem_operacao(true, 'Criando categoria', null)

    categoria = {
        'id': null,
        'nome': campo_nome.value
    }

    requisicao = await fetch("http://localhost:3000/categorias", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    })

    if (requisicao.ok == true) {
        exibir_mensagem_operacao(true, 'Categoria criada com Sucesso', 'sucesso')
        setInterval(function() {
            botao_cancelar_click()
        }, 2000)
    } else {
        exibir_mensagem_operacao(true, 'Falha ao salvar categoria', 'erro')
        setInterval(function() {
            exibir_mensagem_operacao(false, '', null)
        }, 2000)
    }
}

alterar_categoria = async function() {
    exibir_mensagem_operacao(true, 'Alterando categoria', null)

    categoria = {
        'id': campo_id.value,
        'nome': campo_nome.value
    }

    requisicao = await fetch(`http://localhost:3000/categorias/${categoria.id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    })

    if (requisicao.ok == true) {
        exibir_mensagem_operacao(true, 'Categoria alterada com Sucesso', 'sucesso')
        setInterval(function() {
            botao_cancelar_click()
        }, 2000)
    } else {
        exibir_mensagem_operacao(true, 'Falha ao alterar categoria', 'erro')
        setInterval(function() {
            exibir_mensagem_operacao(false, '', null)
        }, 2000)
    }
}

botao_salvar_click = async function() {
    if (validar_campo_nome() == false) {
        campo_nome.focus();
    }

    if (campo_id.value.trim() == '') {
        await criar_categoria()
    } else {
        await alterar_categoria()
    }
}

botao_cancelar_click = function() {
    navegarPara('lista_categorias.html');
}

exibir_dados = async function() {
    url_parametros = window.location.search

    if (url_parametros != '') {
        parametros = new URLSearchParams(url_parametros)
        parametro_id = parametros.get('id')

        requisicao = await fetch(`http://localhost:3000/categorias/${parametro_id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    
        if (requisicao.ok == true) {
            resposta = await requisicao.json()
            campo_id.value = resposta.data[0].id
            campo_nome.value = resposta.data[0].nome
        } else {
            exibir_mensagem_operacao(true, 'Falha ao recuperar categoria', 'erro')
            setInterval(function() {
                botao_cancelar_click()
            }, 2000)
        }
    }
}

// Executa
exibir_dados()
