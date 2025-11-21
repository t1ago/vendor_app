
buscar_localidade_por_cep = async function (elemento) {

    exibir_situacao_operacao('BUSCANDO', 'Buscando informação de cep')

    cep = elemento.value

    requisicao = await fetch(`${API_HOST}/enderecos/tiago/localidade/${cep}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    valores_endereco.buscado_por_cep = false

    if (requisicao.ok === true) {
        resposta = await requisicao.json()

        if (resposta.executado) {
            valores_endereco.buscado_por_cep = true
            adicionarValorObjeto(valores_endereco, 'cidade', resposta.data.cidade)
            adicionarValorObjeto(valores_endereco, 'bairro', resposta.data.bairro)
            adicionarValorObjeto(valores_endereco, 'logradouro', resposta.data.logradouro)
            adicionarValorObjeto(valores_endereco, 'estado', resposta.data.estado.sigla)
        } else {
            adicionarValorObjeto(valores_endereco, 'cidade', null)
            adicionarValorObjeto(valores_endereco, 'bairro', null)
            adicionarValorObjeto(valores_endereco, 'logradouro', null)
            adicionarValorObjeto(valores_endereco, 'estado', null)
        }
    } else {
        adicionarValorObjeto(valores_endereco, 'cidade', null)
        adicionarValorObjeto(valores_endereco, 'bairro', null)
        adicionarValorObjeto(valores_endereco, 'logradouro', null)
        adicionarValorObjeto(valores_endereco, 'estado', null)
    }

    adicionarValorCampo('logradouro', valores_endereco.logradouro)
    adicionarValorCampo('bairro', valores_endereco.bairro)
    adicionarValorCampo('cidade', valores_endereco.cidade)
    adicionarValorCampo('estado', valores_endereco.estado)

    habilitar_campo('logradouro', valores_endereco.logradouro == null)
    habilitar_campo('bairro', valores_endereco.bairro == null)
    habilitar_campo('cidade', valores_endereco.cidade == null)
    habilitar_campo('estado', valores_endereco.estado == null)

    exibir_situacao_operacao('LIMPAR', '')
}

buscar_estados = async function () {

    exibir_situacao_operacao('BUSCANDO', 'Buscando informação de estados')

    requisicao = await fetch(`${API_HOST}/enderecos/tiago/estados`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok === true) {
        resposta = await requisicao.json()

        if (resposta.executado) {
            estados = resposta.data.sort(function (a, b) {
                if (a.nome > b.nome) {
                    return 1;
                }
                if (a.nome < b.nome) {
                    return -1;
                }
                return 0;
            });

            selectEstados = document.getElementById('estado')
            selectEstados.innerHTML = ''
            for (let index = 0; index < estados.length; index++) {
                const estado = estados[index];

                option = document.createElement('option')
                option.value = estado.sigla
                option.innerHTML = estado.nome

                selectEstados.appendChild(option)
            }

            exibir_situacao_operacao('LIMPAR', '')
        } else {
            exibir_situacao_operacao('ERRO', 'Falha ao recuperar estados')
            setInterval(function () {
                exibir_situacao_operacao('LIMPAR', '')
            }, 2000)
        }
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao recuperar estados')
        setInterval(function () {
            exibir_situacao_operacao('LIMPAR', '')
        }, 2000)
    }
}

buscar_vinculos = async function () {
    exibir_situacao_operacao('BUSCANDO', 'Buscando informação de estados')

    requisicao = await fetch(`${API_HOST}/pessoas/tiago/vinculos`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok === true) {
        resposta = await requisicao.json()

        if (resposta.executado) {
            vinculos = resposta.data.sort(function (a, b) {
                if (a.nome > b.nome) {
                    return 1;
                }
                if (a.nome < b.nome) {
                    return -1;
                }
                return 0;
            });

            selectVinculos = document.getElementById('vinculo')
            selectVinculos.innerHTML = ''

            option = document.createElement('option')
            option.value = -1
            option.innerHTML = 'Sem Vínculo'

            selectVinculos.appendChild(option)

            for (let index = 0; index < vinculos.length; index++) {
                const vinculo = vinculos[index];

                option = document.createElement('option')
                option.value = vinculo.id
                option.innerHTML = vinculo.nome

                selectVinculos.appendChild(option)
            }

            exibir_situacao_operacao('LIMPAR', '')
        } else {
            exibir_situacao_operacao('ERRO', 'Falha ao recuperar vínculos')
            setInterval(function () {
                exibir_situacao_operacao('LIMPAR', '')
            }, 2000)
        }
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao recuperar vínculos')
        setInterval(function () {
            exibir_situacao_operacao('LIMPAR', '')
        }, 2000)
    }
}

salvar_pessoa = async function (acao = 'INCLUIR') {
    body = valores_pessoa

    endpoint = `${API_HOST}`

    if (acao == 'INCLUIR') {
        endpoint += '/pessoas/tiago'
    } else {
        endpoint += `/pessoas/tiago/${valores_dados.id_fornecedor}`
    }

    requisicao = await fetch(endpoint, {
        method: acao == 'INCLUIR' ? 'POST' : 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return requisicao
}
