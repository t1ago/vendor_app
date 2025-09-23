tabela_dados = document.getElementById('tabela_dados')
tabela = document.getElementById('tabela')
mensagem = document.getElementById('mensagem')
imagem = document.getElementById('imagem')

botao_voltar_home_click = function () {
    navegarPara('../../../../index.html')
}

botao_cadastrar_click = function () {
    navegarPara('cadastro_fornecedor.html')
}

botao_editar_click = function (id) {
    navegarPara(`cadastro_fornecedor.html?id=${id}`)
}

botao_remover_click = async function (id) {
    requisicao = await fetch(`${API_HOST}/fornecedores/tiago/${id}`, {
        method: 'DELETE'
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

buscar_dados = async function () {
    requisicao = await fetch(`${API_HOST}/fornecedores/tiago`, {
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
    requisicao = await fetch(`${API_HOST}/fornecedores/tiago?name=${value}`, {
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

montar_tabela = function (lista_fornecedores) {
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
    lista_fornecedores.forEach((item) => {

        linha = document.createElement('tr')

        adicionar_coluna(linha, item.nome)
        adicionar_coluna(linha, item.nome_categoria)
        adicionar_coluna(linha, item.nome_grupo)
        adicionar_coluna(linha, item.nome_marca)
        adicionar_coluna(linha, item.nome_moeda)
        adicionar_coluna(linha, item.nome_unidade_medida)
        adicionar_coluna(linha, item.preco_venda)

        coluna = document.createElement('td')
        botao_editar = adicionar_botao('../../../../imagens/editar.png', function () {
            botao_editar_click(item.id)
        })

        botao_remover = adicionar_botao('../../../../imagens/remover.png', function () {
            botao_remover_click(item.id)
        })

        coluna.appendChild(botao_editar)
        coluna.appendChild(botao_remover)
        linha.appendChild(coluna)

        tabela_dados.appendChild(linha)
    })
}

exibir_dados = async function () {
    exibir_situacao_operacao('BUSCANDO')
    lista_fornecedores = await buscar_dados()

    if (lista_fornecedores != null) {
        montar_tabela(lista_fornecedores)
        exibir_situacao_operacao('TEM_DADOS')
    } else {
        exibir_situacao_operacao('SEM_DADOS')
    }
}

let controlador_disparo;

filtrar_dados = function (event) {
    value = event.target.value

    clearTimeout(controlador_disparo)

    controlador_disparo = setTimeout(async function () {
        exibir_situacao_operacao('BUSCANDO')
        lista_fornecedores = await buscar_dados_filtrados(value)

        if (lista_fornecedores != null) {
            montar_tabela(lista_fornecedores)
            exibir_situacao_operacao('TEM_DADOS')
        } else {
            exibir_situacao_operacao('SEM_DADOS')
        }
    }, 500)


}

exibir_dados()