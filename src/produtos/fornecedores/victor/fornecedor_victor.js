valores_dados = {
    id_fornecedor:null,
    nome: null,
    id_moeda: null,
    preco_compra: null,
    preco_venda: null,
    id_grupo:null,
    id_categoria:null,
    id_unidade_medida:null,
    id_marca:null,
    descricao:null
}

async function focar_campo(elemento,minha_funcao) {
    let elemento_pai = elemento.parentNode;
    let elemento_informacao = elemento_pai.getElementsByClassName('esconder')[0]
    if (elemento_informacao != undefined) {
        elemento_informacao.classList.remove('esconder')
    }
    
    await minha_funcao(elemento)
}
function desfocar_campo(event) {
    if (event?.target?.closest('.informacao-lista') || event?.target?.closest('input')) {
        return;
    }
    let lista_Elementos = document.getElementsByClassName('informacao-lista');
    for (let i = 0; i < lista_Elementos.length; i++) {
        lista_Elementos[i].classList.add('esconder');
    }
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
async function buscar_informacao_categorias(elemento) {
    try {
        info_categorias = document.getElementById("info_categorias")
        info_categorias.innerHTML = ""

        let elemento_carregando = document.createElement("span")
        elemento_carregando.innerHTML = "Carregando..."

        let div_resultado = document.createElement("div")
        div_resultado.style.color = "white"
        div_resultado.appendChild(elemento_carregando)

        info_categorias.appendChild(div_resultado)


        requisicao = await fetch(`http://localhost:3000/categorias`,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        div_resultado.remove()
        if (requisicao.ok ==true) {
            lista = document.createElement("ul")
            lista_categorias = await requisicao.json()
            lista_categorias.data.forEach(item => {
                //Puxa o id
                lista_item = document.createElement("li")
                lista_item.dataset.id = item.id
                span_item = document.createElement("span")
                span_item.innerHTML = item.nome
                lista_item.appendChild(span_item)

                lista_item.onclick = function() {
                    selecionar_item(lista_item, 'id_categoria')
                    adicionar_item_campo(elemento,item.nome)
                }
                lista.appendChild(lista_item)
            })
            info_categorias.appendChild(lista)
        }
    } catch {
        info_categorias = document.getElementById("info_categorias")
        info_categorias.innerHTML = ""

        let elemento_erro = document.createElement("span")
        elemento_erro.innerHTML = "Nenhuma categoria foi encontrada..."

        let div_resultado = document.createElement("div")
        div_resultado.style.color = "white"
        div_resultado.appendChild(elemento_erro)

        info_categorias.appendChild(div_resultado)
    } 
}
async function buscar_informacao_grupos(elemento) {
    try {
        info_grupos = document.getElementById("info_grupos")
        info_grupos.innerHTML = ""
        
        let elemento_carregando = document.createElement("span")
        elemento_carregando.innerHTML = "Carregando..."

        let div_resultado = document.createElement("div")
        div_resultado.style.color = "white"
        div_resultado.appendChild(elemento_carregando)

        info_grupos.appendChild(div_resultado)

        requisicao = await fetch(`http://localhost:3000/grupos`,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        div_resultado.remove()
        if(requisicao.ok == true) {
            lista = document.createElement("ul")
            listas_grupos = await requisicao.json()
            listas_grupos.data.filter(item => {
                return item.nome != null}).forEach(item => {
                    lista_item = document.createElement("li")
                    lista_item.dataset.id = item.id
                    span_item = document.createElement("span")
                    span_item.innerHTML = item.nome
                    lista_item.appendChild(span_item)

                    lista_item.onclick = function() {
                        selecionar_item(lista_item, 'id_categoria')
                        adicionar_item_campo(elemento,item.nome)
                    }
                    lista.appendChild(lista_item)
                })
                info_grupos.appendChild(lista)
        } 
    } catch {
        info_grupos = document.getElementById("info_categorias")
        info_grupos.innerHTML = ""

        let elemento_erro = document.createElement("span")
        elemento_erro.innerHTML = "Nenhum grupo foi encontrado..."

        let div_resultado = document.createElement("div")
        div_resultado.style.color = "white"
        div_resultado.appendChild(elemento_erro)

        info_grupos.appendChild(div_resultado)
    }  
}
async function buscar_informacao_marca(elemento) {
    let info_marca = document.getElementById("info_marca")
    info_marca.innerHTML = ""
    requisicao = await fetch(`http://localhost:3000/marca`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
    if (requisicao.ok == true) {
        lista = document.createElement("ul")
        listas_marcas = await requisicao.json()
        listas_marcas.data.filter(item => {
            return item.nome != null
        }).forEach(item => {
            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id
            span_item = document.createElement("span")
            span_item.innerHTML = item.nome
            lista_item.appendChild(span_item)

            lista_item.onclick = function() {
                selecionar_item(lista_item, 'id_marca')
                adicionar_item_campo(elemento,item.nome)
            }
            lista.appendChild(lista_item)
        })
        info_marca.appendChild(lista)
    } else {

    }
}
function adicionar_item_campo(elemento,valor) {
    elemento.value = valor
}