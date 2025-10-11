valores_dados = {
    id:null,
    nome: null,
    descricao:null,
    id_categoria:null,
    id_moeda: null,
    id_marca:null,
    id_cores:null,
    id_unidade_medida:null,
    id_grupo:null,
    preco_compra: null,
    preco_venda: null
}

function campos_onchange(propriedade, elemento) {
    valores_dados[propriedade] = elemento.value;
}

function selecionar_item(elemento, id) {
    valores_dados[id] = parseInt(elemento.dataset.id)
    esconder_informacao(elemento)
}
function esconder_informacao(elemento) {
    let elemento_pai = elemento.parentNode
    elemento_pai = elemento_pai.parentNode
    if (elemento_pai != undefined) {
        elemento_pai.classList.add('esconder')
    }
}

async function focar_campo(elemento,minha_funcao) {
    desfocar_campo()
    elemento_pai = elemento.parentNode;
    elemento_informacao = elemento_pai.getElementsByClassName('esconder')[0]
    if (elemento_informacao != undefined) {
        elemento_informacao.classList.remove('esconder')
    }
    
    await minha_funcao(elemento)
}
function desfocar_campo() {
    elemento_informacao = document.querySelectorAll(".informacao-lista")
    elemento_informacao.forEach(elemento => {
        if(elemento.classList.contains("esconder") != true) {
            elemento.classList.add("esconder")
        }
    })
}
function erro_buscar(elemento,mensagem) {
    info = document.getElementById(elemento);
    lista = document.createElement("ul");
    lista_item = document.createElement("li");
    span_item = document.createElement("span");
    span_item.innerHTML = mensagem;
    lista_item.appendChild(span_item);
    lista.appendChild(lista_item);
    info.appendChild(lista);
}
async function buscar_informacao_categorias(elemento) {
    try {
        info_categorias = document.getElementById("info_categorias")
        info_categorias.innerHTML = "";
        animacaoCarregar(elemento)
        requisicao = await fetch(`${API_HOST}/categorias`,{
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

                lista_item.onclick = function(event) {
                    selecionar_item(event.currentTarget, 'id_categoria')
                    adicionar_item_campo(elemento,item.nome)
                }
                lista.appendChild(lista_item)
            })
            info_categorias.appendChild(lista)
        }
    } catch (erro) {
        animacaoCarregar(elemento,false)
        erro_buscar("info_categorias","Nenhum grupo encontrado...")
    }
}
async function buscar_informacao_grupos(elemento) {
    try {
        info_grupos = document.getElementById("info_grupos")
        info_grupos.innerHTML = ""
        animacaoCarregar(elemento)
        requisicao = await fetch(`${API_HOST}/grupos`,{
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
                return item.nome != null
            }).forEach(item => {
                    lista_item = document.createElement("li")
                    lista_item.dataset.id = item.id
                    span_item = document.createElement("span")
                    span_item.innerHTML = item.nome
                    lista_item.appendChild(span_item)

                    lista_item.onclick = function(event) {
                        selecionar_item(event.currentTarget, 'id_grupo')
                        adicionar_item_campo(elemento,item.nome)
                    }
                    lista.appendChild(lista_item)
                })
                info_grupos.appendChild(lista)
        } 
    } catch (erro) {
        animacaoCarregar(elemento,false)
        erro_buscar("info_grupos","Nenhum grupo encontrado...")
    }
}
async function buscar_informacao_marca(elemento) {
    try {
        info_marca = document.getElementById("info_marca")
        info_marca.innerHTML = ""
        animacaoCarregar(elemento);
        requisicao = await fetch(`${API_HOST}/marca`, {
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

                lista_item.onclick = function(event) {
                    selecionar_item(event.currentTarget, 'id_marca')
                    adicionar_item_campo(elemento,item.nome)
                }
                lista.appendChild(lista_item)
            })
            info_marca.appendChild(lista)
        }
    } catch (erro) {
        animacaoCarregar(elemento,false)
        erro_buscar("info_marca"," Nenhuma marca encontrada...")
    }
}
async function buscar_informacao_moedas(elemento) {
    try {
        info_moedas = document.getElementById("info_moedas");
        info_moedas.innerHTML = ""

        animacaoCarregar(elemento)
        requisicao = await fetch(`${API_HOST}/moedas`, {
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

                lista_item.onclick = function(event) {
                    selecionar_item(event.currentTarget, 'id_moeda')
                    adicionar_item_campo(elemento,item.nome)
                }
                lista.appendChild(lista_item)
            })
            info_moedas.appendChild(lista)
        }
    } catch {
        animacaoCarregar(elemento,false)
        erro_buscar("info_moedas", "Nenhuma moeda encontrada...")
    }
}
async function buscar_informacao_medidas(elemento) {
    try {
        info_medidas = document.getElementById("info_medidas");
        info_medidas.innerHTML = "";
        animacaoCarregar(elemento)
        requisicao = await fetch (`${API_HOST}/medidas`,{
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
        erro_buscar("info_medidas", "Nenhuma medida encontrada...")
    }
}
async function buscar_informacao_cores(elemento) {
    try {
        info_cores = document.getElementById("info_cores");
        info_cores.innerHTML = "";
        animacaoCarregar(elemento)
        requisicao = await fetch(`${API_HOST}/cores`,{
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

                lista_item.onclick = function(event) {
                    selecionar_item(event.currentTarget, "id_cores")
                    adicionar_item_campo(elemento,item.hexadecimal)
                }
                lista.appendChild(lista_item)
            })
            info_cores.appendChild(lista);
        }
    } catch {
        animacaoCarregar(elemento,false)
        erro_buscar("info_cores","Nenhuma cor encontrada...")
    }
}
function animacaoCarregar(elemento, chave = true) {
    elemento_div = elemento.parentNode;
    indice_array = elemento_div.children.length > 2 ? 2 : 0
    elemento_selecionado = elemento_div.children[indice_array].classList.contains('informacao-lista') ?  elemento_div.getElementsByClassName('informacao-lista')[0] : elemento_div;
    elemento_animado = document.createElement('div');
    elemento_animado.classList.add('elemento_animado');
    if (chave == true) {
        if (indice_array == 0) {
            elemento_animado.classList.remove('elemento_animado');
            elemento_animado.classList.add('elemento_animado_grande')
            elemento_animado.classList.add('carregando')
        }
        animacao = document.createElement('img');
        animacao.src = '../../../../imagens/loading.png';
        animacao.classList.add('animar')
        elemento_animado.appendChild(animacao);
        elemento_selecionado.appendChild(elemento_animado);
    } else {
        elemento_animado = indice_array == 0 ? document.getElementsByClassName("elemento_animado_grande")[0] : document.getElementsByClassName("elemento_animado")[0] ;
        elemento_animado.remove();
    }
}
function adicionar_item_campo(elemento,valor) {
    elemento.value = valor
}
async function salvar() {
    url = window.location.search
    if (url) {
        urlQuebrada = new URLSearchParams(url)
        if(urlQuebrada.get("id")) {
            parametro = urlQuebrada.get("id")
        } else {
            parametro = valores_dados.id
        }
    } else {
        parametro = valores_dados.id
    }
    const acao = parametro != null ? "ALTERAR" : "INCLUIR";
    tela_inteira = document.getElementById("tabela");
    animacaoCarregar(tela_inteira)
    endpoint = `${API_HOST}/fornecedores/victor`

    if(acao == "ALTERAR") {
        endpoint += `/${parametro}`
    }
    requisicao = await fetch (endpoint,{
        method: acao == "INCLUIR" ? "POST" : "PUT",
        headers: {
            "Accept": "application/json",
            "Content-type":"application/json"
        },
        body: JSON.stringify(valores_dados)
    })
    if(requisicao.ok == true) {
        setTimeout(()=> {
            animacaoCarregar(tela_inteira,false)
            window.location.href = './lista_produto.html'
        },3000);
    }
}
function campo_dados(elemento,valor){
    document.getElementById(elemento).value = valor || "";
}
async function exibir_dados() {
    url = window.location.search;
    if(url) {
        tela_inteira = document.getElementById("tabela");
        urlQuebrada = new URLSearchParams(url)

        id = urlQuebrada.get("id")
        animacaoCarregar(tela_inteira)
        endpoint = `${API_HOST}/fornecedores/victor/` + id

        requisicao = await fetch (endpoint,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type":"application/json"
            }
        })
        animacaoCarregar(tela_inteira,false)
        if(requisicao.ok == true) {
            lista = await requisicao.json()
            valores = lista.data[0]
            valores_dados = {
                id:valores.id,
                nome: valores.nome,
                descricao:valores.descricao,
                id_categoria:valores.id_categoria,
                id_moeda: valores.id_moeda,
                id_marca:valores.id_marca,
                id_cores:valores.id_cores,
                id_unidade_medida:valores.id_unidade_medida,
                id_grupo:valores.id_grupo,
                preco_compra: valores.preco_compra,
                preco_venda: valores.preco_venda
            }
            campo_dados("name",valores.nome);
            campo_dados("moeda",valores.nome_moeda);
            campo_dados("compra",valores.preco_compra);
            campo_dados("venda",valores.preco_venda);
            campo_dados("grupo",valores.nome_grupo);
            campo_dados("categoria",valores.nome_categoria);
            campo_dados("medida",valores.nome_medida);
            campo_dados("marca",valores.nome_marca);
            campo_dados("cor",valores.hexadecimal);
            campo_dados("desc",valores.descricao);
        }
    }
}

exibir_dados()