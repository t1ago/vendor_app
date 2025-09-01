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
    valores_dados[id] = parseInt(elemento.dataset.id)
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
    info_categoria.innerHTML = "🔄"


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

        info_categoria.innerHTML = ""
        info_categoria.appendChild(lista)

    } else {

        info_categoria.innerHTML = "erroo"
    }

}

buscar_informação_grupo = async function (elemento) {
    info_grupo = document.getElementById('info-grupo')
    info_grupo.innerHTML = "🔄"

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

        info_grupo.innerHTML = ""
        info_grupo.appendChild(lista)


    } else {

    }
}

buscar_informacao_moeda = async function (elemento) {
    info_moeda = document.getElementById("info-moeda")
    info_moeda.innerHTML = "🔄"

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

        info_moeda.innerHTML = ""
        info_moeda.appendChild(lista)

    } else {

    }
}

buscar_informacao_marca = async function (elemento) {
    info_marca = document.getElementById("info-marca")
    info_marca.innerHTML = "🔄"

    requisicao = await fetch("http://localhost:3000/marca", {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok == true) {

        lista = document.createElement("ul")

        lista_marca = await requisicao.json()
        lista_marca.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_marca = document.createElement("span")
            span_marca.innerHTML = item.nome

            lista_item.appendChild(span_marca)

            lista_item.onclick = function () {
                selecionar_item(lista_item, "id_marca")
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        })

        info_marca.innerHTML = ""
        info_marca.appendChild(lista)
    } else {

    }


}


buscar_informacao_medida = async function (elemento) {
    info_marca = document.getElementById("info-medida")
    info_marca.innerHTML = "🔄"

    requisicao = await fetch("http://localhost:3000/medidas", {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok == true) {

        lista = document.createElement("ul")

        lista_medida = await requisicao.json()
        lista_medida.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_medida = document.createElement("span")
            span_medida.innerHTML = item.nome

            lista_item.appendChild(span_medida)

            lista_item.onclick = function () {
                selecionar_item(lista_item, "id_unidade_medida")
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        })
        info_marca.innerHTML = ""
        info_marca.appendChild(lista)
    }


}



buscar_informacao_cor = async function (elemento) {

    info_cor = document.getElementById("info-cor")
    info_cor.innerHTML = "🔄"

    requisicao = await fetch(`http://localhost:3000/cores`, {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok = true) {

        lista = document.createElement("ul")

        lista_cor = await requisicao.json()

        lista_cor.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_cor = document.createElement("span")
            span_cor.innerHTML = item.hexadecimal

            lista_item.appendChild(span_cor)

            lista_item.onclick = function () {
                selecionar_item(lista_item, "id_cor")
                adicionar_valor_campo(elemento, item.hexadecimal)
            }
            lista.appendChild(lista_item)

        })

        info_cor.innerHTML = ""
        info_cor.appendChild(lista)
    } else {

    }

}
botao_salvar_click = function() {
    console.log(valores_dados)
}

exibir_dados = async function () {
    
    
}