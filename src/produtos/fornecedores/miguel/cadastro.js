
valores_dados = {
    id_fornecedor: null,
    nome: null,
    id_moeda: null,
    preco_compra: null,
    preco_venda: null,
    id_cor: null,
    id_grupo: null,
    id_categoria: null,
    id_unidade_medida: null,
    id_marca: null,
    descricao: null
}

botao_cancelar_click = function () {
    window.location.href = "lista_fornecedor.html"
}


async function focar_campo(elemento, minha_funcao) {
    let elemento_pai = elemento.parentNode;
    let elemento_informacao = elemento_pai.querySelector('div');
    if (elemento_informacao) {
        elemento_informacao.classList.remove('esconder');
    }

    await minha_funcao(elemento)
}

function selecionar_item(elemento, id) {
    valores_dados[id] = parseInt(elemento.dataset.id)
    esconder_informacao(elemento)
    console.log(valores_dados)
}

function esconder_informacao(elemento) {
    let elemento_pai = elemento.parentNode
    elemento_pai = elemento_pai.parentNode
    if (elemento_pai != undefined) {
        elemento_pai.classList.add('esconder')
    }
}

// mostra o "carregando" em qualquer container
function mostrarCarregando(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '<img src="../../../../imagens/loading.png" width="32" />';
    }
}

// coloca a lista de volta no container
function carregarInformacoes(containerId, lista) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = "";   // limpa o que tinha
        container.appendChild(lista);
    }
}

document.addEventListener('click', (elemento) => {
    document.querySelectorAll('.coluna-base > div:not(.esconder)').forEach(div => {
        if (!div.parentNode.contains(elemento.target)) {
            div.classList.add('esconder');
        }
    });
});


adicionar_valor_campo = function (elemento, valor) {

    elemento.value = valor
}


buscar_informação_categoria = async function (elemento) {
    mostrarCarregando("info-categoria");

    let requisicao = await fetch(`http://localhost:3000/categorias`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (requisicao.ok) {
        const lista = document.createElement("ul");
        const lista_categoria = await requisicao.json();

        lista_categoria.data.forEach(item => {
            const lista_item = document.createElement("li");
            lista_item.dataset.id = item.id;

            const span_item = document.createElement("span");
            span_item.innerHTML = item.nome;

            lista_item.appendChild(span_item);

            lista_item.onclick = function (event) {
                selecionar_item(event.currentTarget, "id_categoria");
                adicionar_valor_campo(elemento, item.nome);
            };

            lista.appendChild(lista_item);
        });

        carregarInformacoes("info-categoria", lista);
    } else {
        document.getElementById("info-categoria").innerHTML = "⚠️ Erro ao carregar";
    }
}


buscar_informação_grupo = async function (elemento) {
    info_grupo = document.getElementById('info-grupo')
    mostrarCarregando("info-grupo")

    requisicao = await fetch(`http://localhost:3000/grupos`, {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    })

    if (requisicao.ok == true) {
        lista = document.createElement('ul')


        lista_grupo = await requisicao.json()

        lista_grupo.data.forEach(item => {
            lista_item = document.createElement('li')
            lista_item.dataset.id = item.id

            span_item = document.createElement('span')
            span_item.innerHTML = item.nome

            lista_item.appendChild(span_item)


            lista_item.onclick = function (event) {
                selecionar_item(event.currentTarget, 'id_grupo')
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        })

        carregarInformacoes("info-grupo", lista);
        info_grupo.appendChild(lista)


    } else {

    }
}

buscar_informacao_moeda = async function (elemento) {
    info_moeda = document.getElementById("info-moeda")
    mostrarCarregando("info-moeda")

    requisicao = await fetch(`http://localhost:3000/moedas`, {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    })

    if (requisicao.ok == true) {

        lista = document.createElement("ul")

        lista_moeda = await requisicao.json()
        lista_moeda.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_moeda = document.createElement("span")
            span_moeda.innerHTML = item.nome

            lista_item.appendChild(span_moeda)

            lista_item.onclick = function (event) {
                selecionar_item(event.currentTarget, "id_moeda")
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        })

        carregarInformacoes("info-moeda", lista);
        info_moeda.appendChild(lista)

    } else {

    }
}

buscar_informacao_marca = async function (elemento) {
    info_marca = document.getElementById("info-marca")
    mostrarCarregando("info-marca")

    requisicao = await fetch("http://localhost:3000/marca", {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok == true) {

        lista = document.createElement("ul")

        lista_marca = await requisicao.json()
        lista_marca.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_marca = document.createElement("span")
            span_marca.innerHTML = item.nome

            lista_item.appendChild(span_marca)

            lista_item.onclick = function (event) {
                selecionar_item(event.currentTarget, "id_marca")
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        })

        carregarInformacoes("info-marca", lista)
        info_marca.appendChild(lista)
    } else {

    }


}


buscar_informacao_medida = async function (elemento) {
    info_marca = document.getElementById("info-medida")
    mostrarCarregando("info-medida")

    requisicao = await fetch("http://localhost:3000/medidas", {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok == true) {

        lista = document.createElement("ul")

        lista_medida = await requisicao.json()
        lista_medida.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_medida = document.createElement("span")
            span_medida.innerHTML = item.nome

            lista_item.appendChild(span_medida)

            lista_item.onclick = function (event) {
                selecionar_item(event.currentTarget, "id_unidade_medida")
                adicionar_valor_campo(elemento, item.nome)
            }

            lista.appendChild(lista_item)
        })
        carregarInformacoes("info-medida", lista)
        info_marca.appendChild(lista)
    }


}



