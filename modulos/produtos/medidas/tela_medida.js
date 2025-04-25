campo_id = document.getElementById("id")
campo_nome = document.getElementById("novo-nome")
campo_medida = document.getElementById("medida")

function abrirModal() {
    document.getElementById('modalCadastro').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalCadastro').style.display = 'none';
}

function voltar() {
    window.history.back();
}

function editartxt() {
    alert('Editar clicado!');
}

function excluirtxt() {
    alert('Excluir clicado!');
}

function salvarModal() {
    alert('Salvar clicado!');
    fecharModal();
}

botao_salvar_click = function() {
    if (window.localStorage.getItem("medidas") == null) {
        window.localStorage.setItem("medidas","[]")
    }
    medidas = window.localStorage.getItem("medidas")
    listamedidas = JSON.parse(medidas)

    medida = {
        'id' : null,
        'nome' : campo_nome.value
    }

    if (listamedidas.length == 0) {
        medida.id = 1
    }
    listamedidas.push(medida)

    medidas = JSON.stringify(listamedidas)
    window.localStorage.setItem("medidas", medidas )
}