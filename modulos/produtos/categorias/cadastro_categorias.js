
campo_nome = document.getElementById('name')
campo_id = document.getElementById('id')
mensagem_nome = document.getElementById('id_mensagem')
mensagem_operacao = document.getElementById('operacao')
mensagem_imagem = document.getElementById('imagem')
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

exibir_situacao_operacao = function(operacao, mensagem) {
    grupo_botoes.setAttribute('class', 'coluna coluna-botoes-cadastro')
    grupo_mensagem.setAttribute('class', 'coluna coluna-operacao')
    mensagem_imagem.setAttribute('class', '')
    mensagem_operacao.innerHTML = mensagem

    switch (operacao) {
        case 'SALVANDO':
            grupo_botoes.classList.add('esconder')
            mensagem_imagem.classList.add('exibir')
            grupo_mensagem.classList.add('exibir')
            break;

        case 'SUCESSO':
            grupo_botoes.classList.add('esconder')
            mensagem_imagem.classList.add('esconder')
            grupo_mensagem.classList.add('sucesso')
            grupo_mensagem.classList.add('exibir')
            break;
    
        case 'ERRO':
            grupo_botoes.classList.add('esconder')
            mensagem_imagem.classList.add('esconder')
            grupo_mensagem.classList.add('erro')
            grupo_mensagem.classList.add('exibir')
            break;

        case 'BUSCANDO':
            grupo_botoes.classList.add('esconder')
            mensagem_imagem.classList.add('exibir')
            grupo_mensagem.classList.add('exibir')
            break;
        default:
            grupo_botoes.classList.add('exibir')
            mensagem_imagem.classList.add('esconder')
            grupo_mensagem.classList.add('esconder')
            break;
    }
}

criar_categoria = async function() {
    exibir_situacao_operacao('SALVANDO', 'Criando categoria')

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
        exibir_situacao_operacao('SUCESSO', 'Categoria criada com Sucesso')
        setInterval(function() {
            botao_cancelar_click()
        }, 2000)
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao salvar categoria')
        setInterval(function() {
            exibir_situacao_operacao('LIMPAR', '')
        }, 2000)
    }
}

alterar_categoria = async function() {
    exibir_situacao_operacao('SALVANDO', 'Alterando categoria')

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
        exibir_situacao_operacao('SUCESSO', 'Categoria alterada com Sucesso')
        setInterval(function() {
            botao_cancelar_click()
        }, 2000)
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao salvar categoria')
        setInterval(function() {
            exibir_situacao_operacao('LIMPAR', '')
        }, 2000)
    }
}

botao_salvar_click = async function() {
    if (validar_campo_nome() == false) {
        campo_nome.focus();
        return
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
        exibir_situacao_operacao('BUSCANDO', 'Buscando informação')
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
            exibir_situacao_operacao('ALTERAR', '')
        } else {
            exibir_situacao_operacao('ERRO', 'Falha ao recuperar categoria')
            setInterval(function() {
                botao_cancelar_click()
            }, 2000)
        }
    } else {
        exibir_situacao_operacao('NOVO', '')
    }
}

// Executa
exibir_dados()
