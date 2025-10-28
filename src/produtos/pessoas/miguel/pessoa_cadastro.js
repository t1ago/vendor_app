// pegando dados do document HTML
const tipoPF = document.getElementById("tipo_pessoaF")
const tipoPJ = document.getElementById("tipo_pessoaJ")

const preencherform = (endereco) => {

    document.getElementById("logradouro").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;

}

const cepvalido = (cep) => {

    const cepNumeros = cep.replace(/\D/g, '');
    return cepNumeros.length === 8;
};

const pesquisarcep = async function () {

    const cep = document.getElementById("cep").value
    const url = `http://viacep.com.br/ws/${cep}/json/`

    if (cepvalido(cep)) {

        const dados = await fetch(url)
        const endereco = await dados.json()

        if (endereco.hasOwnProperty('erro')) {

            document.getElementById('logradouro').value = 'Cep nao achado'

        } else {
            preencherform(endereco)
        }
    }
};

document.getElementById('cep')
    .addEventListener('focusout', pesquisarcep);

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

    function mostrarDiv(id) {
        document.getElementById(id).style.display = 'block';
    }

    function esconderDiv(id) {
        document.getElementById(id).style.display = 'none';
    }

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

        mostrarDiv("div-federal")
        mostrarDiv("div-estadual")

        esconderDiv("div-cnpj")
        esconderDiv("div-inscricao")

        endereco_input()

    } if (PJ) {

        divsexo.style.display = "none";
        dividade.style.display = "none";
        divvinculo.style.display = "none";

        mostrarDiv("div-cnpj")
        mostrarDiv("div-inscricao")

        esconderDiv("div-federal")
        esconderDiv("div-estadual")

        cadastro_input()
        endereco_input()
    }

};

const cadastro_input = function () {

    const inputs = document.querySelectorAll("#cadastro_section input");

    inputs.forEach(input => {
        input.value = ''
    });
};


const endereco_input = function () {

    const inputs = document.querySelectorAll("#endereco-section input");

    inputs.forEach(input => {
        input.value = ''
    });

};

// ao alterar o estado dos elementos "Change", chama a function Verificacao_pessoa
tipoPF.addEventListener("change", Verificacao_pessoa)
tipoPJ.addEventListener("change", Verificacao_pessoa)

Verificacao_pessoa()


const endereco_entrada = function () {
    const botao = document.getElementById("button-address");
    const botao_cancel = document.getElementById("button-cancel");
    const campos_info = document.getElementById("endereco-section");
    const loader = document.getElementById("loader-endereco");

    botao.addEventListener("click", function () {
        botao.style.display = "none";
        loader.style.display = "block";

        setTimeout(() => {

            loader.style.display = "none";
            botao_cancel.style.display = "block"
            campos_info.classList.remove("hidden");
        }, 1000);
    });
};

endereco_entrada();
endereco_entrada()

const endereco_remove = function () {

    const botao = document.getElementById("button-address");
    const botao_cancel = document.getElementById("button-cancel");
    const loader = document.getElementById("loader-endereco");
    const campo = document.getElementById("endereco-section");

    botao_cancel.addEventListener("click", function () {
        botao_cancel.style.display = "none"

        loader.style.display = "block"
        campo.classList.add("hidden")

        setTimeout(() => {

            loader.style.display = "none"
            botao.style.display = "block"
        }, 1000);

        endereco_input()

    });
}

endereco_remove()

