function animacao_carregar(elemento, chave = true) {
    elemento_selecionado = elemento.parentNode.parentNode
    elemento_animado = document.createElement('div');
    elemento_animado.classList.add('elemento_animado');
    if (chave == true) {
        animacao = document.createElement('img');
        animacao.src = '../../../imagens/loading.png';
        animacao.classList.add('animar');
        elemento_animado.appendChild(animacao);
        elemento_selecionado.appendChild(elemento_animado);
    } else {
        elemento_animado = document.getElementsByClassName("elemento_animado")[0];
        elemento_animado.remove();
    } 
}
async function carregar_marca() {
    corpo_tabela = document.getElementById("corpo_tabela");
    corpo_tabela.innerHTML = "";
    animacao_carregar(corpo_tabela)
    requisicao = await fetch (`${API_HOST}/marca`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
    animacao_carregar(corpo_tabela,false)
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
    await fetch (`${API_HOST}/marca/${id}`, {
        method: "DELETE"
    })
    carregar_marca()
}
function editar_coluna(id) {
    window.location.href = "cadastro_marca.html?id="+id
}
carregar_marca();