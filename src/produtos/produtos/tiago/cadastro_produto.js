grupo_botoes = document.getElementsByClassName('coluna-botoes-cadastro')[0]
grupo_mensagem = document.getElementsByClassName('coluna-operacao')[0]
mensagem_operacao = document.getElementById('operacao')
mensagem_imagem = document.getElementById('imagem')

valores_dados = {
    id_fornecedor: null,
    nome: null,
    id_moeda: null,
    preco_compra: null,
    preco_venda: null,
    id_grupo: null,
    id_categoria: null,
    id_undade_medida: null,
    id_marca: null,
    id_cor: null,
    descricao: null
}
elemento_focado = null
nova_selecao = false

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

clique_geral = function () {
    if (nova_selecao) {
        nova_selecao = false
    } else {
        infos = document.getElementsByClassName('informacao-consulta')

        Array.from(infos).forEach(item => {
            if (item.classList.contains('esconder') == false) {
                item.classList.add('esconder')
            }
        })
    }
}

foco_campo = async function (elemento, minha_funcao) {
    elemento_focado = elemento
    nova_selecao = true

    elemento_pai = elemento.parentNode
    elemento_informacao = elemento_pai.getElementsByClassName('esconder')[0]

    if (elemento_informacao != undefined) {
        elemento_informacao.classList.remove('esconder')
    }

    await minha_funcao(elemento)
}

selecionar_item = function (elemento, id) {
    valores_dados[id] = parseInt(elemento.dataset.id)
    esconder_informacao(elemento)
}

esconder_informacao = function (elemento) {
    elemento_pai = elemento.parentNode
    elemento_pai = elemento_pai.parentNode

    if (elemento_pai != undefined) {
        elemento_pai.classList.add('esconder')
    }
}

animacao_carregando_dados = function (elemento, show = true) {
    elemento.innerHTML = ''
    if (show) {
        elemento.style.overflow = 'hidden'
        img = document.createElement('img')
        img.src = '../../../../imagens/loading.png'
        elemento.appendChild(img)
    } else {
        elemento.style.removeProperty('overflow')
    }
}

