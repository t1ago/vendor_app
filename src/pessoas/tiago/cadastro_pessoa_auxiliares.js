adicionarValorObjeto = function (objeto, propriedade, valor) {
    objeto[propriedade] = valor
}

adicionarValorCampo = function (id, valor) {
    elemento = document.getElementById(id)

    if (elemento.type == 'radio') {
        elemento.checked = valor
    } else {
        elemento.value = valor
    }
}

exibir_situacao_operacao = function (operacao, mensagem) {
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

exibir_situacao_operacao_endereco = function (operacao) {
    tabela = document.getElementById('tabela')
    mensagem = document.getElementById('mensagem')
    imagem = document.getElementById('imagem')

    tabela.setAttribute('class', '')
    mensagem.setAttribute('class', '')
    imagem.setAttribute('class', '')

    switch (operacao) {
        case 'BUSCANDO':
            tabela.classList.add('esconder')
            mensagem.classList.add('esconder')
            imagem.classList.add('exibir')
            break;
        case 'TEM_DADOS':
            tabela.classList.add('exibir')
            mensagem.classList.add('esconder')
            imagem.classList.add('esconder')
            break;

        case 'SEM_DADOS':
            tabela.classList.add('esconder')
            mensagem.classList.add('exibir')
            imagem.classList.add('esconder')
            break;
        default:
            break;
    }
}

habilitar_campo = function (id, habilitar) {
    elemento = document.getElementById(id)

    if (habilitar) {
        elemento.removeAttribute('disabled');
        elemento.disabled = false
    } else {
        elemento.setAttribute('disabled', '');
        elemento.disabled = true
    }
}

exibir_alerta = function (exibir, mensagem, callback) {
    alerta_mensagem = document.getElementById('alerta_mensagem')
    alerta_botao = document.getElementById('alerta_botao')

    if (exibir) {
        alerta_mensagem.innerHTML = mensagem
        alerta_botao.onclick = function () {
            if (callback == undefined) {
                exibir_alerta(false, '', null)
            } else {
                callback()
            }
        }

        alerta.classList.remove('esconder')
    } else {
        alerta_mensagem.innerHTML = ''
        alerta_botao.onclick = null

        alerta.classList.add('esconder')
    }
}

montar_tabela_endereco = function () {
    tabela_dados = document.getElementById('tabela_dados')

    adicionar_coluna = function (linha, valor) {
        coluna = document.createElement('td')
        span = document.createElement('span')
        span.innerHTML = valor

        coluna.appendChild(span)
        linha.appendChild(coluna)
    }

    adicionar_botao = function (url_imagem, funcao) {
        botao = document.createElement('button')
        imagem_botao = document.createElement('img')
        imagem_botao.src = url_imagem
        botao.onclick = function (event) {
            funcao()
        }
        botao.type = 'button'

        botao.appendChild(imagem_botao)
        return botao
    }

    tabela_dados.innerHTML = ''
    valores_pessoa.enderecos.forEach((item) => {

        linha = document.createElement('tr')

        endereco = `<strong>Tipo endereço: ${item.tipo_endereco == 'M' ? textos.tipo_endereco_moradia : item.tipo_endereco == 'C' ? textos.tipo_endereco_cobranca : textos.tipo_endereco_entrega} </strong>
        <br>${item.logradouro}, ${item.numero} - ${item.bairro}, ${item.cidade}/${item.estado}
        <br>CEP: ${item.cep}
        <br><strong>${textos.ativo_endereco.replace(' ?', ':')} ${item.ativo == 'A' ? textos.ativo_endereco_sim : textos.ativo_endereco_nao}</strong>`

        adicionar_coluna(linha, endereco)

        coluna = document.createElement('td')
        botao_editar = adicionar_botao('../../../../imagens/editar.png', function () {
            document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
                elemento.classList.remove('esconder')
            })

            document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
                elemento.classList.add('esconder')
            })

            carregar_endereco_cadastro(item)
            valores_endereco = item
            cadatro_endereco_status = 'EDITAR'

            botao_cancelar.onclick = botao_cancelar_endereco_click
            botao_salvar.onclick = botao_salvar_endereco_click
        })

        botao_remover = adicionar_botao('../../../../imagens/remover.png', function () {
            item.ativo = 'I'
            montar_tabela_endereco()
        })

        coluna.appendChild(botao_editar)
        coluna.appendChild(botao_remover)
        linha.appendChild(coluna)

        tabela_dados.appendChild(linha)
    })

    if (valores_pessoa.enderecos.length > 0) {
        exibir_situacao_operacao_endereco('TEM_DADOS')
    } else {
        exibir_situacao_operacao_endereco('SEM_DADOS')
    }
}

limpar_endereco_cadastro = function () {
    valores_endereco = {
        id_endereco: null,
        cep: null,
        logradouro: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
        tipo_endereco: null,
        ativo: null,
        buscado_por_cep: null
    }

    tipos_endereco = document.getElementsByName('tipo_endereco');

    for (var i = 0, length = tipos_endereco.length; i < length; i++) {
        tipos_endereco[i].checked = false
    }

    document.getElementById('cep').value = ''
    logradouro = document.getElementById('logradouro')
    logradouro.value = ''
    habilitar_campo(logradouro.id, true)

    document.getElementById('numero').value = ''

    bairro = document.getElementById('bairro')
    bairro.value = ''
    habilitar_campo(bairro.id, true)

    cidade = document.getElementById('cidade')
    cidade.value = ''
    habilitar_campo(cidade.id, true)

    estado = document.getElementById('estado')
    estado.value = ''
    habilitar_campo(estado.id, true)

    ativo_endereco = document.getElementsByName('ativo_endereco');

    for (var i = 0, length = ativo_endereco.length; i < length; i++) {
        ativo_endereco[i].checked = false
    }
}

carregar_endereco_cadastro = function (endereco) {
    tipos_endereco = document.getElementsByName('tipo_endereco');

    for (var i = 0, length = tipos_endereco.length; i < length; i++) {
        tipos_endereco[i].checked = (endereco.tipo_endereco == tipos_endereco[i].value)
    }

    adicionarValorCampo('cep', endereco.cep)
    adicionarValorCampo('logradouro', endereco.logradouro)
    adicionarValorCampo('numero', endereco.numero)
    adicionarValorCampo('bairro', endereco.bairro)
    adicionarValorCampo('cidade', endereco.cidade)
    adicionarValorCampo('estado', endereco.estado)

    radio_endereco_ativo = endereco.ativo == 'A' ? 'ativo_endereco_sim' : 'ativo_endereco_nao'
    adicionarValorCampo(radio_endereco_ativo, true)

    habilitado = !endereco.buscado_por_cep

    habilitar_campo(logradouro.id, habilitado)
    habilitar_campo(bairro.id, habilitado)
    habilitar_campo(cidade.id, habilitado)
    habilitar_campo(estado.id, habilitado)
}

