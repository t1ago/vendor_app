validar_cep = function (propriedade, elemento) {
    if (REGEX_CEP.test(elemento.value)) {
        elemento.setCustomValidity('')
    } else {
        elemento.setCustomValidity('O Campo deve ter o formato 00000-000')
    }

    campo_onchange_endereco(propriedade, elemento)
}

campo_cep_onchange = function (propriedade, elemento) {
    validar_cep(propriedade, elemento)

    if (elemento.reportValidity()) {
        buscar_localidade_por_cep(elemento)
    }
}

campo_data_nascimento_onchange = function (propriedade, elemento) {

    validate_data = function (elemento) {
        const matchValue = elemento.value.match(REGEX_VALIDACAO_DATA);

        if (!matchValue) {
            return 'O Campo deve ter o formato 00/00/0000'
        }

        dia = parseInt(matchValue[1], 10);
        mes = parseInt(matchValue[2], 10);
        ano = parseInt(matchValue[3], 10);

        data = new Date(ano, mes - 1, dia);

        if (data.getFullYear() === ano &&
            data.getMonth() + 1 === mes &&
            data.getDate() === dia) {
            return ''
        } else {
            return 'O Campo tem data inválida'
        }
    }

    mensagem = validate_data(elemento)
    elemento.setCustomValidity(mensagem)
    campo_onchange_pessoa(propriedade, elemento)
}

campo_documento_estadual_onchange = function (propriedade, elemento) {
    validador = valores_pessoa.tipo_pessoa == 'F' ? REGEX_DOCUMENTO_ESTADUAL_PESSOA_FISICA : REGEX_DOCUMENTO_ESTADUAL_PESSOA_JURIDICA
    mensagem = valores_pessoa.tipo_pessoa == 'F' ? 'O Campo deve ter o formato 00.000.000-0' : 'O Campo deve ter o formato 000.000.000.000'

    if (validador.test(elemento.value)) {
        elemento.setCustomValidity('')
    } else {
        elemento.setCustomValidity(mensagem)
    }

    campo_onchange_pessoa(propriedade, elemento)
}

campo_documento_federal_onchange = function (propriedade, elemento) {
    validador = valores_pessoa.tipo_pessoa == 'F' ? REGEX_DOCUMENTO_FEDEREAL_PESSOA_FISICA : REGEX_DOCUMENTO_FEDEREAL_PESSOA_JURIDICA
    mensagem = valores_pessoa.tipo_pessoa == 'F' ? 'O Campo deve ter o formato 000.000.000-00' : 'O Campo deve ter o formato 00.000.000/0000-00'

    if (validador.test(elemento.value)) {
        elemento.setCustomValidity('')
    } else {
        elemento.setCustomValidity(mensagem)
    }

    campo_onchange_pessoa(propriedade, elemento)
}

campo_onchange_pessoa = function (propriedade, elemento) {
    if (validar_campo_estrutura(elemento, null) == false) {
        adicionarValorObjeto(valores_pessoa, propriedade, elemento.value)
    } else {
        adicionarValorObjeto(valores_pessoa, propriedade, null)
    }
}

campo_onchange_endereco = function (propriedade, elemento) {
    if (validar_campo_estrutura(elemento) == false) {
        adicionarValorObjeto(valores_endereco, propriedade, elemento.value)
    } else {
        adicionarValorObjeto(valores_endereco, propriedade, null)
    }
}

campo_onclick_radio = function (objeto, propriedade, valor) {
    adicionarValorObjeto(objeto, propriedade, valor)
}

campo_onchange_vinculo = function (propriedade, elemento) {
    if (validar_campo_estrutura(elemento) == false) {
        if (elemento.value == '-1') {
            adicionarValorObjeto(valores_pessoa, propriedade, null)
        } else {
            adicionarValorObjeto(valores_pessoa, propriedade, elemento.value)
        }
    } else {
        adicionarValorObjeto(valores_endereco, propriedade, null)
    }
}

validar_campo_estrutura = function (elemento) {
    campo_id = elemento.id
    elemento_pai = elemento.parentNode
    mensagem_id = elemento_pai.getElementsByClassName('mensagem')[0].id

    return validar_campo(campo_id, mensagem_id)
}

validar_campo = function (campo_id, mensagem_id) {
    campo = document.getElementById(campo_id)
    campo_name = campo.name

    mensagem = document.getElementById(mensagem_id)
    label = document.querySelector(`label[for=${campo_name}]`)
    label_value = label.innerHTML

    validacoes = []

    if (campo.required) {
        validacoes.push('valueMissing')
    }

    if (campo.minLength) {
        validacoes.push('tooShort')
    }

    if (campo.maxLength) {
        validacoes.push('tooLong')
    }

    if (campo.validity.customError) {
        validacoes.push('customError')
    }

    campo.classList.remove('erro')
    mensagem.innerHTML = ''
    mensagem.classList.remove('erro')

    tem_erro = false

    for (let index = 0; index < validacoes.length; index++) {
        const validacao = validacoes[index];
        resultado = campo.validity[validacao]

        if (resultado) {

            mensagem_texto = ''
            switch (validacao) {
                case 'valueMissing':
                    mensagem_texto = `${label_value} não informado`
                    break;
                case 'tooShort':
                    mensagem_texto = `Informe uma palavra com ${campo.minLength} letras`
                    break;
                case 'tooLong':
                    mensagem_texto = `Informe um texto com até ${campo.maxLength} letras`
                    break;
                case 'customError':
                    mensagem_texto = campo.validationMessage
                    break;
                default:
                    break;
            }

            campo.classList.add('erro')
            mensagem.innerHTML = mensagem_texto
            mensagem.classList.add('erro')

            tem_erro = true
            break
        }
    }

    return tem_erro
}