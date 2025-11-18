
exiber_dados_textos = async function (textos, callback_error) {

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

        requisicao = await fetch(`../tiago/textos.json`)

        if (requisicao.ok === true) {
            textos = await requisicao.json()

            exiber_dados_textos(textos, function () {
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

        if (parametro_id) {
            // Fazer a parte de recuperar dados
        } else {
            adicionarValorCampo('ativo_sim', true)
            adicionarValorObjeto(valores_pessoa, 'ativo', true)
            adicionarValorObjeto(valores_pessoa, 'tipo_pessoa', parametro_tipo_pessoa)

            if (parametro_tipo_pessoa == 'F') {
                adicionarValorCampo('sexo_masculino', 'M')
                adicionarValorObjeto(valores_pessoa, 'sexo', 'M')
            }

            document.querySelectorAll('[data-endereco-cadastro]').forEach(function (elemento) {
                elemento.classList.add('esconder')
            })

            document.querySelectorAll('[data-endereco-cadastro-listagem ]').forEach(function (elemento) {
                elemento.classList.remove('esconder')
            })

            document.getElementById('tabela').classList.add('esconder')
            document.getElementById('mensagem').classList.remove('esconder')
        }
    } else {
        exibir_situacao_operacao('ERRO', 'Falha ao determinar tipo do cadastro')
        setInterval(function () {
            botao_cancelar_click()
        }, 2000)
    }

}
buscar_estados()
exibir_dados()
