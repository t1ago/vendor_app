// Pegando os elementos do DOM
const campo_novo_id = document.getElementById("campo_novo_id");
const campo_novo_nome = document.getElementById("campo_novo_nome");
const mensagem_erro = document.getElementById("mensagem");

function validar_campo_nome() {
    mensagem_erro.innerHTML = "";

    if (campo_novo_nome.validity.valueMissing) {
        campo_novo_nome.classList.remove('erro')
        mensagem_erro.innerHTML = "Digite um nome válido."
        mensagem_erro.classList.remove('erro')
        return false
    }

    if (campo_novo_nome.validity.tooShort) {
        campo_novo_nome.add('erro')
        mensagem_erro.innerHTML = "Inserir nome com mais de 3 letras."
        mensagem_erro.classList.add('erro')
        return false
    }

    if (campo_novo_nome.validity.tooLong) {
        campo_novo_nome.add('erro')
        mensagem_erro.innerHTML = "Inserir nome com menos de 64 letras."
        mensagem_erro.classList.add('erro')
        return false
    }
    return true
}

function limpar_campo() {
    campo_novo_nome.value = "";
    campo_novo_id.value = "";
}

function voltar() {
    window.location.href = "../medidas/lista_medidas.html"
    
}

function incluir() {
    if (window.localStorage.getItem("medidas") === null) {
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

    setInterval(function() {
        voltar()
    }, 2000)
}

function alterar() {

    let medidas = window.localStorage.getItem("medidas")
    let listademedidas = JSON.parse(medidas);

    let indice = listademedidas.findIndex(function(value, index, obj){
        return value.id == campo_novo_id.value
    })  
    let medida = listademedidas [indice]
    medida.nome = campo_novo_nome.value

    listademedidas [indice] = medida

    medidas = JSON.stringify(listademedidas)
    window.localStorage.setItem("medidas", medidas)

    setInterval(function() {
        voltar()
    }, 2000)
}


function salvar() {
    if (validar_campo_nome() == false) {
        validar_campo_nome.focus()
    } else {
        if (campo_novo_id.value != "") {
            alterar();
        } else {     
            incluir();
        }
    }
}

function importardados () {
    let parametros = window.location.search

    if (parametros) {
        parametroquebrado = new URLSearchParams(parametros)
        parametroid = parametroquebrado.get("id")

        let medidas = window.localStorage.getItem("medidas")

        let listademedidas = JSON.parse(medidas);

        let localizado = listademedidas.find(function(item) {
            return item.id == parametroid
        })
        campo_novo_id.value = localizado.id
        campo_novo_nome.value = localizado.nome
    }
}

importardados();