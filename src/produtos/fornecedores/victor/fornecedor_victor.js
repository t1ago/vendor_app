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
    await minha_funcao()
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
async function buscar_informacao_categorias() {
    info_categorias = document.getElementById("info_categorias")
    info_categorias.innerHTML = ""
    
    requisicao = await fetch(`http://localhost:3000/categorias`,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
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
            }
            lista.appendChild(lista_item)
        })
        info_categorias.appendChild(lista)
    } else {

    }
}
async function buscar_informacao_grupo() {
    info_grupos = document.getElementById("info_grupo")
    info_grupos.innerHTML = ""
    requisicao = await fetch(`http://localhost:3000/grupos`,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
}