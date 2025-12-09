const parametros = new URLSearchParams(window.location.search);
const tipo = parametros.get("tipo_pessoa");
const tabela = document.getElementById("corpo_pessoas")

function montarColuna(info){
    coluna = document.createElement("td");
    span = document.createElement("span");
    span.innerHTML = info;
    coluna.appendChild(span);
    return coluna;
}
async function montarEnderecos(moradia,cobranca,entrega) {
    coluna = document.createElement("td");
    if(moradia != null) {
        button_moradia = document.createElement("button");
        resultado_moradia = await buscarEnderecoId(moradia);
        button_moradia.onclick = function() {
            window.location.search = `www.google.com/maps/search/${resultado_moradia.cep}`;
        }
        button_moradia.innerHTML = "M"
        coluna.appendChild(button_moradia);
    }
    if(cobranca != null) {
        button_cobranca = document.createElement("button");
        resultado_cobranca = await buscarEnderecoId(cobranca);
        button_cobranca.onclick = function() {
            window.location.search = `www.google.com/maps/search/${resultado_cobranca.cep}`;
        }
        button_cobranca.innerHTML = "C"
        coluna.appendChild(button_cobranca);
    }
    if(entrega != null) {
        button_entrega = document.createElement("button");
        resultado_entrega = await buscarEnderecoId(entrega);
        button_entrega.onclick = function() {
            window.location.search = `www.google.com/maps/search/${resultado_entrega.cep}`;
        }
        button_entrega.innerHTML = "E"
        coluna.appendChild(button_entrega);
    }
    return coluna;
}
function montarColunaBotao(pessoa) {
    coluna = document.createElement("td");
    button_inativar = document.createElement("button");
    button_inativar.onclick = async function(){
        await inativar(pessoa);
    }
    button_inativar.innerHTML = "I";
    button_editar = document.createElement("button");
    button_editar.onclick = function () {
        navegarPara(`./cadastro_pessoa_fisica.html?id_pessoa=${pessoa}`);
    }
    button_editar.innerHTML = "E";
}
function mostrarDados(dados) {
    tabela.innerHTML = "";
    dados.data.forEach(coluna => {
        linha = document.createElement("tr");
        linha.appendChild(montarColuna(coluna.nome));
        linha.appendChild(montarColuna(coluna.apelido));
        linha.appendChild(montarColuna(coluna.documento_federal));
        linha.appendChild(montarColuna(coluna.documento_estadual));
        linha.appendChild(montarColuna(coluna.ativo));
        linha.appendChild(montarColuna(coluna.id_vinculo));
        linha.appendChild(montarEnderecos(coluna.id_moradia,coluna.id_cobranca,coluna.id_entrega));
        linha.appendChild(montarColunaBotao(coluna.id_pessoa));
        tabela.appendChild(linha);
    });
}

async function listarPessoas() {
    resultado = await buscarTodos(tipo);
    mostrarDados(resultado);
}

 function pesquisar(elemento) {
    clearTimeout()
    setTimeout(async()=> {
        resultado = await buscarTodosFiltro(elemento.value);
        console.log("foi");
    },3000)
}

listarPessoas()