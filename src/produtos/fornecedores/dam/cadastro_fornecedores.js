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
    const infos = document.getElementsByClassName('informacao-consulta');

    Array.from(infos).forEach(item => {
      item.classList.add('lista-oculta');
      });
  };
}

document.addEventListener("click", clique_geral);

async function foco_campo(elemento, minha_funcao, endereco) {
  elemento_focado = elemento;
  nova_selecao = true;

  const elemento_pai = elemento.parentNode;
  const elemento_informacao = elemento_pai.getElementsByClassName('lista-oculta')[0]

  if (elemento_informacao != undefined) {
    elemento_informacao.classList.remove('lista-oculta');
  }

  await minha_funcao(elemento, endereco);
}

function selecionar_item(elemento, id) {
  const valor = parseInt(elemento.dataset.id);
  valores_dados[id] = valor;
  esconder_informacao(elemento);
}


function esconder_informacao(elemento) {
  let elemento_pai = elemento.parentNode;
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

async function buscarAPI(elemento, endereco) {
  elemento_pai = elemento.parentNode

  info_div = elemento_pai.getElementsByTagName("div") [0]
  carregar_dados(info_div);

  try {
    requisicao = await fetch(`${API_HOST}/${endereco}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (requisicao.ok == true) {
      carregar_dados(info_div, false);

      dados = await requisicao.json();

      infos = {
        campo_id: null,
        campo_nome: null,
        campo_salvar: null
      }
      
      switch (endereco) {
        case 'categorias': 
          infos.campo_id = 'id'
          infos.campo_nome = 'nome'
          infos.campo_salvar = 'id_categoria'
          break;
        case 'moedas': 
          infos.campo_id = 'id'
          infos.campo_nome = 'nome'
          infos.campo_salvar = 'id_moeda'
          break;
        case 'grupos':
          infos.campo_id = 'id'
          infos.campo_nome = 'nome'
          infos.campo_salvar = 'id_grupo'
          break;
        case 'medidas':
          infos.campo_id = 'id'
          infos.campo_nome = 'nome'
          infos.campo_salvar = 'id_unidade_medida'
          break;
        case 'marca':
          infos.campo_id = 'id'
          infos.campo_nome = 'nome'
          infos.campo_salvar = 'id_marca'
          break;
        case 'cores':
          infos.campo_id = 'id'
          infos.campo_nome = 'hexadecimal'
          infos.campo_salvar = 'id_cor'
          break;
        default:
      }

      criar_lista_informacao(
        dados,
        infos.campo_nome,
        infos.campo_id,
        infos.campo_salvar,
        elemento,
        info_div
      );
    } else {
      carregar_dados(info_div, false);
      exibir_informacao_falha(info_div, 'Nenhuma informação localizada');
    }
  } catch (erro) {
    carregar_dados(info_div, false);
    exibir_informacao_falha(info_div, 'Nenhuma informação localizada');
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

function criar_lista_informacao(
  dados,
  campo_nome,
  campo_id,
  campo_salvar,
  elemento_salvar,
  container
) {
    const lista_ul = document.createElement('ul');
    const lista_dados = dados;

    lista_dados.data.filter(item => {
        return item[campo_nome] != null;
    }).forEach(item => {
        const lista_li = document.createElement('li');
        lista_li.dataset.id = item[campo_id];

        const span = document.createElement('span');
        span.innerHTML = item[campo_nome];

        lista_li.appendChild(span)

        lista_li.onclick = function (event) {
          event.stopPropagation();
          selecionar_item(lista_li, campo_salvar);
          adicionar_valor_campo(elemento_salvar, item[campo_nome]);

          container.classList.add("lista-oculta");
        };

        lista_ul.appendChild(lista_li);
    });

    container.appendChild(lista_ul)
}

adicionar_valor_campo = function (elemento, valor) {
    elemento.value = valor
}