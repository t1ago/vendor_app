
grupo_botoes = document.getElementsByClassName('coluna-botoes-cadastro')[0]
grupo_mensagem = document.getElementsByClassName('coluna-operacao')[0]
mensagem_operacao = document.getElementById('operacao')
mensagem_imagem = document.getElementById('imagem')
botao_cancelar = document.getElementById('botao_cancelar')
botao_salvar = document.getElementById('botao_salvar')

valores_dados = {
    id_pessoa: null,
    nome: null,
    apelido: null,
    tipo_pessoa: null,
    sexo: null,
    data_inicio: null,
    documento_estadual: null,
    documento_federeal: null,
    id_vinculo: null,
    ativo: null,
    enderecos: []
}

//Auxiliares
adicionarValorObjeto = function (objeto, propriedade, valor) {
    objeto[propriedade] = valor
}

adicionarValorCampo = function (id, valor) {
    elemento = document.getElementById(id)

    if (elemento.type == 'radio') {
        elemento.checked = valor
    }
}

//Validações
campo_onkeyup = function (elemento) {
    return validar_campo_estrutura(elemento)
}

campo_onkeyup_number = function (event) {
    value = event.keyCode
    if (value < 48 || value > 57) {
        event.currentTarget.value = event.currentTarget.value.slice(0, event.currentTarget.value.length - 1)
    }
    return validar_campo_estrutura(event.currentTarget)
}

campo_onchange = function (propriedade, elemento) {
    if (validar_campo_estrutura(elemento) == false) {
        adicionarValorObjeto(valores_dados, propriedade, elemento.value)
    } else {
        adicionarValorObjeto(valores_dados, propriedade, null)
    }

    console.log(valores_dados)
}

validar_campo_estrutura = function (elemento) {
    campo_id = elemento.id
    elemento_pai = elemento.parentNode
    mensagem_id = elemento_pai.getElementsByClassName('mensagem')[0].id

    return validar_campo(campo_id, mensagem_id)
}

validar_campo = function (campod_id, mensagem_id) {
    campo = document.getElementById(campod_id)
    campo_name = campo.name

    mensagem = document.getElementById(mensagem_id)
    label = document.querySelector(`label[for=${campo_name}]`)
    label_value = label.innerHTML

    validacoes = []

    if (campo.required) {
        validacoes.push('valueMissing')
    }

    if (campo.minLength) {
        validacoes.push('tooShort')
    }

    if (campo.maxLength) {
        validacoes.push('tooLong')
    }

    campo.classList.remove('erro')
    mensagem.innerHTML = ''
    mensagem.classList.remove('erro')

    tem_erro = false

    for (let index = 0; index < validacoes.length; index++) {
        const validacao = validacoes[index];
        resultado = campo.validity[validacao]

        if (resultado) {

            mensagem_texto = ''
            switch (validacao) {
                case 'valueMissing':
                    mensagem_texto = `${label_value} não informado`
                    break;
                case 'tooShort':
                    mensagem_texto = `Informe uma palavra com ${campo.minLength} letras`
                    break;
                case 'tooLong':
                    mensagem_texto = `Informe um texto com até ${campo.maxLength} letras`
                    break;
                default:
                    break;
            }

            campo.classList.add('erro')
            mensagem.innerHTML = mensagem_texto
            mensagem.classList.add('erro')

            tem_erro = true
            break
        }
    }

    return tem_erro
}



//Endereços
botao_novo_endereco_click = function () {
    document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
        elemento.classList.remove('esconder')
    })

    document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
        elemento.classList.add('esconder')
    })

    botao_cancelar.onclick = botao_cancelar_endereco_click
    botao_salvar.onclick = botao_salvar_endereco_click
}

botao_cancelar_endereco_click = function () {
    document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
        elemento.classList.add('esconder')
    })

    document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
        elemento.classList.remove('esconder')
    })
}

botao_salvar_endereco_click = function () {
    document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
        elemento.classList.add('esconder')
    })

    document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
        elemento.classList.remove('esconder')
    })
}

//Exibição
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

