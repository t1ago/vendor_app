const select_vinculo = document.getElementById("vinculo");

async function buscarIdVinculos() {
    resultado = await buscarVinculos();
    resultado.data.forEach(coluna => {
        option = document.createElement("option");
        span = document.createElement("span");
        option.value = coluna.id_pessoa;
        span.innerHTML = coluna.nome;
        option.appendChild(span);
        select_vinculo.appendChild(option);
    });
}

function preencherDadosPessoa(campo,valor) {
    data[campo] = valor;
}

function preencherDadosEndereco(campo,valor) {
    data_endereco[campo] = valor;
}

function preencherDados(elemento) {
    
}
buscarIdVinculos();