buscar_informacao_cor = async function (elemento) {

    info_cor = document.getElementById("info-cor")
    mostrarCarregando("info-cor")

    requisicao = await fetch(`http://localhost:3000/cores`, {

        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (requisicao.ok = true) {

        lista = document.createElement("ul")

        lista_cor = await requisicao.json()

        lista_cor.data.forEach(item => {

            lista_item = document.createElement("li")
            lista_item.dataset.id = item.id

            span_cor = document.createElement("span")
            span_cor.innerHTML = item.hexadecimal

            lista_item.appendChild(span_cor)

            lista_item.onclick = function (event) {
                selecionar_item(event.currentTarget, "id_cor")
                adicionar_valor_campo(elemento, item.hexadecimal)
            }
            lista.appendChild(lista_item)

        })

        carregarInformacoes("info-cor", lista)
        info_cor.appendChild(lista)
    } else {

    }

}

adicionando_valor = function (propriedade, elemento) {
    valores_dados[propriedade] = elemento.value
}

botao_salvar_click = async function () {
    const acao = valores_dados.id_fornecedor == null ? "incluir" : "alterar";

    let corpo = {
        nome: valores_dados.nome,
        descricao: valores_dados.descricao,
        id_categoria: valores_dados.id_categoria,
        id_cor: valores_dados.id_cor,
        id_unidade_medida: valores_dados.id_unidade_medida,
        id_marca: valores_dados.id_marca,
        id_grupo: valores_dados.id_grupo,
        id_moeda: valores_dados.id_moeda,
        preco_venda: valores_dados.preco_venda,
        preco_compra: valores_dados.preco_compra
    }

    let endpoint = "http://localhost:3000/fornecedor/miguel"
    if (acao == "alterar") {
        endpoint += "/" + valores_dados.id_fornecedor

    }

    let requisicao = await fetch(endpoint, {
        method: acao == "incluir" ? "POST" : "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpo)
    })


    // adicionando um botão de mensagem, pegando o id do botão salvar(html), aqui ao clicar eu darei uma mensagem (dia 14/09)
    let botao = document.getElementById("btnSalvar")

    if (requisicao.ok) {

        botao.outerHTML = "<span style='color: green; font-weight: bold;'>salvo com sucesso!</span>";

        // fazendo esperar por 1,5s para ai sim eu ser jogado para a tela de lista (dia 14/09)
        setTimeout(() => {
            window.location.href = "lista_fornecedor.html";
        }, 1500);

    } else {
        return null
    }


}

// fazendo interejamento para o cancelar tmb, (pendente) confirmar se não é muito forçado (dia 14/09)
botao_cancelar_click = function () {
    const botao_cancelar = document.getElementById("btncancel")

    botao_cancelar.outerHTML = "<span style='color: black; font-weight: bold;'>Redirecionando para lista</span>";

    setTimeout(() => {
        window.location.href = "lista_fornecedor.html";

    }, 1500);
}

exibir_dados = async function () {
    try {
        // o URLSearchParams
        const params = new URLSearchParams(window.location.search); // usando o window.location.search, pega a parte ?id=1 da URL. - (dia 09/09)
        const id = params.get("id");

        // fazendo a conexão de API com o fetch, na minha tela fornecedormiguel - (dia 09/09)
        let requisicao = await fetch(`http://localhost:3000/fornecedor/miguel/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (requisicao.ok) {
            let resposta = await requisicao.json();
            let fornecedor = resposta.data[0];

            // criando um objeto JS com os dados do fornecedor. - (dia 09/09)
            valores_dados = {
                id_fornecedor: fornecedor.id,
                nome: fornecedor.nome,
                preco_compra: fornecedor.preco_compra,
                preco_venda: fornecedor.preco_venda,
                id_categoria: fornecedor.id_categoria,
                id_unidade_medida: fornecedor.id_unidade_medida,
                id_grupo: fornecedor.id_grupo,
                id_moeda: fornecedor.id_moeda,
                id_cor: fornecedor.id_cor,
                id_marca: fornecedor.id_marca,
                descricao: fornecedor.descricao
            };

            // Preenchendo os inputs com seus valores, temos o buscar  getElementById do HTML, 
            // e o .value que vai passar as informações pro inputs, será igual a nossa função que esta com o data "." o valor do objeto - (dia 09/09)
            document.getElementById("id").value = fornecedor.id || "";
            document.getElementById("name").value = fornecedor.nome || "";
            document.getElementById("buy").value = fornecedor.preco_compra || "";
            document.getElementById("sell").value = fornecedor.preco_venda || "";
            document.getElementById("categoria").value = fornecedor.nome_categoria || "";
            document.getElementById("medida").value = fornecedor.nome_medida || "";
            document.getElementById("group").value = fornecedor.nome_grupo || "";
            document.getElementById("coin").value = fornecedor.nome_moeda || "";
            document.getElementById("cor").value = fornecedor.hexadecimal || "";
            document.getElementById("marc").value = fornecedor.nome_marca || "";
            document.getElementById("desc").value = fornecedor.descricao || "";

        } else {

        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
};


window.onload = exibir_dados;

