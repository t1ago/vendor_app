    const idCampo = document.getElementById("campo_id")

// Atualiza o campo de texto com o valor hexadecimal da cor escolhida
document.getElementById("nova_cor").addEventListener("input", function () {
    const corSelecionada = this.value;
    document.getElementById("hexadecimal_cor").value = corSelecionada
});

function LimparCampos() {
    document.getElementById("campo_id").value = "";
    document.getElementById("nova_cor").value = "#000000";
    document.getElementById("hexadecimal_cor").value ="";
}

function voltar() {
    window.location.href = "../new_cores/lista_cores.html";
}

// ID sequencial
function gerarProximoId() {
    let ultimoId = parseInt(localStorage.getItem("ultimoIdCor")) || 0;
    let novoId = ultimoId + 1;
    localStorage.setItem("ultimoIdCor", novoId)
    return novoId;
}

function cadastrarCor () {
    const idCampo = document.getElementById("campo_id").value;
    const corHex = document.getElementById("hexadecimal_cor").value;

    //validação básica
    if (!corHex) {
        alert("Por favor, selecione uma cor");
    } else {
    //Recupera lista existente do localStorage
    let ListaCores = JSON.parse(localStorage.getItem("ListaCores")) || [];

    if (idCampo) {
        const index = ListaCores.findIndex(function (cor) {
            return cor.id == idCampo;
        });

        if (index !== -1) {
            ListaCores[index].hex = corHex;
        }
    } else {
        const novoID = gerarProximoId();
        const novaCor = {id: novoID, hex: corHex};
        ListaCores.push(novaCor);
    }

    localStorage.setItem("ListaCores", JSON.stringify(ListaCores));
    alert("Cor salva com sucesso!")
    LimparCampos();

    setTimeout(function() {
        voltar()
    },1000)
    }
}

function alterarCor() {
    let cor = window.localStorage.getItem("ListaCores");
    let ListaCores = JSON.parse(cor);

    let indice = ListaCores.findIndex(function(value) {
        return value.id == idCampo.value
    })
    
    if (indice !== -1) {
        ListaCores[indice].hex = document.getElementById("hexadecimal_cor").value;

        let cores = JSON.stringify(ListaCores);

    window.localStorage.setItem("ListaCores", cores);
    alert("Cor alterada com sucesso!");
    LimparCampos();

    setTimeout(function() {
        voltar();
    }, 1000);
} else {
    alert("Erro: cor não encontrada para alteração.")
    }
}

function salvarCor() {
    if (idCampo.value != "") {
        alterarCor();
    } else {
        cadastrarCor();
    }
}

function sincronizarHex() {
    const corSelecionada = document.getElementById("nova_cor").value;
    document.getElementById("hexadecimal_cor").value = corSelecionada
}

function importarCor () {
    const hexCampo = document.getElementById("hexadecimal_cor")

    let corImportada = window.location.search

    if(corImportada) {
        parametroQuebrado = new URLSearchParams(corImportada);
        parametroId = parametroQuebrado.get("id");

        let cores = window.localStorage.getItem("ListaCores")

        let ListaCores = JSON.parse(cores);

        let localizado = ListaCores.find(function(item) {
            return item.id == parametroId
        })
        idCampo.value = localizado.id
        hexCampo.value = localizado.hex

        document.getElementById("nova_cor").value = localizado.hex;

        sincronizarHex();
    }
}

importarCor()