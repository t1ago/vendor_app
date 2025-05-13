// Pegando os elementos do DOM
const campo_novo_id = document.getElementById("campo_novo_id")
const campo_novo_nome = document.getElementById("campo_novo_nome");

function abrirCadastro() {
    window.location.href = "cadastro_medidas.html"
}

function irParaIndex () {
    window.location.href = "../../../index.html"
}

function excluir_medida(id) {
    let medidas = localStorage.getItem("medidas");
    let listaMedidas = JSON.parse(medidas);

    indice = listaMedidas.findIndex(function(valor, index, obj){
        return valor.id == id
    })
    listaMedidas.splice(indice, 1)

    medidas = JSON.stringify(listaMedidas)
    window.localStorage.setItem("medidas", medidas)

    exibir_dados();
}

function exibir_dados () {
    const corpoTabela = document.getElementById("corpo_tabela");
    corpoTabela.innerHTML = ""; // Limpa a tabela

    let medidas = localStorage.getItem("medidas");
    if (medidas) {
        let listaMedidas = JSON.parse(medidas);

        listaMedidas.forEach((item) => {
            const linha = document.createElement("tr");

            const colunaNome = document.createElement("td");
            const spanNome = document.createElement("span");
            spanNome.innerText = item.nome;
            colunaNome.appendChild(spanNome);

            const colunaAcoes = document.createElement("td");

            // Botão editar
            const botaoEditar = document.createElement("button");
            botaoEditar.innerText = "✏️";
            botaoEditar.onclick = () => {
                window.location.href = `cadastro_medidas.html?id=${item.id}`;
            };

            // Botão excluir
            const botaoExcluir = document.createElement("button");
            botaoExcluir.innerText = "🗑️";
            botaoExcluir.onclick = () => {
                excluir_medida(item.id);
            };

            colunaAcoes.appendChild(botaoEditar);
            colunaAcoes.appendChild(botaoExcluir);

            linha.appendChild(colunaNome);
            linha.appendChild(colunaAcoes);

            corpoTabela.appendChild(linha);
        });
    }
}

exibir_dados();