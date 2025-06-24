campo_nome = document.getElementById("nome_for");
campo_id = document.getElementById("id_for");
campo_mensagem = document.getElementById("mensagem");

function botao_cancelar() {
    window.location.href = "listafornecedor.html"
}

function validar_input() {
    campo_mensagem.innerHTML = "";
    if (campo_nome.validity.valueMissing == true) {
        campo_mensagem.innerHTML = `<strong>Informe o(a) fornecedor(a)/Marca!!</strong>`;
        return false;
    }
    if (campo_nome.validity.tooShort == true) {
        campo_mensagem.innerHTML = `<strong>Mínimo de Letras é 3!!</strong>`;
        return false;
    }
    if (campo_nome.validity.tooLong == true) {
        campo_mensagem.innerHTML = `<strong>Máximo de letras é 64!!</strong>`;
        return false;
    }
}

botao_salvar = function() {
    if (validar_input() == false) {
        campo_nome.focus();
        return
    }
    if (campo_id.value == "") {
        cadastrar_for();
    } else {
        alterar_for();
    }
    window.location.href = "listafornecedor.html"
}
function cadastrar_for() {
    //Verifica se há algo no localStorage
    if (localStorage.getItem("nome_for") == null) 
        localStorage.setItem("nome_for", "[]");
    //Cria se for necessário
    
    //Variavel que pega arrays
    let forn = localStorage.getItem("nome_for");
    
    //Variavel que vai armazenar na JSON o objeto id
    let lista_for = JSON.parse(forn);
    //Dicionário que armazena os dados do(a) fornecedor(a)/marca
    forn = {
        'id': null,
        'nome': campo_nome.value
    }
    //Adicona o valor de id 1 para todos os itens
    if (lista_for.length == 0) {
        forn.id = 1
    } else {
        //Organiza a lista de forma que deixe os itens adicionados recentemente primeiro e os mais antigos por ultimo
        let lista_ordem = lista_for.sort(
            function (a,b) {
                return b - a
            }
        ).reverse();


        //Arruma os ids do dicionário
        let lista_ultimo = lista_ordem[0];
        forn.id = lista_ultimo.id + 1
    }

    //Adiciona o valor do id dentro do campo id dentro do html
    campo_id.value = forn.id;


    //A lista principal puxa o forn atualizado
    lista_for.push(forn);

    let salvar_dic = JSON.stringify(lista_for);
    localStorage.setItem("nome_for", salvar_dic);
}



function alterar_for() {
    
    forn = localStorage.getItem("nome_for");

    lista_for = JSON.parse(forn);
    let indice = lista_for.findIndex(function (id){
        return id.id == campo_id.value
    });

    forn = lista_for[indice];
    forn.nome = campo_nome.value;

    lista_for[indice] = forn;

    localStorage.setItem("nome_for", JSON.stringify(lista_for));
}

function parametros() {
    let link = window.location.search;
    if (link) {
        let link_quebrado = new URLSearchParams(link);
        let link_id = link_quebrado.get("id");
        let comparar = localStorage.getItem("nome_for");
        let lista_link = JSON.parse(comparar);
        let indice = lista_link.find(function(id){
            return id.id == link_id
        });
        campo_id.value = indice.id;
        campo_nome.value = indice.nome;
    }
}
parametros();