function validarCampo(campo) {
  const erroElemento = campo.parentElement.querySelector(".erro");
  campo.classList.remove("invalido");
  erroElemento.textContent = "";

  if (!campo.checkValidity()) {
    campo.classList.add("invalido");

    if (campo.validity.valueMissing) {
      erroElemento.textContent = "Este campo é obrigatório.";
    } else if (campo.validity.tooShort) {
      erroElemento.textContent = `Mínimo de ${campo.minLength} caracteres.`;
    } else if (campo.validity.tooLong) {
      erroElemento.textContent = `Máximo de ${campo.maxLength} caracteres.`;
    }

    return false;
  }

  return true;
}

valores_dados = {
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
}

foco_campo = function (elemento) {
  elemento_pai = elemento.parentNode
  elemento_informacao = elemento_pai.getElementsByClassName('oculto')[0]

  if (elemento_informacao != undefined) {
    elemento_informacao.classList.remove('oculto')
  }
}

document.querySelectorAll('.lista-suspensa-container').forEach(container => {
  const input = container.querySelector('.lista-suspensa-input');
  const lista = container.querySelector('.lista-suspensa-opcoes');

  input.addEventListener('focus', () => {
    lista.classList.remove('lista-oculta');
  });

  input.addEventListener('input', () => {
    const termo = input.value.toLowerCase();
    lista.querySelectorAll('li').forEach(item => {
      const texto = item.textContent.toLowerCase();
      item.style.display = texto.includes(termo) ? 'block' : 'none';
    });
  });

  lista.querySelectorAll('li').forEach(opcao => {
    opcao.addEventListener('click', () => {
      input.value = opcao.textContent;
      input.dataset.valor = opcao.dataset.valor;
      lista.classList.add('lista-oculta');
    });
  });

  // Fecha se clicar fora
  document.addEventListener('click', e => {
    if (!container.contains(e.target)) {
      lista.classList.add('lista-oculta');
    }
  });
});
