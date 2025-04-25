campo_id = document.getElementById("id")
campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")

botao_salvar_click = function() {
    if (window.localStorage.getItem("moeda") == null){
        window.localStorage.setItem("moeda","[]")
    }

    document.getElementById('cancelar').addEventListener('click', function() {
        if (confirm('Tem certeza que deseja cancelar?')) {
          // Se a pessoa confirmar, você pode limpar o formulário ou redirecionar
          window.location.reload(); // exemplo: recarrega a página
        }
      });
    moedas = window.localStorage.getItem("moeda")
    listasmoedas = JSON.parse(moedas)
    moeda ={
        'id' : null,
        'moeda': campo_moeda.value,
        'nome': campo_nome.value
    }
    if (listasmoedas.length == 0){
        moeda.id = 1
    }
    listasmoedas.push(moeda)
    moedas = JSON.stringify(listasmoedas)
    window.localStorage.setItem("moeda", moedas)
}