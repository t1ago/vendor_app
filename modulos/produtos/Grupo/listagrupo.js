campo_grupo = document.getElementById("idgrupo")

function abrirCadastro() {
    window.location.href = "telagrupo.html"
}

function botaovoltar() {
    window.location.href = "../../../index.html"
}

function carregarGrupo() {

    const Tabela = document.getElementById("tabeladado")
    Tabela.innerHTML = "";

    let grupo = localStorage.getItem("grupo")

    if (grupo) {
        let listagrupo = JSON.parse(grupo)

        listagrupo.forEach(function (item) {
            const linha = document.createElement("tr")
            const coluna_nome = document.createElement("td")
            const coluna_acoes = document.createElement("td")
            const span_nome = document.createElement("span")
            const button_editar = document.createElement("button")
            const button_excluir = document.createElement("button")


            span_nome.innerHTML = item.nome

            button_editar.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/4226/4226577.png" alt="Editar" style="width:100%;height:18px;vertical-align:middle;border:none;padding:0;margin:0;" />';
            button_editar.style.backgroundColor = "white";
            button_editar.style.border = "none";
            button_editar.style.padding = "5px 10px";
            button_editar.style.marginRight = "8px";
            button_editar.style.borderRadius = "4px";


            button_editar.onclick = function () {
                window.location.href = "telagrupo.html?id=" + item.id

            }

            button_excluir.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="Excluir" style="width:100%;height:18px;vertical-align:middle;border:none;padding:0;margin:0;" />';
            button_excluir.style.backgroundColor = "white"
            button_excluir.style.color = "#fff"
            button_excluir.style.border = "none"
            button_excluir.style.padding = "5px 10px"
            button_excluir.style.marginLeft = "8px"
            button_excluir.style.borderRadius = "4px"

            
            button_excluir.onclick = function () {
                let grupo = localStorage.getItem("grupo")
                let listagrupo = JSON.parse(grupo)

                let indice = listagrupo.findIndex(function (value, index, obj) {
                    return value.id == item.id
                })

                listagrupo.splice(indice, 1)

                let grupo_asalvar = JSON.stringify(listagrupo)
                window.localStorage.setItem('grupo', grupo_asalvar)

                carregarGrupo()
            }
            Tabela.appendChild(linha);
            linha.appendChild(coluna_nome);
            linha.appendChild(coluna_acoes);
            coluna_nome.appendChild(span_nome);
            coluna_acoes.appendChild(button_editar)
            coluna_acoes.appendChild(button_excluir)
        })

    }
}

carregarGrupo()