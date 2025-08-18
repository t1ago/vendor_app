valores_dados = {
    id_fornecedor:null,
    nome: null,
    id_moeda: null,
    preco_compra: null,
    preco_venda: null,
    id_grupo:null,
    id_categoria:null,
    id_unidade_medida:null,
    id_marca:null,
    id_cores:null,
    descricao:null
}

function salvar() {
    console.log(valores_dados)
}
function campos_onchange(propriedade, elemento) {
    valores_dados[propriedade] = elemento.value;
}

function selecionar_item(elemento, id) {
    valores_dados[id] = parseInt(elemento.dataset.id)
    esconder_informacao(elemento)
    console.log(valores_dados)
}

function desfocar_campo(elemento) {
    if (elemento.isTrusted != true) {
        console.log('funcionou')
        elemento_pai = elemento.parentNode;
        elemento_fechado = elemento_pai.getElementsByClassName("informacao-lista")[0];
        elemento_fechado.classList.add('esconder');
    }
}

function esconder_informacao(elemento) {
    let elemento_pai = elemento.parentNode
    elemento_pai = elemento_pai.parentNode
    if (elemento_pai != undefined) {
        elemento_pai.classList.add('esconder')
    }
}

async function focar_campo(elemento,minha_funcao) {
    elemento_pai = elemento.parentNode;
    elemento_informacao = elemento_pai.getElementsByClassName('esconder')[0]
    if (elemento_informacao != undefined) {
        elemento_informacao.classList.remove('esconder')
    }
    
    await minha_funcao(elemento)
}