buscar_informacao_categorias = async function (elemento) {
    info_categorias = document.getElementById('info-categorias')
    animacao_carregando_dados(info_categorias)

    try {
        requisicao = await fetch(`${API_HOST}/categorias`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (requisicao.ok == true) {
            animacao_carregando_dados(info_categorias, false)

            dados = await requisicao.json()
            criar_lista_informacao(dados, 'nome', 'id', 'id_categoria', elemento, info_categorias)
        } else {
            animacao_carregando_dados(info_categorias, false)
            exibir_informacao_falha(info_categorias, 'Nenhuma categoria localizado')
        }
    }
    catch (erro) {
        animacao_carregando_dados(info_categorias, false)
        exibir_informacao_falha(info_categorias, 'Nenhuma categoria localizado')
    }
}

buscar_informacao_grupos = async function (elemento) {
    info_grupos = document.getElementById('info-grupos')
    animacao_carregando_dados(info_grupos)

    try {
        requisicao = await fetch(`${API_HOST}/grupos`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (requisicao.ok == true) {
            animacao_carregando_dados(info_grupos, false)

            dados = await requisicao.json()
            criar_lista_informacao(dados, 'nome', 'id', 'id_grupo', elemento, info_grupos)
        } else {
            animacao_carregando_dados(info_categorias, false)
            exibir_informacao_falha(info_categorias, 'Nenhum grupo localizado')
        }
    } catch (erro) {
        animacao_carregando_dados(info_categorias, false)
        exibir_informacao_falha(info_categorias, 'Nenhum grupo localizado')
    }
}

buscar_informacao_moedas = async function (elemento) {
    info_moedas = document.getElementById('info-moedas')
    animacao_carregando_dados(info_moedas)

    try {
        requisicao = await fetch(`${API_HOST}/moedas`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (requisicao.ok == true) {
            animacao_carregando_dados(info_moedas, false)

            dados = await requisicao.json()
            criar_lista_informacao(dados, 'nome', 'id', 'id_moeda', elemento, info_moedas)
        } else {
            animacao_carregando_dados(info_moedas, false)
            exibir_informacao_falha(info_moedas, 'Nenhum grupo localizado')
        }
    } catch (erro) {
        animacao_carregando_dados(info_moedas, false)
        exibir_informacao_falha(info_moedas, 'Nenhum grupo localizado')
    }
}

buscar_informacao_marcas = async function (elemento) {
    info_marcas = document.getElementById('info-marcas')
    animacao_carregando_dados(info_marcas)

    try {
        requisicao = await fetch(`${API_HOST}/marca`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (requisicao.ok == true) {
            animacao_carregando_dados(info_marcas, false)

            dados = await requisicao.json()
            criar_lista_informacao(dados, 'nome', 'id', 'id_marca', elemento, info_marcas)
        } else {
            animacao_carregando_dados(info_marcas, false)
            exibir_informacao_falha(info_marcas, 'Nenhum grupo localizado')
        }
    } catch (erro) {
        animacao_carregando_dados(info_marcas, false)
        exibir_informacao_falha(info_marcas, 'Nenhum grupo localizado')
    }
}

buscar_informacao_cores = async function (elemento) {
    info_cores = document.getElementById('info-cores')
    animacao_carregando_dados(info_cores)

    try {
        requisicao = await fetch(`${API_HOST}/cores`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (requisicao.ok == true) {
            animacao_carregando_dados(info_cores, false)

            dados = await requisicao.json()
            criar_lista_informacao(dados, 'hexadecimal', 'id', 'id_cor', elemento, info_cores)
        } else {
            animacao_carregando_dados(info_cores, false)
            exibir_informacao_falha(info_cores, 'Nenhum grupo localizado')
        }
    } catch (erro) {
        animacao_carregando_dados(info_cores, false)
        exibir_informacao_falha(info_cores, 'Nenhum grupo localizado')
    }
}

buscar_informacao_medidas = async function (elemento) {
    info_medidas = document.getElementById('info-medidas')
    animacao_carregando_dados(info_medidas)

    try {
        requisicao = await fetch(`${API_HOST}/medidas`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (requisicao.ok == true) {
            animacao_carregando_dados(info_medidas, false)

            dados = await requisicao.json()
            criar_lista_informacao(dados, 'nome', 'id', 'id_undade_medida', elemento, info_medidas)
        } else {
            animacao_carregando_dados(info_medidas, false)
            exibir_informacao_falha(info_medidas, 'Nenhum grupo localizado')
        }
    } catch (erro) {
        animacao_carregando_dados(info_medidas, false)
        exibir_informacao_falha(info_medidas, 'Nenhum grupo localizado')
    }
}

exibir_informacao_falha = function (elemento, mensagem) {
    lista = document.createElement('ul')
    lista_item = document.createElement('li')
    span_item = document.createElement('span')
    span_item.innerHTML = mensagem
    lista_item.appendChild(span_item)
    lista.appendChild(lista_item)
    elemento.appendChild(lista)
}

criar_lista_informacao = function (dados, campo_nome, campo_id, campo_salvar, elemento_salvar, container) {
    lista_ul = document.createElement('ul')
    lista_dados = dados

    lista_dados.data.filter(item => {
        return item[campo_nome] != null
    }).forEach(item => {
        lista_li = document.createElement('li')
        lista_li.dataset.id = item[campo_id]

        span = document.createElement('span')
        span.innerHTML = item[campo_nome]

        lista_li.appendChild(span)

        lista_li.onclick = function (event) {
            selecionar_item(event.currentTarget, campo_salvar)
            adicionar_valor_campo(elemento_salvar, item[campo_nome])
            campo_onkeyup(elemento_salvar)
        }

        lista_ul.appendChild(lista_li)
    });

    container.appendChild(lista_ul)
}

adicionar_valor_campo = function (elemento, valor) {
    elemento.value = valor

}

botao_cancelar_click = function () {
    navegarPara('lista_fornecedor.html');
}

campo_onchange = function (propriedade, elemento) {

    if (propriedade == 'preco_compra' || propriedade == 'preco_venda') {
        elemento.value = mascarar_moeda_pt_br(elemento.value)
        campo_onkeyup(elemento)
    }

    valores_dados[propriedade] = elemento.value
}

campo_onkeyup = function (elemento) {
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

botao_salvar_click = async function () {

    if (validar_campo('name', 'mensagem_name')) {
        return
    }

    if (validar_campo('coin', 'mensagem_coin')) {
        return
    }

    if (validar_campo('buy', 'mensagem_buy')) {
        return
    }

    if (validar_campo('sale', 'mensagem_sale')) {
        return
    }

    if (validar_campo('group', 'mensagem_group')) {
        return
    }

    if (validar_campo('category', 'mensagem_category')) {
        return
    }

    if (validar_campo('measure', 'mensagem_measure')) {
        return
    }

    if (validar_campo('brand', 'mensagem_brand')) {
        return
    }

    if (validar_campo('color', 'mensagem_color')) {
        return
    }

    if (validar_campo('desc', 'mensagem_desc')) {
        return
    }

    await salvar_fornecedor(valores_dados.id_fornecedor == null ? 'INCLUIR' : 'ALTERAR')
}

botao_cancelar_click = function () {
    navegarPara('lista_produto.html')
}

salvar_fornecedor = async function (acao = 'INCLUIR') {

    mensagem_start = acao == 'INCLUIR' ? 'Criando fornecedor' : 'Alterando fornecedor'
    mensagem_end = acao == 'INCLUIR' ? 'Fornecedor criado com sucesso' : 'Fornecedor alterado com sucesso'

    exibir_situacao_operacao('SALVANDO', mensagem_start)

    body = {
        nome: valores_dados.nome,
        descricao: valores_dados.descricao,
        idCategoria: valores_dados.id_categoria,
        idMoeda: valores_dados.id_moeda,
        idGrupo: valores_dados.id_grupo,
        idUndadeMedida: valores_dados.id_undade_medida,
        idCor: valores_dados.id_cor,
        idMarca: valores_dados.id_marca,
        precoCompra: parseFloat(remover_mascara_moeda_pt_br(valores_dados.preco_compra)),
        precoVenda: parseFloat(remover_mascara_moeda_pt_br(valores_dados.preco_venda))
    }

    endpoint = `${API_HOST}`

    if (acao == 'INCLUIR') {
        endpoint += '/produtos/tiago'
    } else {
        endpoint += `/produtos/tiago/${valores_dados.id_fornecedor}`
    }

    requisicao = await fetch(endpoint, {
        method: acao == 'INCLUIR' ? 'POST' : 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (requisicao.ok == true) {
        exibir_situacao_operacao('SUCESSO', mensagem_end)
        setInterval(function () {
            botao_cancelar_click()
        }, 2000)
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao salvar fornecedor')
        setInterval(function () {
            exibir_situacao_operacao('LIMPAR', '')
        }, 2000)
    }

}

exibir_dados = async function () {

    url_parametros = window.location.search

    if (url_parametros != '') {
        exibir_situacao_operacao('BUSCANDO', 'Buscando informação')
        parametros = new URLSearchParams(url_parametros)
        parametro_id = parametros.get('id')

        requisicao = await fetch(`${API_HOST}/produtos/tiago/${parametro_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        if (requisicao.ok === true) {
            resposta = await requisicao.json()
            objeto_fornecedor = resposta.data[0]

            if (objeto_fornecedor) {
                valores_dados.id_fornecedor = objeto_fornecedor.id
                valores_dados.nome = objeto_fornecedor.nome
                valores_dados.id_moeda = objeto_fornecedor.id_moeda
                valores_dados.preco_compra = mascarar_moeda_pt_br(objeto_fornecedor.preco_compra)
                valores_dados.preco_venda = mascarar_moeda_pt_br(objeto_fornecedor.preco_venda)
                valores_dados.id_grupo = objeto_fornecedor.id_grupo
                valores_dados.id_categoria = objeto_fornecedor.id_categoria
                valores_dados.id_undade_medida = objeto_fornecedor.id_undade_medida
                valores_dados.id_marca = objeto_fornecedor.id_marca
                valores_dados.id_cor = objeto_fornecedor.id_cor
                valores_dados.descricao = objeto_fornecedor.descricao

                adicionarValorCampo = function (id, value) {
                    campo = document.getElementById(id)
                    campo.value = value
                }

                adicionarValorCampo('name', valores_dados.nome)
                adicionarValorCampo('coin', objeto_fornecedor.nome_moeda)
                adicionarValorCampo('buy', valores_dados.preco_compra)
                adicionarValorCampo('sale', valores_dados.preco_venda)
                adicionarValorCampo('group', objeto_fornecedor.nome_grupo)
                adicionarValorCampo('category', objeto_fornecedor.nome_categoria)
                adicionarValorCampo('measure', objeto_fornecedor.nome_unidade_medida)
                adicionarValorCampo('brand', objeto_fornecedor.nome_marca)
                adicionarValorCampo('color', objeto_fornecedor.hexadecimal)
                adicionarValorCampo('desc', valores_dados.descricao)
            }

            exibir_situacao_operacao('ALTERAR', '')
        } else {
            exibir_situacao_operacao('ERRO', 'Falha ao recuperar categoria')
            setInterval(function () {
                botao_cancelar_click()
            }, 2000)
        }
    } else {
        exibir_situacao_operacao('NOVO', '')
    }

}

exibir_dados()





