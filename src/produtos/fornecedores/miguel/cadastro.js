valores_dados = {
    id_fornecedor: null,
    nome: null,
    id_moeda: null,
    preco_compra: null,
    preco_venda: null,
    id_cor: null,
    id_grupo: null,
    id_categoria: null,
    id_unidade_medida: null,
    id_marca: null,
    descricao: null
}

async function focar_campo(elemento, minha_funcao) {
    let elemento_pai = elemento.parentNode;
    let elemento_informacao = elemento_pai.querySelector('div');
    if (elemento_informacao) {
        elemento_informacao.classList.remove('esconder');
    }

    await minha_funcao(elemento)
}

function selecionar_item(elemento, id) {
    valores_dados[id] = parseInt(elemento.dataset.value)
    esconder_informacao(elemento)
    console.log(valores_dados)
}

function esconder_informacao(elemento) {
    let elemento_pai = elemento.parentNode
    elemento_pai = elemento_pai.parentNode
    if (elemento_pai != undefined) {
        elemento_pai.classList.add('esconder')
    }
}

document.addEventListener('click', (elemento) => {
    document.querySelectorAll('.coluna-base > div:not(.esconder)').forEach(div => {
        if (!div.parentNode.contains(elemento.target)) {
            div.classList.add('esconder');
        }
    });
});


adicionar_valor_campo = function (elemento, valor) {

    elemento.value = valor
}


buscar_informação_categoria = async function (elemento) {
    info_categoria = document.getElementById('info-categoria')
    info_categoria.innerHTML = ""


    requisicao = await fetch(`http://localhost:3000/categorias`, {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok == true) {


        lista = document.createElement('ul')

        lista_categoria = await requisicao.json()

        lista_categoria.data.forEach(item => {
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
        })

        info_categoria.appendChild(lista)

    } else {

    }

}

buscar_informação_grupo = async function (elemento) {
    info_grupo = document.getElementById('info-grupo')
    info_grupo.innerHTML = ""

    requisicao = await fetch(`http://localhost:3000/grupos`, {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    })

    if (requisicao.ok == true) {
        lista = document.createElement('ul')


        lista_grupo = await requisicao.json()

        lista_grupo.data.forEach(item => {
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
        })

        info_grupo.appendChild(lista)

    } else {

    }
}

buscar_informacao_moeda = async function (elemento) {
    info_moeda = document.getElementById("info-moeda")
    info_moeda.innerHTML = ""

    requisicao = await fetch(`http://localhost:3000/moedas`, {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    })

    if (requisicao.ok == true) {

        lista = document.createElement("ul")

        lista_moeda = await requisicao.json()
        lista_moeda.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_moeda = document.createElement("span")
            span_moeda.innerHTML = item.nome

            lista_item.appendChild(span_moeda)

            lista_item.onclick = function () {
                selecionar_item(lista_item, "id_moeda")
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        })

        info_moeda.appendChild(lista)
    } else {

    }
}

buscar_informacao_marca = async function (elemento) {
    info_marca = document.getElementById("info-marca")
    info_marca.innerHTML = ""

    requisicao = await fetch(``)

    if(requisicao.ok == true)

        lista = document.createElement("ul")

        lista_marca = await requisicao.json()
        lista_marca.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_item = document.createElement("li")
            span_item.innerHTML = item.nome

            lista_item.appendChild(span_item)
            lista_item.onclick = function() {
                selecionar_item(elemento, "id_marca")
                adicionar_valor_campo(elemento, item.nome)

                lista.appendChild(lista_item)
            }
        })

        info_marca.appendChild(lista)
    }


