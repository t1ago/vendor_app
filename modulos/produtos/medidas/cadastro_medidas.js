// Pegando os elementos do DOM
const campo_novo_id = document.getElementById("campo_novo_id")
const campo_novo_nome = document.getElementById("campo_novo_nome");

function limpar_campo() {
    campo_novo_nome.value = "";
    campo_novo_id.value = "";
}

function voltar() {
    window.location.href = "../tela_de_medidas/lista_de_medidas.html"

}

function alterar() {
    let medidas = window.localStorage.getItem("medidas")
    let listademedidas = JSON.parse(medidas);

    indice = listademedidas.findIndex(
        function (value, index, obj) {
            return value.id == campo_novo_id.value
        }
    )

    listademedidas[indice].nome = campo_novo_nome.value

    medidas = JSON.stringify(listademedidas);
    window.localStorage.setItem("medidas", medidas);

    alert("Medida alterada com sucesso!");

    limpar_campo();

}

function incluir() {
    if (window.localStorage.getItem("medidas") == null) {
        window.localStorage.setItem("medidas", "[]");
    }

    //Recupera as medidas já salvas
    let medidas = window.localStorage.getItem("medidas")
    let listademedidas = JSON.parse(medidas);

    //cria o objeto da nova medida
    let medida = {
        'id': null,
        'nome': campo_novo_nome.value
    }
    if (listademedidas.length === 0) {
        medida.id = 1;
    } else {
        listamedidas_ordenada = listademedidas.sort(
            function (a, b) {
                return a - b;
            }
        ).reverse()
        ultimamedida = listamedidas_ordenada[0]
        medida.id = ultimamedida.id + 1
    }
    campo_novo_id.value = medida.id

    // Adiciona a nova medida na lista
    listademedidas.push(medida);

    // Salva novamente no localStorage
    medidas = JSON.stringify(listademedidas);
    window.localStorage.setItem("medidas", medidas);

    alert("Medida salva com sucesso!");

    limpar_campo();
}

function salvar() {

    if (campo_novo_id.value == '') {
        incluir()
    } else {
        alterar()
    }

}