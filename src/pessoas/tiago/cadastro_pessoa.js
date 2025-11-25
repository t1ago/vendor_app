
exibir_dados_textos = async function (textos, callback_error) {

    elemento_data = function (data) {
        return document.querySelector(`[${data}]`)
    }

    elemento_data('data-texto-ativo').innerHTML = textos.ativo
    elemento_data('data-texto-ativo-sim').innerHTML = textos.ativo_sim
    elemento_data('data-texto-ativo-nao').innerHTML = textos.ativo_nao
    elemento_data('data-texto-botao-cancelar').innerHTML = textos.botao_cancelar
    elemento_data('data-texto-botao-salvar').innerHTML = textos.botao_salvar
    elemento_data('data-texto-titulo-endereco').innerHTML = textos.titulo_endereco
    elemento_data('data-texto-cep').innerHTML = textos.cep
    elemento_data('data-texto-logradouro').innerHTML = textos.logradouro
    elemento_data('data-texto-numero').innerHTML = textos.numero
    elemento_data('data-texto-bairro').innerHTML = textos.bairro
    elemento_data('data-texto-cidade').innerHTML = textos.cidade
    elemento_data('data-texto-estado').innerHTML = textos.estado
    elemento_data('data-texto-ativo-endereco').innerHTML = textos.ativo_endereco
    elemento_data('data-texto-ativo-endereco-sim').innerHTML = textos.ativo_endereco_sim
    elemento_data('data-texto-ativo-endereco-nao').innerHTML = textos.ativo_endereco_nao
    elemento_data('data-texto-tipo-endereco').innerHTML = textos.tipo_endereco
    elemento_data('data-texto-tipo-endereco-moradia').innerHTML = textos.tipo_endereco_moradia
    elemento_data('data-texto-tipo-endereco-cobranca').innerHTML = textos.tipo_endereco_cobranca
    elemento_data('data-texto-tipo-endereco-entrega').innerHTML = textos.tipo_endereco_entrega
    elemento_data('data-texto-tabela-vazia').innerHTML = textos.mensagem_tabela_vazia
    elemento_data('data-texto-alerta-botao').innerHTML = textos.alerta_botao

    if (parametro_tipo_pessoa == 'F') {
        elemento_data('data-texto-titulo').innerHTML = textos.titulo_tpf
        elemento_data('data-texto-nome').innerHTML = textos.nome_tpf
        elemento_data('data-texto-apelido').innerHTML = textos.apelido_tpf
        elemento_data('data-texto-documento-federeal').innerHTML = textos.documento_federal_tpf
        elemento_data('data-texto-documento-estadual').innerHTML = textos.documento_estadual_tpf
        elemento_data('data-texto-data-nascimento').innerHTML = textos.data_nascimento
        elemento_data('data-texto-vinculo').innerHTML = textos.vinculo
        elemento_data('data-texto-sexo').innerHTML = textos.sexo
        elemento_data('data-texto-sexo-feminino').innerHTML = textos.sexo_feminino
        elemento_data('data-texto-sexo-masculino').innerHTML = textos.sexo_masculino
    } else if (parametro_tipo_pessoa == 'J') {

        document.querySelectorAll('[data-visible="F"]').forEach(function (elemento) {
            elemento.classList.add('esconder')
        })

        divAtivo = document.getElementById('divAtivo')
        elementosParaMover = Array.from(divAtivo.childNodes)
        novoDivAtivo = elemento_data('data-local-ativo-pessoa-juridica')

        for (let index = 0; index < elementosParaMover.length; index++) {
            const elemento = elementosParaMover[index];
            novoDivAtivo.appendChild(elemento)
        }

        divAtivo.classList.add('esconder')
        novoDivAtivo.classList.remove('esconder')

        elemento_data('data-texto-titulo').innerHTML = textos.titulo_tpj
        elemento_data('data-texto-nome').innerHTML = textos.nome_tpj
        elemento_data('data-texto-apelido').innerHTML = textos.apelido_tpj
        elemento_data('data-texto-documento-federeal').innerHTML = textos.documento_federal_tpj
        elemento_data('data-texto-documento-estadual').innerHTML = textos.documento_estadual_tpj
    } else {
        callback_error()
    }
}

