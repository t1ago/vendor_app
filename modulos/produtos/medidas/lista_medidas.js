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

    if (medidas) {
        let listaMedidas = JSON.parse(medidas);

        // Verifica se o ID no localStorage está como número ou string
        listaMedidas = listaMedidas.filter(item => item.id !== id);

        // Atualiza o localStorage com a nova lista
        localStorage.setItem("medidas", JSON.stringify(listaMedidas));

        // Atualiza a exibição na tela
        exibir_dados();
    }
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
                // Trocar o span por um input
                const inputEditar = document.createElement("input");
                inputEditar.type = "text";
                inputEditar.value = item.nome;

                colunaNome.innerHTML = "";
                colunaNome.appendChild(inputEditar);

                // Criar botão salvar (💾)
                const botaoSalvar = document.createElement("button");
                botaoSalvar.innerText = "💾";
                botaoSalvar.onclick = () => {
                    const novoNome = inputEditar.value.trim();
                    if (novoNome !== "") {
                        item.nome = novoNome;
                        // Atualizar localStorage
                        localStorage.setItem("medidas", JSON.stringify(listaMedidas));
                        // Recarregar a tabela
                        exibir_dados();
                    } else {
                        alert("O nome não pode ser vazio.");
                    }
                };

                // Criar botão cancelar (❌)
                const botaoCancelar = document.createElement("button");
                botaoCancelar.innerText = "❌";
                botaoCancelar.onclick = () => {
                    exibir_dados(); // Recarrega a linha original
                };

                // Substituir botões de ação
                colunaAcoes.innerHTML = "";
                colunaAcoes.appendChild(botaoSalvar);
                colunaAcoes.appendChild(botaoCancelar);
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