botao_novo_endereco_click = function () {
    document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
        elemento.classList.remove('esconder')
    })

    document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
        elemento.classList.add('esconder')
    })

    botao_cancelar.onclick = botao_cancelar_endereco_click
    botao_salvar.onclick = botao_salvar_endereco_click

    limpar_endereco_cadastro()
    adicionarValorCampo('ativo_endereco_sim', true)
    adicionarValorObjeto(valores_endereco, 'ativo', true)

    cadatro_endereco_status = 'NOVO'
}

botao_cancelar_endereco_click = function () {
    document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
        elemento.classList.add('esconder')
    })

    document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
        elemento.classList.remove('esconder')
    })
}

botao_salvar_endereco_click = function () {

    tipos_endereco = document.getElementsByName('tipo_endereco');

    selecionado = false
    for (var i = 0, length = tipos_endereco.length; i < length; i++) {
        if (tipos_endereco[i].checked) {
            selecionado = true
            break;
        }
    }

    if (selecionado == false) {
        exibir_alerta(true, textos.alerta_erro_tipo_endereco_selecionar)
        return
    }

    cep = document.getElementById('cep')
    validar_cep('cep', cep)
    if (cep.validity.valid == false) {
        return
    }

    logradouro = document.getElementById('logradouro')
    validar_campo_estrutura(logradouro)
    if (logradouro.validity.valid == false) {
        return
    }

    numero = document.getElementById('numero')
    validar_campo_estrutura(numero)
    if (numero.validity.valid == false) {
        return
    }

    bairro = document.getElementById('bairro')
    validar_campo_estrutura(bairro)
    if (bairro.validity.valid == false) {
        return
    }

    cidade = document.getElementById('cidade')
    validar_campo_estrutura(cidade)
    if (cidade.validity.valid == false) {
        return
    }

    estado = document.getElementById('estado')
    validar_campo_estrutura(estado)
    if (estado.validity.valid == false) {
        return
    }

    endereco_ativo = document.getElementsByName('tipo_endereco');

    selecionado = false
    for (var i = 0, length = endereco_ativo.length; i < length; i++) {
        if (endereco_ativo[i].checked) {
            selecionado = true
            break;
        }
    }

    if (selecionado == false) {
        exibir_alerta(true, textos.alerta_erro_endereco_ativo_selecionar)
        return
    }

    if (cadatro_endereco_status == 'NOVO') {
        valores_pessoa.enderecos.push(valores_endereco)
    }

    limpar_endereco_cadastro()

    document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
        elemento.classList.add('esconder')
    })

    document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
        elemento.classList.remove('esconder')
    })

    montar_tabela_endereco()
    cadatro_endereco_status = null
}


