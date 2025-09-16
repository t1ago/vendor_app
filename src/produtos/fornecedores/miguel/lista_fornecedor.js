let tabela = document.getElementById("tabela_fornecedor")

botao_cadastrar_click = function () {
    window.location.href = "cadastro.html"
}

function botao_voltar_click() {
    window.location.href = '../../../index.html'
}


buscar_dados = async function () {

    // requisicao para minha API do banco de dados (dia 13/09)
    let requisicao = await fetch('http://localhost:3000/fornecedor/miguel', {
        method: "GET"
    })

    // teste lógico para que se funcionar a chamada, faço a verificação 200, entra no jeito que js trabalhe e retorno se a lista for maior que 0 o meu data (minhas informaçoes)(dia 13/09)
    if (requisicao.ok) {
        let response = await requisicao.json()
        return response.data.length > 0 ? response.data : []

        // se não é so me devolver nulo (dia 13/09)
    } else {
        return null
    }
}



exibindo_dados = async function () {
    let lista = await buscar_dados()

    // limpando a tabela
    tabela.innerHTML = ""

    // facilitação explorada para + praticidade (dia 13/09, complemento estava dando erro, certo agora (dia 14/09)
    let adicionando_coluna = function (linha, valor) {
        coluna = document.createElement('td')
        span = document.createElement('span')

        span.innerHTML = valor

        coluna.appendChild(span)
        linha.appendChild(coluna)
    }

    let adicionando_botao = function (linha, url_img, funcao) {
        let coluna = document.createElement('td')
        let botao = document.createElement('button')
        let imagem = document.createElement('img')
        
        // configurando como as image
        imagem.src = url_img
        imagem.width = 30
        imagem.height = 20

        botao.onclick = function () {
            funcao()
        }

        botao.appendChild(imagem)
        coluna.appendChild(botao)
        linha.appendChild(coluna)
    }

    // Preenche linhas
    lista.forEach((item) => {
        let linha = document.createElement('tr')

        adicionando_coluna(linha, item.nome)
        adicionando_coluna(linha, item.id_moeda)
        adicionando_coluna(linha, item.preco_compra)
        adicionando_coluna(linha, item.preco_venda)
        adicionando_coluna(linha, item.id_cor)
        adicionando_coluna(linha, item.id_grupo)
        adicionando_coluna(linha, item.id_categoria)
        adicionando_coluna(linha, item.id_unidade_medida)
        adicionando_coluna(linha, item.id_marca)
        adicionando_coluna(linha, item.descricao)

        adicionando_botao(linha, "../../../../imagens/editar.png", () => editar_item(item))
        adicionando_botao(linha, "../../../../imagens/remover.png", () => excluir_item(item))


        tabela.appendChild(linha)
    })
}



editar_item = async function (item) {
    window.location.href = "cadastro.html?id=" + item.id

}


excluir_item = async function (item) {
    await fetch(`http://localhost:3000/fornecedor/miguel/${item.id}`, {
        method: "DELETE"
    })
    exibindo_dados()
}
// executa ao carregar a página
window.onload = exibindo_dados
