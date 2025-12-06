
const campo_id = document.getElementById("idgrupo");
const campo_nome = document.getElementById("grupo");
const mensagem = document.getElementById("mensagemgrupo");

function validacampo() {
    mensagem.innerHTML = "";
    mensagem.style.color = "";

    if (campo_nome.validity.valueMissing == true) {
        mensagem.innerHTML = "Informe o grupo";
        mensagem.style.color = "red";
        mensagem.style.fontSize = "13px";
        mensagem.style.backgroundColor = "red";
        return false;
    }

    if (campo_nome.validity.tooShort == true) {
        mensagem.innerHTML = "Mínimo de 3 letras";
        mensagem.style.color = "red";
        mensagem.style.fontSize = "13px";
        return false;
    }

    if (campo_nome.validity.tooLong == true) {
        mensagem.innerHTML = "Máximo de 64 letras";
        return false;
    }

    return true;
}

window.validacampo = validacampo;

function voltar() {

    window.location.href = "listagrupo.html";
}


// cadastrar (POST)
async function cadastrargrupo() {
    let corpo = { nome: campo_nome.value };

    try {
        let requisicao = await fetch(`${API_HOST}/grupos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpo)
        });

        if (requisicao.ok) {
            let resposta = await requisicao.json();
            campo_id.value = resposta.id;
        } else {
            mensagem.innerHTML = "Erro ao cadastrar grupo";
            mensagem.style.color = "red";
        }
    } catch (error) {
        mensagem.innerHTML = "Erro de conexão";
        mensagem.style.color = "red";
    }
}


async function alterargrupo() {
    let corpo = {
        id: campo_id.value,
        nome: campo_nome.value

    };

    let requisicao = await fetch(`${API_HOST}/grupos/${campo_id.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo)
    });

    if (requisicao.ok) {
    }
}


async function botao_salvar_click() {
    if (validacampo() == false) {
        campo_nome.focus();
        return;
    }

    if (campo_id.value == "") {
        await cadastrargrupo();
    } else {
        await alterargrupo();
    }

    window.location.href = "listagrupo.html";
}



async function dados() {
    let parametros = window.location.search;
    if (parametros) {
        let parametrosquebrado = new URLSearchParams(parametros);
        let parametrosid = parametrosquebrado.get("id");

        if (parametrosid) {
            let requisicao = await fetch(`${API_HOST}/grupos/${parametrosid}`);
            if (requisicao.ok) {
                let grupo = await requisicao.json();
                let resultado = grupo.data[0]

                campo_id.value = resultado.id;
                campo_nome.value = resultado.nome;

            }
        }
    }
}


dados();
