
buscar_localidade_por_cep = async function (elemento) {

    exibir_situacao_operacao('BUSCANDO', 'Buscando informação de cep')

    cep = elemento.value

    requisicao_cep = await fetch(`${API_HOST}/enderecos/tiago/localidade/${cep}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    valores_endereco.buscado_por_cep = false

    if (requisicao_cep.ok === true) {
        resposta_cep = await requisicao_cep.json()

        if (resposta_cep.executado) {
            valores_endereco.buscado_por_cep = true
            adicionarValorObjeto(valores_endereco, 'cidade', resposta_cep.data.cidade)
            adicionarValorObjeto(valores_endereco, 'bairro', resposta_cep.data.bairro)
            adicionarValorObjeto(valores_endereco, 'logradouro', resposta_cep.data.logradouro)
            adicionarValorObjeto(valores_endereco, 'estado', resposta_cep.data.estado.sigla)
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

    requisicao_estado = await fetch(`${API_HOST}/enderecos/tiago/estados`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao_estado.ok === true) {
        resposta_estado = await requisicao_estado.json()

        if (resposta_estado.executado) {
            estados = resposta_estado.data.sort(function (a, b) {
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

    requisicao_vinculo = await fetch(`${API_HOST}/pessoas/tiago/vinculos`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao_vinculo.ok === true) {
        resposta_vinculo = await requisicao_vinculo.json()

        if (resposta_vinculo.executado) {
            vinculos = resposta_vinculo.data.sort(function (a, b) {
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

buscar_textos = async function () {
    return await fetch(`../tiago/textos.json`)
}

buscar_pessoa = async function (parametro_id) {
    return fetch(`${API_HOST}/pessoas/tiago/${parametro_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

salvar_pessoa = async function (acao = 'INCLUIR') {

    body = valores_pessoa

    endpoint = `${API_HOST}`

    if (acao == 'INCLUIR') {
        endpoint += '/pessoas/tiago'
    } else {
        endpoint += `/pessoas/tiago/${valores_pessoa.id_pessoa}`
    }

    delete body.id_pessoa

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
