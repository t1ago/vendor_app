campo_tabela = document.getElementById("corpo_tabela");
function preencher_coluna(conteudo){
    coluna = document.createElement("td")
    span = document.createElement("span")
    span.innerHTML = conteudo
    coluna.appendChild(span)
    return coluna
}

function preencher_coluna_botao(funcao,id){
    botao = document.createElement("button")
    img = document.createElement("img")
    if(funcao == "EDITAR") {
        botao.onclick = function() {
            window.location.href =  `fornecedor_victor.html?id=${id}`
        }
        img.src = "/vendor_app/imagens/editar.png"
    } else {
        botao.onclick = function() {
            console.log(id)
        }
        img.src = "/vendor_app/imagens/remover.png"
    }
    botao.appendChild(img)
    return botao
}

function mostrar_dados(dados) {
    campo_tabela.innerHTML = "";
    dados.data.forEach(item => {
        linha = document.createElement("tr")
        linha.appendChild(preencher_coluna(item.nome))
        linha.appendChild(preencher_coluna(item.nome_moeda))
        linha.appendChild(preencher_coluna(item.nome_categoria))
        linha.appendChild(preencher_coluna(item.nome_grupo))
        linha.appendChild(preencher_coluna(item.hexadecimal))
        linha.appendChild(preencher_coluna(item.nome_medida))
        linha.appendChild(preencher_coluna(item.preco_venda))
        coluna = document.createElement("td")
        coluna.appendChild(preencher_coluna_botao("EDITAR",item.id))
        coluna.appendChild(preencher_coluna_botao("EXCLUIR",item.id))
        linha.appendChild(coluna)
        campo_tabela.appendChild(linha)
    })
        
}

let timeout;

function filtrar_dados(event) {
    valor = event.target.value
    clearTimeout(timeout)

    timeout = setTimeout(async function () {
        const requisicao = await fetch(`http://localhost:3000/fornecedores/victor?nome=${valor}`,{
            method:'GET',
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })
        if(requisicao.ok == true) {
            dados = await requisicao.json()
            mostrar_dados(dados)
        }
    },500)
}



async function exibir_dados() {
    const requisicao = await fetch("http://localhost:3000/fornecedores/victor",{
        method:'GET',
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        }
    })
    if(requisicao.ok == true) {
        dados = await requisicao.json()
        mostrar_dados(dados)
    }
}

exibir_dados()