exibir_dados = async function () {

    url_parametros = window.location.search

    if (url_parametros != '') {
        exibir_situacao_operacao('BUSCANDO', 'Buscando informação')
        parametros = new URLSearchParams(url_parametros)
        parametro_tipo_pessoa = parametros.get('tipo_pessoa')
        parametro_id = parametros.has('id') ? parametros.get('id') : undefined

        requisicao_texto = await buscar_textos()

        if (requisicao_texto.ok === true) {
            textos = await requisicao_texto.json()

            exibir_dados_textos(textos, function () {
                exibir_situacao_operacao('ERRO', 'Falha ao determinar tipo do cadastro')
                setInterval(function () {
                    botao_cancelar_click()
                }, 2000)
            })

            exibir_situacao_operacao('BUSCOU_TEXTOS', '')
        } else {
            exibir_situacao_operacao('ERRO', 'Falha ao recuperar textos')
            setInterval(function () {
                botao_cancelar_click()
            }, 2000)
        }

        if (parametro_tipo_pessoa == 'F') {
            await buscar_vinculos()
        }

        if (parametro_id) {
            requisicao_pessoa = await buscar_pessoa(parametro_id)

            if (requisicao_pessoa.ok === true) {
                resposta_pessoa = await requisicao_pessoa.json()
                objeto_pessoa = resposta_pessoa.data

                if (objeto_pessoa) {

                    if (objeto_pessoa.tipo_pessoa == 'F') {
                        newDateSplited = objeto_pessoa.data_inicio.split('T')[0]
                        newDateSplited = newDateSplited.split('-')
                        valores_pessoa.data_inicio = `${newDateSplited[2]}/${newDateSplited[1]}/${newDateSplited[0]}`
                    } else {
                        valores_pessoa.data_inicio = null
                    }

                    valores_pessoa.id_pessoa = objeto_pessoa.id
                    valores_pessoa.nome = objeto_pessoa.nome
                    valores_pessoa.apelido = objeto_pessoa.apelido
                    valores_pessoa.tipo_pessoa = objeto_pessoa.tipo_pessoa
                    valores_pessoa.sexo = objeto_pessoa.sexo
                    valores_pessoa.documento_estadual = objeto_pessoa.documento_estadual
                    valores_pessoa.documento_federeal = objeto_pessoa.documento_federeal
                    valores_pessoa.id_vinculo = objeto_pessoa.id_vinculo
                    valores_pessoa.ativo = objeto_pessoa.ativo

                    for (let index = 0; index < objeto_pessoa.enderecos.length; index++) {
                        const endereco = objeto_pessoa.enderecos[index];

                        valores_pessoa.enderecos.push({
                            id_endereco: endereco.id,
                            cep: endereco.cep,
                            logradouro: endereco.logradouro,
                            numero: endereco.numero,
                            bairro: endereco.bairro,
                            cidade: endereco.cidade,
                            estado: endereco.estado,
                            tipo_endereco: endereco.tipo_endereco,
                            ativo: endereco.ativo,
                            buscado_por_cep: endereco.buscado_por_cep == 'S'
                        })
                    }

                    adicionarValorCampo('name', valores_pessoa.nome)
                    adicionarValorCampo('apelido', valores_pessoa.apelido)
                    adicionarValorCampo('documento_federeal', valores_pessoa.documento_federeal)
                    adicionarValorCampo('documento_estadual', valores_pessoa.documento_estadual)

                    radio_ativo = valores_pessoa.ativo == 'A' ? 'ativo_sim' : 'ativo_nao'
                    adicionarValorCampo(radio_ativo, true)

                    if (valores_pessoa.tipo_pessoa == 'F') {
                        adicionarValorCampo('data_nascimento', valores_pessoa.data_inicio)

                        if (valores_pessoa.id_vinculo == undefined) {
                            adicionarValorCampo('vinculo', '-1')
                        } else {
                            adicionarValorCampo('vinculo', valores_pessoa.id_vinculo)
                        }

                        radio_sexo = valores_pessoa.sexo == 'M' ? 'sexo_masculino' : 'sexo_feminino'
                        adicionarValorCampo(radio_sexo, true)
                    }
                }

                exibir_situacao_operacao('ALTERAR', '')
            } else {
                exibir_situacao_operacao('ERRO', 'Falha ao recuperar categoria')
                setInterval(function () {
                    botao_cancelar_click()
                }, 2000)
            }

        } else {
            adicionarValorCampo('ativo_sim', true)
            adicionarValorObjeto(valores_pessoa, 'ativo', 'A')
            adicionarValorObjeto(valores_pessoa, 'tipo_pessoa', parametro_tipo_pessoa)

            if (parametro_tipo_pessoa == 'F') {
                adicionarValorCampo('sexo_masculino', 'M')
                adicionarValorObjeto(valores_pessoa, 'sexo', 'M')
            }
        }

        document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
            elemento.classList.add('esconder')
        })

        document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
            elemento.classList.remove('esconder')
        })

        montar_tabela_endereco()
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao determinar tipo do cadastro')
        setInterval(function () {
            botao_cancelar_click()
        }, 2000)
    }

}

buscar_estados()
exibir_dados()

botao_cancelar.onclick = botao_cancelar_click
botao_salvar.onclick = botao_salvar_click
