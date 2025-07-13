function abrirCadastro() {
    window.location.href = "../new_cores/cadastro_cores.html"
}

function irParaIndex() {
    window.location.href = "../../../index.html"
}

function excluirCor(id) {
    let cores = localStorage.getItem("ListaCores");
    let listaCores = JSON.parse(cores);

    indice = listaCores.findIndex(function(valor){
        return valor.id == id
    })
    listaCores.splice(indice, 1)

    cores = JSON.stringify(listaCores)
    window.localStorage.setItem("ListaCores", cores)

    exibirDados();
}

function exibirDados() {
    const corpoTabela = document.getElementById("corpo_tabela")
    corpoTabela.innerHTML = "";

    let cores = localStorage.getItem("ListaCores");
    if(cores) {
        ListaCores = JSON.parse(cores);

        ListaCores.forEach(function(item, i){
            const linha = document.createElement("tr");

            //Coluna Cor
            const colunaCor = document.createElement("td");
            const quadradoCor = document.createElement("div")
            quadradoCor.style.width = "20px";
            quadradoCor.style.height = "20px";
            quadradoCor.style.background = item.hex;
            quadradoCor.style.display = "inline-block";
            quadradoCor.style.borderRadius = "4px";
            colunaCor.appendChild(quadradoCor);

            //Coluna Hexadecimal
            const colunaHex = document.createElement("td");
            const spanHex = document.createElement("span")
            spanHex.innerHTML = item.hex
            colunaHex.appendChild(spanHex)

            //Coluna Ações
            const colunaAcoes = document.createElement("td");

            //Botão Editar
            const botaoEditar = document.createElement("button");
            botaoEditar.innerHTML = "✏️ Editar";
            botaoEditar.onclick = function () {
                window.location.href = `../new_cores/cadastro_cores.html?id=${item.id}`;
            };
            colunaAcoes.appendChild(botaoEditar);

            //Botao excluir
            const botaoExcluir = document.createElement("button");
            botaoExcluir.innerHTML = "🗑️ Excluir"
            botaoExcluir.onclick = function () {
                excluirCor(item.id);
            };
            colunaAcoes.appendChild(botaoExcluir);

            linha.appendChild(colunaCor);
            linha.appendChild(colunaHex);
            linha.appendChild(colunaAcoes)

            corpoTabela.appendChild(linha);

        })
            
    }
}

exibirDados();