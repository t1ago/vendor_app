API_HOST = 'http://127.0.0.1:3000'

campo_id = document.getElementById("id")
campo_nome = document.getElementById("nome")
campo_moeda = document.getElementById("moeda")
mensagemmoeda = document.getElementById("mensagemmoeda")
mensagemnome = document.getElementById("mensagemnome")


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
       
        campo_id.value = resposta.id || (resposta.data ? resposta.data.id : '')
       
    } else {
        // Tratar erro de POST
        console.error("Erro ao cadastrar moeda:", requisicao.status)
    }

    if (campo_moeda.validity.tooLong == true) {
        mensagemmoeda.innerHTML = "Máximo de 64 letras"
        return false
    }

    return false
}

async function alterandomoedas() {
    let moeda_alterada = {
        id: campo_id.value, 
        nome: campo_nome.value,
        moeda: campo_moeda.value
    }

    let requisicao = await fetch(`${API_HOST}/moedas/${moeda_alterada.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moeda_alterada)
    })

    if (requisicao.ok) {
        // Sucesso na alteração
        console.log("Moeda alterada com sucesso!")
    } else {
        // Tratar erro de PUT
        console.error("Erro ao alterar moeda:", requisicao.status)
    }

    if (campo_nome.validity.tooLong == true) {
        mensagemnome.innerHTML = "Máximo de 64 letras"
        return false
    }
    return true

}


function botao_salvar() {
    
    if (campo_id.value == "" || campo_id.value == null) {
      
        cadastromoedas()
    } else {
       
        alterandomoedas()
    }
   
    window.location.href = "lista_moeda.html"
}

async function exibirdados() {
    let parametros = window.location.search
    if (parametros) {
        let parametrosquebrado = new URLSearchParams(parametros)
        let parametrosid = parametrosquebrado.get("id")
        
       
        campo_id.value = parametrosid || "" 

        if (parametrosid) {
            let requisicao = await fetch(`${API_HOST}/moedas?id=${parametrosid}`)

            if (requisicao.ok) {
                let localizado = await requisicao.json()
                let moeda = localizado.data[0]
                
                campo_id.value = parametrosid; 
                campo_nome.value = moeda.nome || "";
                campo_moeda.value = moeda.moeda || "";
            }
        }
    }
}

dados()
