API_HOST = 'http://127.0.0.1:3000'

let campo_nome = document.getElementById("nome")
let campo_moeda = document.getElementById("moeda")

function abrirCadastro() {
    window.location.href = "tela_de_moeda.html"
}

function voltarparaindex() {
    window.location.href = "../../../index.html"
}


async function carregarMoedas() {
    const corpotabela = document.getElementById("tabela-moedas")
    corpotabela.innerHTML = ""

    let requisicao = await fetch(`${API_HOST}/moedas`)
    if (requisicao.ok) {
        let resposta = await requisicao.json()
        let listamoeda = resposta.data



         adicionando_botao = function(linha, url_img, funcao) {
            const coluna = document.createElement("td");
            const botao = document.createElement("button");
            const imagem = document.createElement("img");

            imagem.src = url_img;
            imagem.width = 30;
            imagem.height = 18;

            botao.appendChild(imagem);
            botao.onclick = funcao;

            coluna.appendChild(botao);
            linha.appendChild(coluna);
        }

        listamoeda.forEach(function (item) {
            const linha = document.createElement("tr");
            const coluna_moeda = document.createElement("td");
            const coluna_nome = document.createElement("td");

            const span_moeda = document.createElement("span");
            const span_nome = document.createElement("span");

            span_moeda.innerHTML = item.moeda;
            span_nome.innerHTML = item.nome;

            coluna_moeda.appendChild(span_moeda);
            coluna_nome.appendChild(span_nome);

            linha.appendChild(coluna_moeda);
            linha.appendChild(coluna_nome);

            adicionando_botao(linha, "../../../imagens/editar.png", () => editar_item(item));
            adicionando_botao(linha, "../../../imagens/remover.png", () => excluir_item(item));

            corpotabela.appendChild(linha);

        })
    }
};

editar_item = async function (item) {
    window.location.href = "tela_de_moeda.html?id=" + item.id

}


excluir_item = async function (item) {
    await fetch(`${API_HOST}/moedas/${item.id}`, {
        method: "DELETE"
    })
    carregarMoedas()

}

carregarMoedas()


