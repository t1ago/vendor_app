campo_id = document.getElementById("idgrupo")
campo_nome = document.getElementById("grupo")
mensagem = document.getElementById("mensagemgrupo")

function validacampo() {
    mensagem.innerHTML = ""
    mensagem.style.color = ""

    if (campo_nome.validity.valueMissing == true) {
        mensagem.innerHTML = "Informe o grupo"
        mensagem.style.color = "red"
        mensagem.style.fontSize = "13px"
        mensagem.style.backgroundColor = "red"

        return false
    }

    if (campo_nome.validity.tooShort == true) {
        mensagem.innerHTML = "Mínimo de 3 letras"
        mensagem.style.color = "red"
        mensagem.style.fontSize = "13px"
        return false
    }

    if (campo_nome.validity.tooLong == true) {
        mensagem.innerHTML = "Máximo de 64 letras"
        return false
    }

    return true
}

function voltar() {
    window.location.href = "listagrupo.html"
}

async function cadastrargrupo() {
    let grupo = {
        nome: campo_nome.value
    };

    let requisicao = await fetch("http://localhost:3000/grupos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grupo)
    });

    if (requisicao.ok) {
        let resposta = await requisicao.json();
        campo_id.value = resposta.id; // API já gera o ID
    }
}


async function alterargrupo() {
    let grupo = {
        id: campo_id.value,
        nome: campo_nome.value
    };

    await fetch(`http://localhost:3000/grupos/${grupo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grupo)
    });
}


botao_salvar_click = function () {

    if (validacampo() == false) {
        campo_nome.focus()
        return
    }

    if (campo_id.value == "") {
        cadastrargrupo()
    }
    else {
        alterargrupo()
    }
    window.location.href = "listagrupo.html"
}

async function dados() {
    let parametros = window.location.search;
    if (parametros) {
        let parametrosquebrado = new URLSearchParams(parametros);
        let parametrosid = parametrosquebrado.get("id");

        let requisicao = await fetch(`http://localhost:3000/grupos/${parametrosid}`);
        if (requisicao.ok) {
            let localizado = await requisicao.json();
            campo_id.value = localizado.id;
            campo_nome.value = localizado.nome;
        }
    }
}

button_excluir.onclick = async function () {
    await fetch(`http://localhost:3000/grupos/${item.id}`, {
        method: "DELETE"
    });
    carregarGrupo();
}

