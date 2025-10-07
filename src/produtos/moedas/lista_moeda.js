API_HOST = 'http://127.0.0.1:3000'

let campo_nome = document.getElementById("nome")
let campo_moeda = document.getElementById("moeda")

function abrirCadastro() {
    window.location.href = "tela_de_moeda.html"
}

function voltarparaindex() {
    window.location.href = "../../../index.html"
}

let listamoeda = [];
function carregarMoedas() {
    const corpotabela = document.getElementById("tabela-moedas")
    corpotabela.innerHTML = "";

    let requisicao = await fetch(`${API_HOST}/moedas`)
    if (requisicao.ok) {
        let resposta = await requisicao.json()
        let lista = resposta.data

        adicionando_coluna = function (linha, valor) {
            let coluna = document.createElement('td');
            let span = document.createElement('span');
            span.innerHTML = valor;
            coluna.appendChild(span);
            linha.appendChild(coluna);
        };

        adicionando_botao = function (linha, url_img, funcao) {
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

        lista.forEach((item) => {
            let linha = document.createElement('tr');
            adicionando_coluna(linha, item.nome);
            adicionando_coluna(linha, item.moeda);

            adicionando_botao(linha, "../../../imagens/editar.png", () => editar_item(item));
            adicionando_botao(linha, "../../../imagens/remover.png", () => excluir_item(item));

            corpotabela.appendChild(linha);
        })

    }
};

editar_item = async function (item) {
    // Redirect to edit page with item id in query string
    window.location.href = "tela_de_moeda.html?id=" + item.id;
}


excluir_item = async function (item) {
    await fetch(`${API_HOST}/moedas/${item.id}`, {
        method: "DELETE"
    })
    carregarMoedas()

}

carregarMoedas()


