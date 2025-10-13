campo_tabela = document.getElementById("corpo_tabela");
function preencher_coluna(conteudo){
    coluna = document.createElement("td")
    span = document.createElement("span")
    span.innerHTML = conteudo
    coluna.appendChild(span)
    return coluna
}
function animacaoCarregar(chave = true) {
    elemento_selecionado = document.getElementById('tabela-fornecedores').parentNode;
    elemento_animado = document.createElement('div');
    elemento_animado.classList.add('elemento_animado');
    if (chave == true) {
        animacao = document.createElement('img');
        animacao.src = '../../../../imagens/loading.png';
        animacao.classList.add('animar');
        elemento_animado.appendChild(animacao);
        elemento_selecionado.appendChild(elemento_animado);
    } else {
        elemento_animado = document.getElementsByClassName("elemento_animado")[0];
        elemento_animado.remove();
    } 
}
function preencher_coluna_botao(funcao,id){
    botao = document.createElement("button")
    img = document.createElement("img")
    if(funcao == "EDITAR") {
        botao.onclick = function() {
            window.location.href =  `cadastro_produto.html?id=${id}`
        }
        img.src = "../../../../imagens/editar.png"
    } else {
        botao.onclick = async function() {
            await fetch(`${API_HOST}/produto/victor/${id}`,{
                method:'DELETE'
            })
            exibir_dados()
        }
        img.src = "../../../../imagens/remover.png"
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
        linha.appendChild(preencher_coluna(item.nome_marca))
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
    tabela = document.getElementById("tabela-fornecedores")
    
    timeout = setTimeout(async function () {
        animacaoCarregar()
        const requisicao = await fetch(`${API_HOST}/produto/victor?nome=${valor}`,{
            method:'GET',
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })
        animacaoCarregar(false)
        if(requisicao.ok == true) {
            dados = await requisicao.json()
            mostrar_dados(dados)
        }
    },500)
}



async function exibir_dados() {
    tabela = document.getElementById("tabela-fornecedores")
    animacaoCarregar()
    const requisicao = await fetch(`${API_HOST}/produto/victor`,{
        method:'GET',
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        }
    })
    animacaoCarregar(false)
    if(requisicao.ok == true) {
        dados = await requisicao.json()
        mostrar_dados(dados)
    }
}

exibir_dados()