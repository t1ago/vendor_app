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

function focar_campo(elemento) {
    let elemento_pai = elemento.parentNode;
    let elemento_informacao = elemento_pai.getElementsByClassName('esconder')[0]
    if (elemento_informacao != undefined) {
        elemento_informacao.classList.remove('esconder')
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