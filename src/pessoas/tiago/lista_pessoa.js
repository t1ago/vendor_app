tabela_dados = document.getElementById('tabela_dados')
tabela = document.getElementById('tabela')
mensagem = document.getElementById('mensagem')
imagem = document.getElementById('imagem')
parametro_tipo_pessoa = null
textos = null

exibir_dados_textos = async function (textos, callback_error) {

    elemento_data = function (data) {
        return document.querySelector(`[${data}]`)
    }

    elemento_data('data-texto-filtro').innerHTML = textos.filtrar_listagem
    elemento_data('data-texto-ativo').innerHTML = textos.ativo
    elemento_data('data-texto-acoes').innerHTML = textos.listagem_acoes
    elemento_data('data-texto-enderecos').innerHTML = textos.titulo_endereco

    if (parametro_tipo_pessoa == 'F') {
        elemento_data('data-texto-lista-titulo').innerHTML = textos.lista_titulo_tpf
        elemento_data('data-texto-nome').innerHTML = textos.nome_tpf
        elemento_data('data-texto-apelido').innerHTML = textos.apelido_tpf
        elemento_data('data-texto-sexo').innerHTML = textos.sexo
        elemento_data('data-texto-data-inicio').innerHTML = textos.data_nascimento
        elemento_data('data-texto-documento-estadual').innerHTML = textos.documento_estadual_tpf
        elemento_data('data-texto-documento-federeal').innerHTML = textos.documento_federal_tpf
        elemento_data('data-texto-vinculo').innerHTML = textos.vinculo
    } else if (parametro_tipo_pessoa == 'J') {
        elemento_data('data-texto-lista-titulo').innerHTML = textos.lista_titulo_tpj
        elemento_data('data-texto-nome').innerHTML = textos.nome_tpf
        elemento_data('data-texto-apelido').innerHTML = textos.apelido_tpj
        elemento_data('data-texto-documento-estadual').innerHTML = textos.documento_estadual_tpj
        elemento_data('data-texto-documento-federeal').innerHTML = textos.documento_federal_tpj

        document.querySelectorAll('[data-visible="F"]').forEach(function (elemento) {
            elemento.classList.add('esconder')
        })
    } else {
        callback_error()
    }
}

botao_voltar_home_click = function () {
    navegarPara('../../../../index.html')
}

botao_cadastrar_click = function () {
    navegarPara(`cadastro_pessoa.html?tipo_pessoa=${parametro_tipo_pessoa}`)
}

botao_editar_click = function (id) {
    navegarPara(`cadastro_pessoa.html?tipo_pessoa=${parametro_tipo_pessoa}&id=${id}`)
}

botao_inativar_click = async function (id) {
    requisicao = await fetch(`${API_HOST}/pessoas/tiago/inativar/${id}`, {
        method: 'PUT'
    })

    filtro = document.getElementById('search')

    if (filtro.value.trim() != '') {
        evento = {
            target: filtro
        }

        filtrar_dados(evento)
    } else {
        exibir_dados()
    }
}

botao_abrir_endereco_click = async function (id) {
    requisicao = await fetch(`${API_HOST}/pessoas/tiago/enderecos/${id}`, {
        method: 'GET'
    })

    if (requisicao.ok == true) {
        response = await requisicao.json()

        data = response.data
        place = ''

        if (data.numero != undefined) {
            place += `${data.numero}+,+`
        }

        place += `${data.logradouro}+-+`
        place += `${data.bairro}+-+`
        place += `${data.cidade}+,+`
        place += `${data.estado}+-+`
        place += `${data.cep}`

        window.open(`https://www.google.com/maps/place/${place}`, '_blank');
    }
}

buscar_dados = async function () {
    requisicao = await fetch(`${API_HOST}/pessoas/tiago?tipo_pessoa=${parametro_tipo_pessoa}`, {
        method: 'GET'
    })

    if (requisicao.ok == true) {
        response = await requisicao.json()

        return response.data.length > 0 ? response.data : null

    } else {
        return null
    }
}

buscar_dados_filtrados = async function (value) {
    requisicao = await fetch(`${API_HOST}/pessoas/tiago?tipo_pessoa=${parametro_tipo_pessoa}&q=${value}`, {
        method: 'GET'
    })

    if (requisicao.ok == true) {
        response = await requisicao.json()

        return response.data.length > 0 ? response.data : null

    } else {
        return null
    }
}

exibir_situacao_operacao = function (operacao) {
    tabela.setAttribute('class', '')
    mensagem.setAttribute('class', '')
    imagem.setAttribute('class', '')

    switch (operacao) {
        case 'BUSCANDO':
            tabela.classList.add('esconder')
            mensagem.classList.add('esconder')
            imagem.classList.add('exibir')
            break;
        case 'TEM_DADOS':
            tabela.classList.add('exibir')
            mensagem.classList.add('esconder')
            imagem.classList.add('esconder')
            break;

        case 'SEM_DADOS':
            tabela.classList.add('esconder')
            mensagem.classList.add('exibir')
            imagem.classList.add('esconder')
            break;
        default:
            break;
    }
}

