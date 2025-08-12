function abrirCadastro() {
    window.location.href = "cadastro_marca.html"
}

function voltarIndex() {
    window.location.href = "../../../index.html"
}

let listaMarca = [];
async function carregarMarca() {
    corpo_tabela = document.getElementById("corpo_tabela");
    corpo_tabela.innerHTML = "";
    requisicao = await fetch ('http://localhost:3000/marca', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
    if (requisicao.ok == true) {
        listaMarca = await requisicao.json()
        listaMarca.data.filter(item => {
            return item.nome != null }).forEach(function (item) {
            linha = document.createElement("tr");
            coluna_nome = document.createElement("td");
            coluna_acoes = document.createElement("td");
            span_nome = document.createElement("span");
            botao_editar = document.createElement("button");
            botao_excluir = document.createElement("button");

            botao_editar.innerHTML = "editar"
            botao_editar.onclick = () => editar_coluna(item.id);

            botao_excluir.innerHTML = "excluir"
            botao_excluir.onclick = () => excluir_coluna(item.id);

            span_nome.innerHTML = item.nome
            coluna_nome.appendChild(span_nome);
            linha.appendChild(coluna_nome);
            coluna_acoes.appendChild(botao_editar);
            coluna_acoes.appendChild(botao_excluir);
            linha.appendChild(coluna_acoes);
            corpo_tabela.appendChild(linha);
        });
    }
}
async function excluir_coluna(id) {
    await fetch (`http://localhost:3000/marca/${id}`, {
        method: "DEL"
    })
    carregarMarca()
}
function editar_coluna(id) {
    window.location.href = "cadastro_marca.html?id="+id
}
carregarMarca();