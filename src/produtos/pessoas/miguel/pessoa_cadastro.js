
// pegando dados do document HTML
const tipoPF = document.getElementById("tipo_pessoaF")
const tipoPJ = document.getElementById("tipo_pessoaJ")

function Verificacao_pessoa() {


    // checkagem se o botão for pressionado, tanto do PF, quanto do PJ    
    PF = tipoPF.checked
    PJ = tipoPJ.checked


    const botao = document.getElementById("button-address");
    const campos_info = document.getElementById("endereco-section")
    const botao_cancel = document.getElementById("button-cancel")

    // pegando dados do document HTML
    const divsexo = document.getElementById("div-sexo")
    const dividade = document.getElementById("div-idade")
    const divvinculo = document.getElementById("div-vinculo")

    const nome = document.getElementById("label-nome")
    const apelido = document.getElementById("label-apelido")

    const federal = document.getElementById("label-federal")
    const estadual = document.getElementById("label-estadual")


    if (!campos_info.classList.contains("hidden")) {

        campos_info.classList.add("hidden");

        botao.style.display = "block"
        botao_cancel.style.display = "none";
    }

    // Verificação do PF e PJ
    if (PF) {


        // Bloqueando na tela, as informações do PF
        divsexo.style.display = "block";
        dividade.style.display = "block";
        divvinculo.style.display = "block";

        nome.textContent = "Nome";
        apelido.textContent = "Apelido";

        federal.textContent = "RG";
        estadual.textContent = "CPF";

        campos_value()

    } if (PJ) {

        divsexo.style.display = "none";
        dividade.style.display = "none";
        divvinculo.style.display = "none";

        nome.textContent = "Nome Fantasia";
        apelido.textContent = "Razão social";

        federal.textContent = "CNPJ";
        estadual.textContent = "Inscrição estadual";

        campos_value()

    }
   
}


// ao alterar o estado dos elementos "Change", chama a function Verificacao_pessoa
tipoPF.addEventListener("change", Verificacao_pessoa)
tipoPJ.addEventListener("change", Verificacao_pessoa)

Verificacao_pessoa()


const endereco = function () {

    const botao = document.getElementById("button-address");
    const botao_cancel = document.getElementById("button-cancel");

    botao.addEventListener("click", function () {

        campos_info = document.getElementById("endereco-section")

        campos_info.classList.remove("hidden");

        botao.style.display = "none"
        botao_cancel.style.display = "block"
    });

}

endereco()

const campos_value = function () {

    const inputs = document.querySelectorAll("#endereco-section input");

    inputs.forEach(input => {
        input.value = ''
    });

    const input = document.querySelectorAll("#cadastro_section input");

    input.forEach(input => {
        input.value = ''
    });
}

const endereco_remove = function () {

    const botao = document.getElementById("button-address");
    const botao_cancel = document.getElementById("button-cancel");

    botao_cancel.addEventListener("click", function () {

        campo = document.getElementById("endereco-section")

        campo.classList.add("hidden")

        botao_cancel.style.display = "none"
        botao.style.display = "block"

        campos_value()

    });



}

endereco_remove()


