campo_id = document.getElementById("id")
campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")

async function cadastromoedas() {
    let moeda = {
        nome: campo_nome.value,
        moeda: campo_moeda.value
    }

    let requisicao = await fetch("http://localhost:3000/moedas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moeda)
    })

    if (requisicao.ok) {
        let resposta = await requisicao.json()
        campo_id.value = resposta.id 
    } else {
     
    }
}

async function alterandomoedas() {
    let moeda = {
        nome: campo_nome.value,
        moeda: campo_moeda.value
    }

    let requisicao = await fetch(`http://localhost:3000/moedas/${campo_id.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moeda)
    })

    if (requisicao.ok) {
        let resposta = await requisicao.json()
    } else {
    }
}

function botao_salvar() {
    if (campo_id.value == "" || campo_id.value == null) {
        cadastromoedas()
    } else {
        alterandomoedas()
    }
    window.location.href = "lista_moeda.html"
}

async function dados() {
    let parametros = window.location.search
    if (parametros) {
        let parametrosquebrado = new URLSearchParams(parametros)
        let parametrosid = parametrosquebrado.get("id")

        if (parametrosid) {
            let requisicao = await fetch(`http://localhost:3000/moedas/${parametrosid}`)
            if (requisicao.ok) {
                let localizado = await requisicao.json()
                campo_id.value = localizado.id
                campo_nome.value = localizado.nome
                campo_moeda.value = localizado.moeda
            }
        }
    }
}
// Excluir moeda
button_excluir.onclick = async function () {
    await fetch(`http://localhost:3000/moedas/${item.id}`, {
        method: "DELETE"
    });
    carregarMoedas(); // função que atualiza a lista
}