/**NAVEGACAO */
function navegarPara(endereco) {
    window.location.href = endereco
}

/**MASCARAS */
mascarar_moeda_pt_br = function (valor) {

    valor = valor.replace(',', '')
    valor = valor.replace('.', '')

    if (valor.length < 4) {
        valor = valor.padStart(4, '0')
    }

    novo_valor = ''

    virula = 2
    ponto = 3

    for (let index = 0; index < valor.length; index++) {

        ultimo_index = ((valor.length - 1) - index)

        novo_valor = valor[ultimo_index] + novo_valor;

        if (virula == (index + 1)) {
            novo_valor = ',' + novo_valor
        }

        if ((index + 1) > virula && ((index - 1) % ponto) == 0 && (index < (valor.length - 1))) {
            novo_valor = '.' + novo_valor
        }
    }

    return novo_valor
}

remover_mascara_moeda_pt_br = function (value) {
    valor_base = value.replace('.', '')
    valor_base = valor_base.replace(',', '.')
    return valor_base
}