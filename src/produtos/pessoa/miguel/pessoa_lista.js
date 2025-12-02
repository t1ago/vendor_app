API_HOST = 'http://127.0.0.1:3000'


const tabela = document.getElementById("tabela-pessoas")

volta_lista = function () {

    window.location.href = "../../../../index.html";
}

cadastro_lista = function () {

    window.location.href = "pessoa_cadastro.html";
}



const buscar_dados = async function () {

    const requisicao = await fetch(`${API_HOST}/pessoas/miguel`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });


    if (requisicao.ok) {
        let response = await requisicao.json()
        return response.data.length > 0 ? response.data : []
    } else {
        return null
    }
}




const exibir_dados = async function (lista = null) {

    if (!lista) {

        lista = await buscar_dados()
    }

    tabela.innerHTML = "";

    const adicionarColuna = function (linha, valor) {
        let coluna = document.createElement('td');
        let span = document.createElement('span');

        span.innerHTML = valor;

        coluna.appendChild(span);
        linha.appendChild(coluna);

    }

    const adicionar_botao = function (linha, url_img, funcao) {
        let coluna = document.createElement('td')
        let botao = document.createElement('button')
        let imagem = document.createElement('img')

        imagem.src = url_img
        imagem.width = 30;
        imagem.height = 30;

        botao.onclick = function () {
            funcao()
        }

        botao.appendChild(imagem)
        coluna.appendChild(botao)
        linha.appendChild(coluna)

    }

    
    const adicionar_endereco = function (linha, pessoaId) {
    let coluna = document.createElement('td')
    let botao = document.createElement('button')

    botao.innerHTML = "Endereço"

    botao.onclick = function () {
        window.location.href = "endereco_lista.html?pessoa_id=" + pessoaId;
    }

    coluna.appendChild(botao)
    linha.appendChild(coluna)
}


    lista.forEach((item) => {
        let linha = document.createElement('tr');

        adicionarColuna(linha, item.nome);
        adicionarColuna(linha, item.apelido);
        adicionarColuna(linha, item.tipo_pessoa);
        adicionarColuna(linha, item.sexo);
        adicionarColuna(linha, item.idade);
        adicionarColuna(linha, item.documento_estadual);
        adicionarColuna(linha, item.documento_federal);
        adicionarColuna(linha, item.ativo);
        adicionarColuna(linha, item.id_vinculo);
        
        adicionar_botao(linha, "../../../../imagens/editar.png", () => editar_fisica(item))
        adicionar_botao(linha, "../../../../imagens/remover.png", () => excluir_fisico(item))

        adicionar_endereco(linha, item.id)



        tabela.appendChild(linha);
    });

}

const editar_fisica = function (item) {

    window.location.href = "pessoa_cadastro.html?id=" + item.id

}

const show_address = function (pessoaId) {
    window.location.href = "endereco_lista.html?pessoa_id=" + pessoaId;
}



const excluir_fisico = async function (item) {

    await fetch(`${API_HOST}/pessoas/miguel/${item.id}`, {
        method: "DELETE"

    })

    exibir_dados()

}


const mostrarDados = async function () {

    let lista = await buscar_dados()

    if (lista != null) {

        await exibir_dados(lista)
    }

}
mostrarDados()