montar_tabela = function (lista_pessoas) {
    adicionar_coluna = function (linha, valor) {
        coluna = document.createElement('td')
        span = document.createElement('span')
        span.innerHTML = valor

        coluna.appendChild(span)
        linha.appendChild(coluna)
    }

    adicionar_botao = function (url_imagem, funcao) {
        botao = document.createElement('button')
        imagem_botao = document.createElement('img')
        imagem_botao.src = url_imagem
        botao.onclick = function () {
            funcao()
        }

        botao.appendChild(imagem_botao)
        return botao
    }

    tabela_dados.innerHTML = ''
    lista_pessoas.forEach((item) => {

        linha = document.createElement('tr')

        if (parametro_tipo_pessoa == 'F') {

            newDateSplited = item.data_inicio.split('T')[0]
            newDateSplited = newDateSplited.split('-')

            adicionar_coluna(linha, item.nome)
            adicionar_coluna(linha, item.apelido)
            adicionar_coluna(linha, item.sexo == 'M' ? textos.sexo_masculino : textos.sexo_feminino)
            adicionar_coluna(linha, `${newDateSplited[2]}/${newDateSplited[1]}/${newDateSplited[0]}`)
            adicionar_coluna(linha, item.documento_estadual)
            adicionar_coluna(linha, item.documento_federeal)
            // adicionar_coluna(linha, item.nome_vinculo)

            coluna = document.createElement('td')
            vinculo_link = document.createElement('a')
            vinculo_link.href = `cadastro_pessoa.html?tipo_pessoa=J&id=${item.id_vinculo}`
            vinculo_link.innerHTML = item.nome_vinculo
            coluna.appendChild(vinculo_link)
            linha.appendChild(coluna)

        } else {
            adicionar_coluna(linha, item.nome)
            adicionar_coluna(linha, item.apelido)
            adicionar_coluna(linha, item.documento_estadual)
            adicionar_coluna(linha, item.documento_federeal)
        }

        adicionar_coluna(linha, item.ativo == 'A' ? textos.ativo_sim : textos.ativo_nao)

        coluna = document.createElement('td')
        if (item.id_moradia) {
            botao_moradia = adicionar_botao('../../../../imagens/end_moradia.png', function () {
                botao_abrir_endereco_click(item.id_moradia)
            })
            coluna.appendChild(botao_moradia)
        }

        if (item.id_entrega) {
            botao_entrega = adicionar_botao('../../../../imagens/end_entrega.png', function () {
                botao_abrir_endereco_click(item.id_entrega)
            })
            coluna.appendChild(botao_entrega)
        }

        if (item.id_cobranca) {
            botao_cobranca = adicionar_botao('../../../../imagens/end_cobranca.png', function () {
                botao_abrir_endereco_click(item.id_cobranca)
            })
            coluna.appendChild(botao_cobranca)
        }

        linha.appendChild(coluna)

        coluna = document.createElement('td')
        botao_editar = adicionar_botao('../../../../imagens/editar.png', function () {
            botao_editar_click(item.id)
        })
        coluna.appendChild(botao_editar)

        if (item.ativo == 'A') {
            botao_remover = adicionar_botao('../../../../imagens/remover.png', function () {
                botao_inativar_click(item.id)
            })

            coluna.appendChild(botao_remover)
        } else {
            linha.classList.add('inactive')
        }

        linha.appendChild(coluna)

        tabela_dados.appendChild(linha)
    })
}

exibir_dados = async function () {

    url_parametros = window.location.search

    if (url_parametros != '') {
        parametros = new URLSearchParams(url_parametros)
        parametro_tipo_pessoa = parametros.get('tipo_pessoa')

        requisicao = await fetch(`../tiago/textos.json`)

        if (requisicao.ok === true) {
            textos = await requisicao.json()

            exibir_dados_textos(textos, function () {
                exibir_situacao_operacao('ERRO', 'Falha ao determinar tipo da listagem')
                setInterval(function () {
                    botao_voltar_home_click()
                }, 2000)
            })

            exibir_situacao_operacao('BUSCOU_TEXTOS', '')
            exibir_situacao_operacao('BUSCANDO')
            lista_pessoas = await buscar_dados()

            if (lista_pessoas != null) {
                montar_tabela(lista_pessoas)
                exibir_situacao_operacao('TEM_DADOS')
            } else {
                exibir_situacao_operacao('SEM_DADOS')
            }
        } else {
            exibir_situacao_operacao('ERRO', 'Falha ao recuperar textos')
            setInterval(function () {
                botao_voltar_home_click()
            }, 2000)
        }
    }
}

let controlador_disparo;

filtrar_dados = function (event) {
    value = event.target.value

    clearTimeout(controlador_disparo)

    controlador_disparo = setTimeout(async function () {
        exibir_situacao_operacao('BUSCANDO')
        lista_pessoas = await buscar_dados_filtrados(value)

        if (lista_pessoas != null) {
            montar_tabela(lista_pessoas)
            exibir_situacao_operacao('TEM_DADOS')
        } else {
            exibir_situacao_operacao('SEM_DADOS')
        }
    }, 500)


}

exibir_dados()