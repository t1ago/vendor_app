// telagrupo.js (substituir por todo o arquivo atual)

// usa API_HOST definido globalmente (por config.js) ou fallback
const API_HOST = window.API_HOST || 'http://127.0.0.1:3000';

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
// expõe para chamadas inline do HTML (onkeyup / onchange)
window.validacampo = validacampo;

function voltar() {
    // redireciona para a página de listagem (tem que existir)
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

// alterar (PUT)
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
        // opcional: mostrar mensagem breve
        console.log("Grupo alterado com sucesso");
    }
}

// salvar (decide POST ou PUT)
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


// carrega dados para edição, se existir ?id=...
async function dados() {
    let parametros = window.location.search;
    if (parametros) {
        let parametrosquebrado = new URLSearchParams(parametros);
        let parametrosid = parametrosquebrado.get("id");

        if (parametrosid) {
            let requisicao = await fetch(`${API_HOST}/grupos/${parametrosid}`);
            if (requisicao.ok) {
                let grupo = await requisicao.json();
              
                campo_id.value = grupo.id;
                campo_nome.value = grupo.data?.nome || "";

            }
        }
    }
}

// chama dados quando o script carregar
dados();
