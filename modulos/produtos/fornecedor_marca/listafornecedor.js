campo_lista = document.getElementById("tabela_for");

function button_cadastrar(){
    window.location.href = "telafornecedor.html"
}

function carregar_for() {
    const tabela = document.getElementById("tabela_for");
    tabela.innerHTML = "";
    //Variável que vai armazenar o dicionário
    let forn = localStorage.getItem("nome_for");
    //Variável que vai transformar o objeto em valores de strings que faz o JS ler o dicionário
    let lista_for = JSON.parse(forn);
    //Formar de FORnecedor e MARca
    lista_for.forEach(function (formar){
        const linha = document.createElement("tr");
        const coluna_nome = document.createElement("td");
        const coluna_acoes = document.createElement("td");
        const spam_nome = document.createElement("spam");
        const button_edit = document.createElement("button");
        const button_excluir = document.createElement("button");

        button_edit.onclick = function() {
            window.location.href = "telafornecedor.html?id="+formar.id
        }
        button_excluir.onclick = function() {
            let forn_excluir = localStorage.getItem("nome_for");
            let lista_excluir = JSON.parse(forn_excluir);
            let indice = lista_for.findIndex(function(id){
                return id.id == formar.id
            });
            lista_excluir.splice(indice,1);
            let forn_atualizado = JSON.stringify(lista_excluir);
            localStorage.setItem("nome_for",forn_atualizado);
            carregar_for();
        }
        button_edit.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/4226/4226577.png" alt="Editar" style="width:100%;height:18px;vertical-align:middle;border:none;padding:0;margin:0;"/>';
        button_excluir.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="Excluir" style="width:100%;height:18px;vertical-align:middle;border:none;padding:0;margin:0;" />';

        
        spam_nome.innerHTML = formar.nome;


        tabela.appendChild(linha);
        linha.appendChild(coluna_nome);
        linha.appendChild(coluna_acoes);
        coluna_nome.appendChild(spam_nome);
        coluna_acoes.appendChild(button_edit);
        coluna_acoes.appendChild(button_excluir);
    })
}
carregar_for();
