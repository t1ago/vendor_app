function carregar_botao() {

    const x_endereco = document.getElementById("x_cancelar")
    const secao_botao = document.getElementById("button_address")
    const button_endereço = document.getElementById("button-address_btn")

    const formulario_endereco = document.getElementById("formulario-endereco")
    const secao_x = document.getElementById("button_x")

    if (button_endereço) {
        button_endereço.addEventListener("click", () => {
            formulario_endereco.classList.remove("hidden")
            secao_x.classList.remove("hidden")
            button_endereço.classList.add("hidden")
        })
    }

    if (x_endereco) {
        x_endereco.addEventListener("click", () => {
            formulario_endereco.classList.add("hidden")
            secao_botao.classList.remove("hidden")
            secao_x.classList.add("hidden")
            button_endereço.classList.remove("hidden")
        })
    }

}

carregar_botao()

window.addEventListener("load", () => {

    const formFisico = document.getElementById("formulario-fisico");
    const formJuridico = document.getElementById("formulario-juridico");
    const button_endereço = document.getElementById("button-address_btn")
    const formEndereco = document.getElementById("formulario-endereco")

    const btnPF = document.getElementById("btn_pf");
    const btnPJ = document.getElementById("btn_pj");

    const div_endereco = document.getElementById("button_address")
    const btn_geral = document.getElementById("button")

    const secao_x = document.getElementById("button_x")

    // Função para mostrar PF
    function mostrarPF() {
        formJuridico.classList.add("hidden");
        formFisico.classList.remove("hidden");
        btn_geral.classList.remove("hidden")        
        div_endereco.classList.remove("hidden");
        secao_x.classList.add("hidden")
        button_endereço.classList.remove("hidden")
        formEndereco.classList.add("hidden")

        // código que faz a url mostrar que mudou o tipo 
        history.replaceState({}, "", "?tipo=F");
        
    }

    // Função para mostrar PJ
    function mostrarPJ() {
        formFisico.classList.add("hidden");
        formJuridico.classList.remove("hidden");
        btn_geral.classList.remove("hidden");
        div_endereco.classList.remove("hidden");
        secao_x.classList.add("hidden")
        button_endereço.classList.remove("hidden")
        formEndereco.classList.add("hidden")

        // código que faz a url mostrar que mudou o tipo 
        history.replaceState({}, "", "?tipo=J");
    }

    // Eventos dos botões
    btnPF.addEventListener("click", mostrarPF);
    btnPJ.addEventListener("click", mostrarPJ);

    // Se já vier com tipo na URL, carregar correto
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");

    if (tipo === "F") {
        mostrarPF();
    } else if (tipo === "J") {
        mostrarPJ();
    }
});

