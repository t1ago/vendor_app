// Pegando os elementos do DOM
const campo_id = document.getElementById("id");
const campo_nome = document.getElementById("nome");
const campo_novo_id = document.getElementById("novo-id");
const campo_novo_nome = document.getElementById("novo-nome");

// Abrir o modal
function abrirModal() {
    document.getElementById('modalCadastro').style.display = 'flex';
}

// Fechar o modal
function fecharModal() {
    document.getElementById('modalCadastro').style.display = 'none';
}

// Voltar para a página anterior
function voltar() {
    window.history.back();
}

// Função para editar (ainda é só um alerta)
function editartxt() {
    alert('Editar clicado!');
}

// Função para excluir (ainda é só um alerta)
function excluirtxt() {
    alert('Excluir clicado!');
}

// Função para salvar uma nova medida
function botao_salvar_click() {
    // Se ainda não existir nada salvo no localStorage, cria uma lista vazia
    if (window.localStorage.getItem("medidas") == null) {
        window.localStorage.setItem("medidas", "[]");
    }

    // Recupera as medidas já salvas
    let medidas = window.localStorage.getItem("medidas");
    let listamedidas = JSON.parse(medidas);

    // Cria o objeto da nova medida
    let medida = {
        'id': campo_novo_id.value ? parseInt(campo_novo_id.value) : (listamedidas.length + 1),
        'nome': campo_novo_nome.value
    };

    // Adiciona a nova medida na lista
    listamedidas.push(medida);

    // Salva novamente no localStorage
    medidas = JSON.stringify(listamedidas);
    window.localStorage.setItem("medidas", medidas);

    // Fecha o modal após salvar
    fecharModal();
}