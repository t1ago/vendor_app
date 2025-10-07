API_HOST = 'http://127.0.0.1:3000'

let tabela = document.getElementById("tabela_fornecedor")

botao_cadastrar_click = function () {
    window.location.href = "cadastro.html"
}

function botao_voltar_click() {
    window.location.href = '../../../../index.html'
}


buscar_dados = async function () {


    let requisicao = await fetch(`${API_HOST}/fornecedor/miguel`, {
        method: "GET"
    })

  
    if (requisicao.ok) {
        let response = await requisicao.json()
        return response.data.length > 0 ? response.data : []

      
    } else {
        return null
    }
}

buscar_dados_filtrados = async function (value) {


    let requisicao = await fetch(`${API_HOST}/fornecedor/miguel?name=${value}`, {
        method: "GET"
    })

    if (requisicao.ok) {
        let response = await requisicao.json()
        return response.data.length > 0 ? response.data : []


    } else {
        return null
    }
}


exibindo_dados = async function (lista = null) {
    if (!lista) {
        lista = await buscar_dados();
    }


    tabela.innerHTML = "";

    adicionando_coluna = function (linha, valor) {
        let coluna = document.createElement('td');
        let span = document.createElement('span');
        span.innerHTML = valor;
        coluna.appendChild(span);
        linha.appendChild(coluna);
    };

    adicionando_botao = function (linha, url_img, funcao) {
        let coluna = document.createElement('td');
        let botao = document.createElement('button');
        let imagem = document.createElement('img');

        imagem.src = url_img;
        imagem.width = 30;
        imagem.height = 20;

        botao.onclick = function () {
            funcao();
        }

        botao.appendChild(imagem);
        coluna.appendChild(botao);
        linha.appendChild(coluna);
    };


    lista.forEach((item) => {
        let linha = document.createElement('tr');
        adicionando_coluna(linha, item.nome);
        adicionando_coluna(linha, item.nome_moeda || item.id_moeda);
        adicionando_coluna(linha, item.preco_compra);
        adicionando_coluna(linha, item.preco_venda);
        adicionando_coluna(linha, item.nome_cor || item.id_cor);
        adicionando_coluna(linha, item.nome_grupo || item.id_grupo);
        adicionando_coluna(linha, item.nome_categoria || item.id_categoria);
        adicionando_coluna(linha, item.nome_unidade_medida || item.id_unidade_medida);
        adicionando_coluna(linha, item.nome_marca || item.id_marca);
        adicionando_coluna(linha, item.descricao);

        adicionando_botao(linha, "../../../../imagens/editar.png", () => editar_item(item));
        adicionando_botao(linha, "../../../../imagens/remover.png", () => excluir_item(item));

        tabela.appendChild(linha);
    });

}


exibir_dados = async function () {

    lista = await buscar_dados()

    if (lista != null) {

        exibindo_dados(lista)
    }

    else {

    }
}

let controlador_disparado;


filtrar_dados = function (event) {
    let value = event.target.value;

    clearTimeout(controlador_disparado);

    controlador_disparado = setTimeout(async function () {
        let lista = await buscar_dados_filtrados(value);

        if (lista != null) {
            exibindo_dados(lista);
        }
    }, 500);
}



editar_item = async function (item) {
    window.location.href = "cadastro.html?id=" + item.id

}


excluir_item = async function (item) {
    await fetch(`${API_HOST}/fornecedor/miguel/${item.id}`, {
        method: "DELETE"
    })

    filtro = document.getElementById('search')

    if (filtro.value.trim() != '') {
        evento = {
            target: filtro
        }
        filtrar_dados(evento)
    } else {
        exibindo_dados()
    }


}

exibindo_dados()

