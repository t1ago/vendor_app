tabela_dados = document.getElementById('tabela_dados')
coluna_tabela = document.getElementsByClassName('coluna_tabela')[0]
coluna_sem_tabela = document.getElementsByClassName('coluna_sem_tabela')[0]

botao_excluir_click = function(id) {
    lista_categorias = JSON.parse(window.localStorage.getItem('categorias'))

    indice = lista_categorias.findIndex(function(valor, array_indice, array) {
        return valor.id == id
    })

    lista_categorias.splice(indice, 1)
    window.localStorage.setItem('categorias', JSON.stringify(lista_categorias))
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

buscar_dados = function() {
    categorias = window.localStorage.getItem('categorias')

    if (categorias != null) {
        lista_categorias = JSON.parse(categorias)

        return lista_categorias.length > 0 ? lista_categorias : null 
    } else {
        return null
    }
}

exibir_dados = function() {
    tabela_dados.innerHTML = ''
    lista_categorias = buscar_dados()

    if (lista_categorias != null) {
        coluna_tabela.style.display = 'block'
        coluna_sem_tabela.style.display = 'none'

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

            botao_excluir.onclick = function() {
                botao_excluir_click(item.id)
                exibir_dados()
            }

            botao_editar.appendChild(imagem_editar)
            coluna_acoes.appendChild(botao_editar)
            botao_excluir.appendChild(imagem_excluir)
            coluna_acoes.appendChild(botao_excluir)
            linha.appendChild(coluna_acoes)

            tabela_dados.appendChild(linha)
        });
    } else {
        coluna_tabela.style.display = 'none'
        coluna_sem_tabela.style.display = 'block'
    }
}

// Executa
exibir_dados()