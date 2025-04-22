
document.getElementById('formulario')
campo_nome = document.getElementById('name')
mensagem_nome = document.getElementById('id_mensagem')

campo_nome_onchange = function() {
    validar_campo_nome()
}

validar_campo_nome = function() {
    campo_nome.classList.remove('erro')
    mensagem_nome.innerHTML = ''
    mensagem_nome.classList.remove('erro')

    if (campo_nome.validity.valueMissing == true) {
        campo_nome.classList.add('erro')
        mensagem_nome.innerHTML = 'Informe o Nome'
        mensagem_nome.classList.add('erro')
        return false
    }

    if (campo_nome.validity.tooShort == true) {
        campo_nome.classList.add('erro')
        mensagem_nome.innerHTML = 'Informe uma palavra com 3 letras'
        mensagem_nome.classList.add('erro')
        return false
    }

    return true
}

botao_salvar_click = function() {
    if (validar_campo_nome() == false) {
        campo_nome.focus();
    }
}