API_HOST = 'http://127.0.0.1:3000'

campo_id = document.getElementById("id")
campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")

async function cadastromoedas() {
    let moeda = {
        nome: campo_nome.value,
        moeda: campo_moeda.value
    }

    let requisicao = await fetch(`${API_HOST}/moedas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moeda)
    })

    if (requisicao.ok) {
        let resposta = await requisicao.json()
        campo_id.value = resposta.id
    } else {

    }
    cadastromoedas()
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
            let requisicao = await fetch(`${API_HOST}/moedas?id=${parametrosid}`)

            if (requisicao.ok) {
                let localizado = await requisicao.json()
                let moeda = localizado.data[0]

                // preencher campos com o que realmente existe
                
                document.getElementById("nome").value = moeda.nome || "";
                document.getElementById("moeda").value = moeda.moeda || "";
            }
        }
    }
}

dados()
