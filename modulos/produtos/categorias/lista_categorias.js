tabela_dados = document.getElementById('tabela_dados')
tabela = document.getElementById('tabela')
mensagem = document.getElementById('mensagem')
imagem = document.getElementById('imagem')

botao_excluir_click = async function(id) {
    return await fetch(`http://localhost:3000/categorias/${id}`, {
        method: "DELETE",
    })
}

botao_editar_click = function(id) {
    navegarPara(`cadastro_categorias.html?id=${id}`);
}

botao_castrar_categorias_click = function() {
    navegarPara('cadastro_categorias.html');
}

botao_voltar_home_click = function() {
    navegarPara('../../../index.html');
}

buscar_dados = async function() {
    requisicao = await fetch("http://localhost:3000/categorias", {
        method: "GET",
    })

    if (requisicao.ok == true) {
        resposta = await requisicao.json()

        return resposta.data.length > 0 ? resposta.data : null 
    } else {
        return null
    }
}

exibir_situacao_operacao = function(operacao) {
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

exibir_dados = async function() {
    exibir_situacao_operacao('BUSCANDO')

    tabela_dados.innerHTML = ''
    lista_categorias = await buscar_dados()

    if (lista_categorias != null) {
        lista_categorias.forEach(item => {
            linha = document.createElement('tr')

            coluna_nome = document.createElement('td')
            span_nome = document.createElement('span')
            span_nome.innerHTML = item.nome

            coluna_nome.appendChild(span_nome)
            linha.appendChild(coluna_nome)

            coluna_acoes = document.createElement('td')
            botao_editar = document.createElement('button')
            imagem_editar = document.createElement('img')
            imagem_editar.src = '../../../imagens/editar.png'
            botao_excluir = document.createElement('button')
            imagem_excluir = document.createElement('img')
            imagem_excluir.src = '../../../imagens/remover.png'

            botao_editar.onclick = function() { 
                botao_editar_click(item.id)
            }

            botao_excluir.onclick = async function() {
                exibir_situacao_operacao('BUSCANDO')
                await botao_excluir_click(item.id)
                exibir_dados()
            }

            botao_editar.appendChild(imagem_editar)
            coluna_acoes.appendChild(botao_editar)
            botao_excluir.appendChild(imagem_excluir)
            coluna_acoes.appendChild(botao_excluir)
            linha.appendChild(coluna_acoes)

            tabela_dados.appendChild(linha)
        });

        exibir_situacao_operacao('TEM_DADOS')
    } else {
        exibir_situacao_operacao('SEM_DADOS')
    }
}

// Executa
exibir_dados()