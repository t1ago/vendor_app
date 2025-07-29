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

    requisicao = await fetch(`${API_HOST}/categorias`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok == true) {
        animacao_carregando_dados(info_categorias, false)
        lista = document.createElement('ul')
        lista_categorias = await requisicao.json()

        lista_categorias.data.forEach(item => {
            lista_item = document.createElement('li')
            lista_item.dataset.id = item.id

            span_item = document.createElement('span')
            span_item.innerHTML = item.nome

            lista_item.appendChild(span_item)

            lista_item.onclick = function () {
                selecionar_item(lista_item, 'id_categoria')
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        });

        info_categorias.appendChild(lista)
    } else {
        // vou fazer outra coisa
    }
}

buscar_informacao_grupos = async function (elemento) {
    info_grupos = document.getElementById('info-grupos')
    animacao_carregando_dados(info_grupos)

    requisicao = await fetch(`${API_HOST}/grupos`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok == true) {
        animacao_carregando_dados(info_grupos, false)
        lista = document.createElement('ul')
        lista_categorias = await requisicao.json()

        lista_categorias.data.filter(item => {
            return item.nome != null
        }).forEach(item => {
            lista_item = document.createElement('li')
            lista_item.dataset.id = item.id

            span_item = document.createElement('span')
            span_item.innerHTML = item.nome

            lista_item.appendChild(span_item)

            lista_item.onclick = function () {
                selecionar_item(lista_item, 'id_grupo')
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        });

        info_grupos.appendChild(lista)
    } else {
        // vou fazer outra coisa
    }

}

adicionar_valor_campo = function (elemento, valor) {
    elemento.value = valor
}