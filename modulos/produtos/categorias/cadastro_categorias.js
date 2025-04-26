
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

criar_categoria = function() {
    exibir_mensagem_operacao(true, 'Criando categoria', null)

    if (window.localStorage.getItem('categorias') == null) {
        window.localStorage.setItem('categorias', '[]')
    }

    lista_categorias = JSON.parse(window.localStorage.getItem('categorias'))
    categoria = {
        'id': null,
        'nome': campo_nome.value
    }

    if (lista_categorias.length == 0) {
        categoria.id = 1
    } else {
        lista_ordenada_categorias = lista_categorias.sort(function(a, b) { return a - b}).reverse()
        categoria.id = lista_ordenada_categorias[0].id
        categoria.id = categoria.id + 1
    }

    lista_categorias.push(categoria);
    window.localStorage.setItem('categorias', JSON.stringify(lista_categorias))
    campo_id.value = categoria.id

    exibir_mensagem_operacao(true, 'Categoria criada com Sucesso', 'sucesso')
    setInterval(function() {
        botao_cancelar_click()
    }, 2000)
}

alterar_categoria = function() {
    exibir_mensagem_operacao(true, 'Alterando categoria', null)

    if (window.localStorage.getItem('categorias') == null) {
        window.localStorage.setItem('categorias', '[]')
    }

    lista_categorias = JSON.parse(window.localStorage.getItem('categorias'))

    if (lista_categorias.length == 0) {
        criar_categoria()
    } else {
        
        indice = lista_categorias.findIndex(function(valor, array_indice, array) {
            return valor.id == campo_id.value
        })
        categoria = lista_categorias[indice]
        categoria.nome = campo_nome.value
        lista_categorias[indice] = categoria

        window.localStorage.setItem('categorias', JSON.stringify(lista_categorias))

        exibir_mensagem_operacao(true, 'Categoria alterada com Sucesso', 'sucesso')
        setInterval(function() {
            botao_cancelar_click()
        }, 2000)
    }
}

botao_salvar_click = function() {
    if (validar_campo_nome() == false) {
        campo_nome.focus();
    }

    if (campo_id.value.trim() == '') {
        criar_categoria()
    } else {
        alterar_categoria()
    }
}

botao_cancelar_click = function() {
    navegarPara('lista_categorias.html');
}

exibir_dados = function() {
    url_parametros = window.location.search

    if (url_parametros != '') {
        parametros = new URLSearchParams(url_parametros)
        parametro_id = parametros.get('id')

        lista_categorias = JSON.parse(window.localStorage.getItem('categorias'))

        categoria = lista_categorias.find(function(valor, array_indice, array) {
            return valor.id == parametro_id
        })

        campo_id.value = categoria.id
        campo_nome.value = categoria.nome
    }

    
}

// Executa
exibir_dados()
