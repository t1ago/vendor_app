// CONFIG
const API_HOST = "http://127.0.0.1:3000";

// Valores selecionados no formulário
const valores = {
  id_fornecedor: null,
  nome: "",
  id_moeda: null,
  preco_compra: null,
  preco_venda: null,
  id_grupo: null,
  id_categoria: null,
  id_unidade_medida: null,
  id_marca: null,
  id_cor: null,
  descricao: "",
};

function clique_geral() {
  if (nova_selecao) {
    nova_selecao = false;
  } else {
    infos = document.getElementsByClassName('informacao-consulta');

    Array.from(infos).forEach(item => {
      if (item.classList.contains('lista-oculta') == false) {
        item.classList.add('lista-oculta');
      };
    });
  };
}

async function foco_campo(elemento, minha_funcao) {
  elemento_focado = elemento;
  nova_selecao = true;

  elemento_pai = elemento.parentNode;
  elemento_informacao = elemento_pai.getElementsByClassName('lista-oculta')[0]

  if (elemento_informacao != undefined) {
    elemento_informacao.classList.remove('lista-oculta');
  }

  await minha_funcao(elemento);
}

function esconder_informacao(elemento) {
  elemento_pai = elemento.parentNode;
  elemento_pai = elemento_pai.parentNode;

  if (elemento_pai != undefined) {
    elemento_pai.classList.add('lista-oculta');
  }
}

function carregar_dados (elemento, show = true) {
  elemento.innerHTML = '';
  if (show) {
    elemento.style.overflow = 'hidden';
    img = document.createElement('img');
    img.src = '../../../../imagens/loading.png';
    elemento.appendChild(img);
  } else {
    elemento.style.removeProperty('overflow');
  }
}

async function buscarAPI(elemento) {
  info_grupos = document.getElementById('info-grupos');
  carregar_dados(info_grupos);

  try {
    requisicao = await fetch(`${API_HOST}/categorias`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (requisicao.ok == true) {
      carregar_dados(info_grupos, false);

      dados = await requisicao.json();
      criar_lista_informacao(dados, 'nome', 'id', 'id_categoria', elemento, info_grupos);
    } else {
      carregar_dados(info_grupos, false);
      exibir_informacao_falha(info_grupos, 'Nenhuma informação localizada');
    }
  } catch (erro) {
    carregar_dados(info_categorias, false);
    exibir_informacao_falha(info_grupos, 'Nenhuma informação localizada');
  }
}

async function buscar_informacao_grupos(elemento) {
  info_grupos = document.getElementById('info-grupos')
  carregar_dados(info_grupos)

  try {
    requisicao = await fetch(`${API_HOST}/grupos`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (requisicao.ok == true) {
      carregar_dados(info_grupos, false);

      dados = await requisicao.json();
      criar_lista_informacao(dados, 'nome', 'id', 'id_grupo', elemento, info_grupos);
    } else {
      carregar_dados(info_categorias, false);
      exibir_informacao_falha(info_grupos, 'Nenhuma informação localizada.');
    }
  } catch (erro) {
    carregar_dados(info_categorias, false);
    exibir_informacao_falha(info_grupos, 'Nenhumma informação localizada.');
  }
}

function exibir_informacao_falha(elemento, mensagem) {
    lista = document.createElement('ul')
    lista_item = document.createElement('li')
    span_item = document.createElement('span')
    span_item.innerHTML = mensagem
    lista_item.appendChild(span_item)
    lista.appendChild(lista_item)
    elemento.appendChild(lista)
}

function criar_lista_informacao(dados, campo_nome, campo_id, campo_salvar, elemento_salvar, container) {
    lista_ul = document.createElement('ul')
    lista_dados = dados

    lista_dados.data.filter(item => {
        return item[campo_nome] != null
    }).forEach(item => {
        lista_li = document.createElement('li')
        lista_li.dataset.id = item[campo_id]

        span = document.createElement('span')
        span.innerHTML = item[campo_nome]

        lista_li.appendChild(span)

        lista_li.onclick = function () {
            selecionar_item(lista_li, campo_salvar)
            adicionar_valor_campo(elemento_salvar, item[campo_nome])
        }

        lista_ul.appendChild(lista_li)
    });

    container.appendChild(lista_ul)
}

adicionar_valor_campo = function (elemento, valor) {
    elemento.value = valor
}