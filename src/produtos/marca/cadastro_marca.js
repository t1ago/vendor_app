campo_nome = document.getElementById("name")
campo_id = document.getElementById("id")
let mensagensAtivas = {};

function exibirMensagem(mensagem, local) {
    const campoId = local.id;

    if (!mensagensAtivas[campoId]) {
        mensagensAtivas[campoId] = true;

        const coluna = local.parentNode;
        const linha = coluna.parentNode;
        const tabela = linha.parentNode;

        let span = document.createElement("span");
        span.innerHTML = mensagem;

        let div = document.createElement("div");
        div.className = "linha";
        div.appendChild(span);
        
        const div_botoes = document.getElementsByClassName("coluna-botoes");
        const div_linha_botoes = div_botoes.length > 0 ? div_botoes[0].parentNode : null;
        
        if (div_linha_botoes) {
            tabela.insertBefore(div, div_linha_botoes);
        } else {
            tabela.appendChild(div);
        }

        setTimeout(() => {
            div.remove(); // remove o elemento completamente
            mensagensAtivas[campoId] = false; // permite mostrar novamente
        }, 3000);
    }
}

function validarCampoNome(local) {
    if (campo_nome.validity.valueMissing == true) {
        exibirMensagem("Informe uma marca!",local)
        return false
    }
    if (campo_nome.validity.tooShort == true) {
        exibirMensagem("Mínimo de 3 letras!",local)
        return false
    }
    if (campo_nome.validity.tooLong == true) {
        exibirMensagem("Máximo de 64 letras!",local)
        return false
    }
    return true
}

function voltar() {
    window.location.href = "lista_marca.html";
}

function cadastrar_marca() {
    if(window.localStorage.getItem("marca") == null) {
        window.localStorage.setItem("marca","[]")
    }

    marca = window.localStorage.getItem("marca")
    listamarca = JSON.parse(marca)
    marca = {
        'id':null,
        'nome':campo_nome.value
    }
    if (listamarca.length == 0) {
        marca.id = 1
    } else {

        listamarca_ordenada = listamarca.sort(function (a,b) {
            return a - b
        }).reverse()

        ultimaMarca = listamarca_ordenada[0]
        marca.id = ultimaMarca.id + 1
    }
    campo_id.value = marca.id

    listamarca.push(marca)

    marcas = JSON.stringify(listamarca)

    window.localStorage.setItem("marca", marcas)
}

function alterar_marca() {
    marcas = window.localStorage.getItem("marca")

    listamarca = JSON.parse(marcas)

    indice = listamarca.findIndex(function (valor) {
        return valor.id == campo_id.value
    })
    marca = listamarca[indice]
    marca.nome = campo_nome.value
    listamarca[indice] = marca

    window.localStorage.setItem("marca",JSON.stringify(listamarca))
}

function botao_salvar() {
    if(campo_id.value == "") {
        cadastrar_marca()
    } else {
        alterar_marca()
    }
    window.location.href = "lista_marca.html"
}

function exibirDados() {
    let parametros = window.location.search
    if (parametros) {
        let parametrosQuebrado = new URLSearchParams(parametros)
        let parametrosId = parametrosQuebrado.get("id")
        let marcas = window.localStorage.getItem("marca")
        let listamarca = JSON.parse(marcas)
        let localizado = listamarca.find(function (item) {
            return item.id = parametrosId
        })
        campo_id.value = localizado.id
        campo_nome.value = localizado.nome
    }
}

exibirDados()