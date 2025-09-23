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
    valores_dados[id] = parseInt(elemento.dataset.abobrinha)
    esconder_informacao(elemento)

    console.log(valores_dados)
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

        lista_li.onclick = function () {
            selecionar_item(lista_li, campo_salvar)
            adicionar_valor_campo(elemento_salvar, item[campo_nome])
        }

        lista_ul.appendChild(lista_li)
    });

    container.appendChild(lista_ul)
}

adicionar_valor_campo = function (elemento, valor) {
    elemento.value = valor
}