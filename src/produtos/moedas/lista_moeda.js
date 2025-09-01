campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")

function abrirCadastro() {
    window.location.href = "tela_de_moeda.html"
}

function voltarparaindex() {
    window.location.href = "../../../index.html"
}

async function carregarMoedas() {
    const corpotabela = document.getElementById("tabela-moedas")
    corpotabela.innerHTML = ""

    let requisicao = await fetch("http://localhost:3000/moedas")
    if (requisicao.ok) {
        let resposta = await requisicao.json()
        let listamoeda = resposta.data

        listamoeda.forEach(function (item) {
            const linha = document.createElement("tr")
            const coluna_moeda = document.createElement("td")
            const coluna_nome = document.createElement("td")
            const coluna_acoes = document.createElement("td")

            const span_moeda = document.createElement("span")
            const span_nome = document.createElement("span")
            const btn_editar = document.createElement("button")
            const btn_excluir = document.createElement("button")

            span_moeda.innerHTML = item.moeda
            span_nome.innerHTML = item.nome

            btn_editar.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/4226/4226577.png" alt="Editar" style="width:100%;height:18px;vertical-align:middle;border:none;padding:0;margin:0;" />';
            btn_editar.onclick = function () {
                window.location.href = "tela_de_moeda.html?id=" + item.id
            }

            btn_excluir.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="Excluir" style="width:100%;height:18px;vertical-align:middle;border:none;padding:0;margin:0;" />';
            btn_excluir.onclick = async function () {
                await fetch(`http://localhost:3000/moedas/${item.id}`, {
                    method: "DELETE"
                });
                carregarMoedas(); // recarrega lista depois de excluir
            };
            coluna_moeda.appendChild(span_moeda)
            coluna_nome.appendChild(span_nome)
            coluna_acoes.appendChild(btn_editar)
            coluna_acoes.appendChild(btn_excluir)

            linha.appendChild(coluna_moeda)
            linha.appendChild(coluna_nome)
            linha.appendChild(coluna_acoes)

            corpotabela.appendChild(linha)
        })
    }
}

carregarMoedas()
