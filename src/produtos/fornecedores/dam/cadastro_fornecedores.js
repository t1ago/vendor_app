// CONFIG
const API_HOST = "http://127.0.0.1:3000";

// Valores selecionados no formulário
const valores = {
  id_fornecedor: null,
  nome: null,
  id_moeda: null,
  preco_compra: null,
  preco_venda: null,
  id_grupo: null,
  id_categoria: null,
  id_unidade_medida: null,
  id_marca: null,
  id_cor: null,
  descricao: null,
};

elemento_focado = null
nova_selecao = false

function clique_geral() {
  if (nova_selecao) {
    nova_selecao = false;
  } else {
    const infos = document.getElementsByClassName('lista-suspensa');

    Array.from(infos).forEach(item => {
      if (item.classList.contains('lista-oculta') == false) {
        item.classList.add('lista-oculta');
      }});
  };
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("compra").value = "";
  document.getElementById("venda").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("moeda").value = "";
  document.getElementById("grupo").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("medida").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("cor").value = "";

  valores = {};
}

async function foco_campo(elemento, minha_funcao, endereco) {
  elemento_focado = elemento;
  nova_selecao = true;

  const elemento_pai = elemento.parentNode;
  const elemento_informacao = elemento_pai.querySelector('.lista-suspensa')

  if (elemento_informacao) {
    elemento_informacao.classList.remove('lista-oculta');
  }

  await minha_funcao(elemento, endereco);
}

function selecionar_item(elemento, id) {
  const valor = parseInt(elemento.dataset.id);
  valores[id] = valor;
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

  info_div = elemento_pai.querySelector(".lista-suspensa");
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

        lista_li.onclick = function () {
          selecionar_item(lista_li, campo_salvar);
          adicionar_valor_campo(elemento_salvar, item[campo_nome]);
        };

        lista_ul.appendChild(lista_li);
    });

    container.appendChild(lista_ul)
}

adicionar_valor_campo = function (elemento, valor) {
    elemento.value = valor
}

async function incluirFornecedor() {
  try{
    const requisicao = await fetch(`${API_HOST}/fornecedoresDam/salvar`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(valores)
    });

    if (requisicao.ok) {
      alert("Fornecedor incluído com sucesso!");
      limparFormulario();
    } else {
      alert ("Erro ao incluir fornecedor.");
    }
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

async function alterarFornecedor() {
  try {
    console.log(valores)
    const requisicao = await fetch (`${API_HOST}/fornecedoresDam/salvar`,{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(valores)
    });

    if (requisicao.ok) {
      alert("Fornecedor atualizado com sucesso!");
      limparFormulario();
    } else {
      alert("Erro ao atualizar fornecedor.")
    }
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

function salvarFornecedor() {
  if (valores.id_fornecedor == null) {
    incluirFornecedor();
  } else {
    alterarFornecedor();
  }
}

function voltar() {
  window.location.href = "../dam/lista_fornecedores.html"
}

async function exibirDados() {
  const campo_id = document.getElementById("id");
  const campo_nome = document.getElementById("nome");
  const campo_moeda = document.getElementById("moeda");
  const campo_preco_compra = document.getElementById("compra");
  const campo_preco_venda = document.getElementById("venda");
  const campo_grupo = document.getElementById("grupo");
  const campo_categoria = document.getElementById("categoria");
  const campo_unidade_medida = document.getElementById("medida");
  const campo_marca = document.getElementById("marca");
  const campo_cor = document.getElementById("cor");
  const campo_descricao = document.getElementById("descricao");

  const url_paramentros = window.location.search

  if (url_paramentros !== '') {
    const parametros = new URLSearchParams(url_paramentros);
    const parametro_id = parametros.get('id');

      const requisicao = await fetch(`${API_HOST}/fornecedoresDam/id/${parametro_id}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (requisicao.ok == true) {
        const resposta = await requisicao.json();
        const fornecedor = resposta.data[0];
        console.log(resposta.data[0]);

          campo_id.value = fornecedor.id;
          campo_nome.value = fornecedor.nome;
          campo_moeda.value = fornecedor.nome_moeda; 
          campo_preco_compra.value = fornecedor.preco_compra;
          campo_preco_venda.value = fornecedor.preco_venda;
          campo_grupo.value = fornecedor.nome_grupo;
          campo_categoria.value = fornecedor.nome_categoria;
          campo_unidade_medida.value = fornecedor.nome_unidade_medida;
          campo_marca.value = fornecedor.nome_marca;
          campo_cor.value = fornecedor.cor_hexadecimal;
          campo_descricao.value = fornecedor.descricao;
          console.log(fornecedor);

          valores.id_fornecedor = fornecedor.id;
          valores.nome = fornecedor.nome;
          valores.id_moeda = fornecedor.id_moeda; 
          valores.preco_compra = fornecedor.preco_compra;
          valores.preco_venda = fornecedor.preco_venda;
          valores.id_grupo = fornecedor.id_grupo;
          valores.id_categoria = fornecedor.id_categoria;
          valores.id_unidade_medida = fornecedor.id_unidade_medida;
          valores.id_marca = fornecedor.id_marca;
          valores.id_cor = fornecedor.id_cor;
          valores.descricao = fornecedor.descricao;

      } else {
        alert("Fornecedor não encontrado.")
      }
    }
  }

exibirDados();