async function buscar_informacao_categorias(elemento) {
    try {
        info_categorias = document.getElementById("info_categorias")
        info_categorias.innerHTML = "";
        animacaoCarregar(elemento)
        requisicao = await fetch(`http://localhost:3000/categorias`,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        animacaoCarregar(elemento,false)
        if (requisicao.ok ==true) {
            lista = document.createElement("ul")
            lista_categorias = await requisicao.json()
            lista_categorias.data.filter(item => 
                {return item.nome != null
            }).forEach(item => {
                lista_item = document.createElement("li")
                lista_item.dataset.id = item.id
                span_item = document.createElement("span")
                span_item.innerHTML = item.nome
                lista_item.appendChild(span_item)

                lista_item.onclick = function() {
                    selecionar_item(lista_item, 'id_categoria')
                    adicionar_item_campo(elemento,item.nome)
                }
                lista.appendChild(lista_item)
            })
            info_categorias.appendChild(lista)
        }
    } catch (erro) {
        animacaoCarregar(elemento,false)
        lista = document.createElement("ul");
        lista_item = document.createElement("li");
        span_item = document.createElement("span");
        span_item.innerHTML = "Nenhum grupo encontrado...";
        lista_item.appendChild(span_item);
        lista.appendChild(lista_item);
        info_categorias.appendChild(lista);
    }
}
async function buscar_informacao_grupos(elemento) {
    try {
        info_grupos = document.getElementById("info_grupos")
        info_grupos.innerHTML = ""
        animacaoCarregar(elemento)
        requisicao = await fetch(`http://localhost:3000/grupos`,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        animacaoCarregar(elemento,false)
        if(requisicao.ok == true) {
            lista = document.createElement("ul")
            listas_grupos = await requisicao.json()
            listas_grupos.data.filter(item => {
                return item.nome != null}).forEach(item => {
                    lista_item = document.createElement("li")
                    lista_item.dataset.id = item.id
                    span_item = document.createElement("span")
                    span_item.innerHTML = item.nome
                    lista_item.appendChild(span_item)

                    lista_item.onclick = function() {
                        selecionar_item(lista_item, 'id_categoria')
                        adicionar_item_campo(elemento,item.nome)
                    }
                    lista.appendChild(lista_item)
                })
                info_grupos.appendChild(lista)
        } 
    } catch (erro) {
        animacaoCarregar(elemento,false)
        lista = document.createElement("ul");
        lista_item = document.createElement("li");
        span_item = document.createElement("span");
        span_item.innerHTML = "Nenhum grupo encontrado...";
        lista_item.appendChild(span_item);
        lista.appendChild(lista_item);
        info_grupos.appendChild(lista);
    }
}
async function buscar_informacao_marca(elemento) {
    try {
        info_marca = document.getElementById("info_marca")
        info_marca.innerHTML = ""
        animacaoCarregar(elemento);
        requisicao = await fetch(`http://localhost:3000/marca`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        animacaoCarregar(elemento,false)
        if (requisicao.ok == true) {
            lista = document.createElement("ul")
            listas_marcas = await requisicao.json()
            listas_marcas.data.filter(item => {
                return item.nome != null
            }).forEach(item => {
                lista_item = document.createElement("li")
                lista_item.dataset.id = item.id
                span_item = document.createElement("span")
                span_item.innerHTML = item.nome
                lista_item.appendChild(span_item)

                lista_item.onclick = function() {
                    selecionar_item(lista_item, 'id_marca')
                    adicionar_item_campo(elemento,item.nome)
                }
                lista.appendChild(lista_item)
            })
            info_marca.appendChild(lista)
        }
    } catch (erro) {
        animacaoCarregar(elemento,false)
        lista = document.createElement("ul");
        lista_item = document.createElement("li");
        span_item = document.createElement("span");
        span_item.innerHTML = "Nenhuma marca encontrada...";
        lista_item.appendChild(span_item);
        lista.appendChild(lista_item);
        info_marca.appendChild(lista);
    }
}
async function buscar_informacao_moedas(elemento) {
    try {
        info_moedas = document.getElementById("info_moedas");
        info_moedas.innerHTML = ""
        animacaoCarregar(elemento)
        requisicao = await fetch('http://localhost:3000/moedas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        animacaoCarregar(elemento,false)
        if(requisicao.ok == true) {
            lista = document.createElement("ul");
            listas_moedas = await requisicao.json()
            listas_moedas.data.filter(item => {
                return item.nome != null
            }).forEach(item => {
                lista_item = document.createElement("li");
                lista_item.dataset.id = item.id;
                span_item = document.createElement("span");
                span_item.innerHTML = item.nome;
                lista_item.appendChild(span_item);

                lista_item.onclick = function() {
                    selecionar_item(lista_item, 'id_moeda')
                    adicionar_item_campo(elemento,item.nome)
                }
                lista.appendChild(lista_item)
            })
            info_moedas.appendChild(lista)
        }
    } catch {
        animacaoCarregar(elemento,false)
        lista = document.createElement("ul");
        lista_item = document.createElement("li");
        span_item = document.createElement("span");
        span_item.innerHTML = "Nenhuma moeda encontrada...";
        lista_item.appendChild(span_item);
        lista.appendChild(lista_item);
        info_moedas.appendChild(lista);
    }
}
async function buscar_informacao_medidas(elemento) {
    try {
        info_medidas = document.getElementById("info_medidas");
        info_medidas.innerHTML = "";
        animacaoCarregar(elemento)
        requisicao = await fetch ('http://localhost:3000/medidas',{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content_type':'application/json'
            }
        })
        animacaoCarregar(elemento,false)
        if(requisicao.ok == true) {
            lista = document.createElement("ul");
            listas_medidas = await requisicao.json();
            listas_medidas.data.filter(item => {
                return item.nome != null
            }).forEach(item => {
                lista_item = document.createElement("li");
                lista_item.dataset.id = item.id;
                span_item = document.createElement("span");
                span_item.innerHTML = item.nome;
                lista_item.appendChild(span_item);

                lista_item.onclick = function() {
                    selecionar_item(lista_item, 'id_unidade_medida')
                    adicionar_item_campo(elemento,item.nome)
                }
                lista.appendChild(lista_item)
            })
            info_medidas.appendChild(lista);
        }
    } catch {
        animacaoCarregar(elemento,false)
        lista = document.createElement("ul");
        lista_item = document.createElement("li");
        span_item = document.createElement("span");
        span_item.innerHTML = "Nenhuma medida encontrada...";
        lista_item.appendChild(span_item);
        lista.appendChild(lista_item);
        info_medidas.appendChild(lista);
    }
}
async function buscar_informacao_cores(elemento) {
    try {
        info_cores = document.getElementById("info_cores");
        info_cores.innerHTML = "";
        animacaoCarregar(elemento)
        requisicao = await fetch('http://localhost:3000/cores',{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content_type':'application/json'
            }
        })
        animacaoCarregar(elemento,false)
        if(requisicao.ok == true) {
            lista = document.createElement("ul");
            listas_cores = await requisicao.json();
            listas_cores.data.filter(item => {
                return item.hexadecimal != null
            }).forEach(item => {
                lista_item = document.createElement("li");
                lista_item.dataset.id = item.id;
                span_item = document.createElement("span");
                span_item.innerHTML = item.hexadecimal;
                lista_item.appendChild(span_item);

                lista_item.onclick = function() {
                    selecionar_item(lista_item, 'id_cor')
                    adicionar_item_campo(elemento,item.hexadecimal)
                }
                lista.appendChild(lista_item)
            })
            info_cores.appendChild(lista);
        }
    } catch {
        animacaoCarregar(elemento,false)
        lista = document.createElement("ul");
        lista_item = document.createElement("li");
        span_item = document.createElement("span");
        span_item.innerHTML = "Nenhuma cor encontrada...";
        lista_item.appendChild(span_item);
        lista.appendChild(lista_item);
        info_cores.appendChild(lista);
    }
}
function animacaoCarregar(elemento, chave = true) {
    elemento_div = elemento.parentNode;
    elemento_selecionado = elemento_div.getElementsByClassName('informacao-lista')[0];
    elemento_animado = document.createElement('div');
    elemento_animado.classList.add('elemento_animado');
    if (chave == true) {
        animacao = document.createElement('img');
        animacao.src = '../../../../imagens/loading.png';
        animacao.classList.add('animar')
        elemento_animado.appendChild(animacao);
        elemento_selecionado.appendChild(elemento_animado);
    } else {
        elemento_animado = document.getElementsByClassName("elemento_animado")[0];
        elemento_animado.remove();
    } 
}
function adicionar_item_campo(elemento,valor) {
    elemento.value = valor
}
async function criar_fornecedor() {
    await fetch ('http://localhost:3000/fornecedor/victor')
}