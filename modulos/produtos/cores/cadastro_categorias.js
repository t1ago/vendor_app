campo_hexadecimal = document.getElementById('hexadecimal')
campo_cor = document.getElementById('cor')
campo_id = document.getElementById('id')
mensagem_nome = document.getElementById('id_mensagem')
mensagem_operacao = document.getElementById('operacao')
mensagem_imagem = document.getElementById('imagem')
grupo_botoes = document.getElementsByClassName('coluna-botoes-cadastro')[0]
grupo_mensagem = document.getElementsByClassName('coluna-operacao')[0]


campo_cor_onchange = function() {
    campo_hexadecimal.value = campo_cor.value
}

validar_campo_hexadecimal = function() {
    campo_hexadecimal.classList.remove('erro')
    mensagem_nome.innerHTML = ''
    mensagem_nome.classList.remove('erro')

    if (campo_hexadecimal.validity.valueMissing == true) {
        campo_hexadecimal.classList.add('erro')
        mensagem_nome.innerHTML = 'Cor não selecionada'
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

criar_cor = async function() {
    exibir_situacao_operacao('SALVANDO', 'Criando cor')

    cor = {
        'id': null,
        'hexadecimal': campo_hexadecimal.value
    }

    requisicao = await fetch(`${API_HOST}/cores`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cor)
    })

    if (requisicao.ok == true) {
        exibir_situacao_operacao('SUCESSO', 'Cor criada com Sucesso')
        setInterval(function() {
            botao_cancelar_click()
        }, 2000)
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao salvar cor')
        setInterval(function() {
            exibir_situacao_operacao('LIMPAR', '')
        }, 2000)
    }
}

alterar_cor = async function() {
    exibir_situacao_operacao('SALVANDO', 'Alterando cores')

    cor = {
        'id': campo_id.value,
        'hexadecimal': campo_hexadecimal.value
    }

    requisicao = await fetch(`${API_HOST}/cores/${cor.id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cor)
    })

    if (requisicao.ok == true) {
        exibir_situacao_operacao('SUCESSO', 'Cor alterada com Sucesso')
        setInterval(function() {
            botao_cancelar_click()
        }, 2000)
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao salvar cor')
        setInterval(function() {
            exibir_situacao_operacao('LIMPAR', '')
        }, 2000)
    }
}

botao_salvar_click = async function() {
    if (validar_campo_hexadecimal() == false) {
        campo_cor.focus();
        return
    }

    if (campo_id.value.trim() == '') {
        await criar_cor()
    } else {
        await alterar_cor()
    }
}

botao_cancelar_click = function() {
    navegarPara('lista_cores.html');
}

exibir_dados = async function() {
    
    url_parametros = window.location.search

    if (url_parametros != '') {
        exibir_situacao_operacao('BUSCANDO', 'Buscando informação')
        parametros = new URLSearchParams(url_parametros)
        parametro_id = parametros.get('id')

        requisicao = await fetch(`${API_HOST}/cores/${parametro_id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    
        if (requisicao.ok == true) {
            resposta = await requisicao.json()
            campo_id.value = resposta.data[0].id
            campo_cor.value = resposta.data[0].hexadecimal
            campo_hexadecimal.value = campo_cor.value
            exibir_situacao_operacao('ALTERAR', '')
        } else {
            exibir_situacao_operacao('ERRO', 'Falha ao recuperar cores')
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