exiber_dados_textos = async function (textos, callback_error) {

    elemento_data = function (data) {
        return document.querySelector(`[${data}]`)
    }

    elemento_data('data-texto-ativo').innerHTML = textos.ativo
    elemento_data('data-texto-ativo-sim').innerHTML = textos.ativo_sim
    elemento_data('data-texto-ativo-nao').innerHTML = textos.ativo_nao
    elemento_data('data-texto-botao-cancelar').innerHTML = textos.botao_cancelar
    elemento_data('data-texto-botao-salvar').innerHTML = textos.botao_salvar
    elemento_data('data-texto-titulo-endereco').innerHTML = textos.titulo_endereco
    elemento_data('data-texto-cep').innerHTML = textos.cep
    elemento_data('data-texto-logradouro').innerHTML = textos.logradouro
    elemento_data('data-texto-numero').innerHTML = textos.numero
    elemento_data('data-texto-bairro').innerHTML = textos.bairro
    elemento_data('data-texto-cidade').innerHTML = textos.cidade
    elemento_data('data-texto-estado').innerHTML = textos.estado
    elemento_data('data-texto-ativo-endereco').innerHTML = textos.ativo_endereco
    elemento_data('data-texto-ativo-endereco-sim').innerHTML = textos.ativo_endereco_sim
    elemento_data('data-texto-ativo-endereco-nao').innerHTML = textos.ativo_endereco_nao
    elemento_data('data-texto-tipo-endereco').innerHTML = textos.tipo_endereco
    elemento_data('data-texto-tipo-endereco-moradia').innerHTML = textos.tipo_endereco_moradia
    elemento_data('data-texto-tipo-endereco-cobranca').innerHTML = textos.tipo_endereco_cobranca
    elemento_data('data-texto-tipo-endereco-entrega').innerHTML = textos.tipo_endereco_entrega
    elemento_data('data-texto-tabela-vazia').innerHTML = textos.mensagem_tabela_vazia

    if (parametro_tipo_pessoa == 'F') {
        elemento_data('data-texto-titulo').innerHTML = textos.titulo_tpf
        elemento_data('data-texto-nome').innerHTML = textos.nome_tpf
        elemento_data('data-texto-apelido').innerHTML = textos.apelido_tpf
        elemento_data('data-texto-documento-federeal').innerHTML = textos.documento_federal_tpf
        elemento_data('data-texto-documento-estadual').innerHTML = textos.documento_estadual_tpf
        elemento_data('data-texto-data-nascimento').innerHTML = textos.data_nascimento
        elemento_data('data-texto-vinculo').innerHTML = textos.vinculo
        elemento_data('data-texto-sexo').innerHTML = textos.sexo
        elemento_data('data-texto-sexo-feminino').innerHTML = textos.sexo_feminino
        elemento_data('data-texto-sexo-masculino').innerHTML = textos.sexo_masculino
    } else if (parametro_tipo_pessoa == 'J') {

        document.querySelectorAll('[data-visible="F"]').forEach(function (elemento) {
            elemento.classList.add('esconder')
        })

        divAtivo = document.getElementById('divAtivo')
        elementosParaMover = Array.from(divAtivo.childNodes)
        novoDivAtivo = elemento_data('data-local-ativo-pessoa-juridica')

        for (let index = 0; index < elementosParaMover.length; index++) {
            const elemento = elementosParaMover[index];
            novoDivAtivo.appendChild(elemento)
        }

        divAtivo.classList.add('esconder')
        novoDivAtivo.classList.remove('esconder')

        elemento_data('data-texto-titulo').innerHTML = textos.titulo_tpj
        elemento_data('data-texto-nome').innerHTML = textos.nome_tpj
        elemento_data('data-texto-apelido').innerHTML = textos.apelido_tpj
        elemento_data('data-texto-documento-federeal').innerHTML = textos.documento_federal_tpj
        elemento_data('data-texto-documento-estadual').innerHTML = textos.documento_estadual_tpj
    } else {
        callback_error()
    }
}

exibir_dados = async function () {

    url_parametros = window.location.search

    if (url_parametros != '') {
        exibir_situacao_operacao('BUSCANDO', 'Buscando informação')
        parametros = new URLSearchParams(url_parametros)
        parametro_tipo_pessoa = parametros.get('tipo_pessoa')
        parametro_id = parametros.has('id') ? parametros.get('id') : undefined

        requisicao = await fetch(`../tiago/textos.json`)

        if (requisicao.ok === true) {
            textos = await requisicao.json()

            exiber_dados_textos(textos, function () {
                exibir_situacao_operacao('ERRO', 'Falha ao determinar tipo do cadastro')
                setInterval(function () {
                    botao_cancelar_click()
                }, 2000)
            })

            exibir_situacao_operacao('BUSCOU_TEXTOS', '')
        } else {
            exibir_situacao_operacao('ERRO', 'Falha ao recuperar textos')
            setInterval(function () {
                botao_cancelar_click()
            }, 2000)
        }

        if (parametro_id) {
            // Fazer a parte de recuperar dados
        } else {
            adicionarValorCampo('ativo_sim', true)
            adicionarValorObjeto(valores_dados, 'ativo', true)
            adicionarValorObjeto(valores_dados, 'tipo_pessoa', parametro_tipo_pessoa)

            if (parametro_tipo_pessoa == 'F') {
                adicionarValorCampo('sexo_masculino', 'M')
                adicionarValorObjeto(valores_dados, 'sexo', 'M')
            }

            document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
                elemento.classList.add('esconder')
            })

            document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
                elemento.classList.remove('esconder')
            })

            document.getElementById('tabela').classList.add('esconder')
            document.getElementById('mensagem').classList.remove('esconder')
        }
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao determinar tipo do cadastro')
        setInterval(function () {
            botao_cancelar_click()
        }, 2000)
    }

}

exibir_dados()