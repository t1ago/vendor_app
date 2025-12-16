const apiUrl = "http://127.0.0.1:3000/pessoa/miguel";

/* ===============================
   CAMPOS – PESSOA FÍSICA
================================= */
const campo_nome = document.getElementById("nome");
const campo_apelido = document.getElementById("apelido");
const campo_data_nascimento = document.getElementById("data_nascimento");
const campo_rg = document.getElementById("rg");
const campo_cpf = document.getElementById("cpf");

/* SEXO (RADIO) */
const sexoMasculino = document.getElementById("campo_sexo_m");
const sexoFeminino = document.getElementById("campo_sexo_f");

/* ATIVO PF */
const ativoPF_S = document.getElementById("ativoS");
const ativoPF_N = document.getElementById("ativoN");

/* VÍNCULO */
const campo_vinculo = document.getElementById("vinculo");

/* ===============================
   CAMPOS – PESSOA JURÍDICA
================================= */
const campo_razao = document.getElementById("social");
const campo_fantasia = document.getElementById("fantasia");
const campo_cnpj = document.getElementById("cnpj");
const campo_inscricao = document.getElementById("inscricao");

/* ATIVO PJ */
const ativoPJ_S = document.getElementById("ativo_s");
const ativoPJ_N = document.getElementById("ativo_n");

/* ===============================
   FORMULÁRIOS
================================= */
const formPF = document.getElementById("formulario-fisico");
const formPJ = document.getElementById("formulario-juridico");

/* ===============================
   ENDEREÇOS
================================= */
let enderecosParaSalvar = [];

const listaEnderecos = document.getElementById("lista-enderecos-temporarios");

/* ===============================
   PARAMS URL
================================= */
const params = new URLSearchParams(window.location.search);
const idPessoa = params.get("id");
const tipoPessoa = params.get("tipo");

/* ===============================
   AO CARREGAR
================================= */
document.addEventListener("DOMContentLoaded", () => {

    if (tipoPessoa === "F") {
        mostrarPF();
    }

    if (tipoPessoa === "J") {
        mostrarPJ();
    }

    if (idPessoa) {
        carregarPessoa(idPessoa);
    }
});

/* ===============================
   MOSTRAR FORMULÁRIOS
================================= */
function mostrarPF() {
    formPF.classList.remove("hidden");
    formPJ.classList.add("hidden");
}

function mostrarPJ() {
    formPJ.classList.remove("hidden");
    formPF.classList.add("hidden");
}

/* ===============================
   CARREGAR PESSOA (EDITAR)
================================= */
async function carregarPessoa(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const result = await response.json();

        if (!result.executado || !result.data.length) {
            alert("Pessoa não encontrada");
            return;
        }

        const p = result.data[0];

        /* ===== PF ===== */
        if (p.tipo_pessoa === "F") {
            mostrarPF();

            campo_nome.value = p.nome || "";
            campo_apelido.value = p.apelido || "";
            campo_rg.value = p.documento_estadual || "";
            campo_cpf.value = p.documento_federal || "";

            if (p.data_nascimento) {
                campo_data_nascimento.value = p.data_nascimento.split("T")[0];
            }

            if (p.sexo === "M") sexoMasculino.checked = true;
            if (p.sexo === "F") sexoFeminino.checked = true;

            if (p.ativo === "A") ativoPF_S.checked = true;
            else ativoPF_N.checked = true;

            campo_vinculo.value = p.id_vinculo || "";
        }

        /* ===== PJ ===== */
        if (p.tipo_pessoa === "J") {
            mostrarPJ();

            campo_razao.value = p.nome || "";
            campo_fantasia.value = p.apelido || "";
            campo_cnpj.value = p.documento_federal || "";
            campo_inscricao.value = p.documento_estadual || "";

            if (p.ativo === "A") ativoPJ_S.checked = true;
            else ativoPJ_N.checked = true;
        }

        /* ===== ENDEREÇOS ===== */
        enderecosParaSalvar = [];

        if (Array.isArray(p.enderecos)) {
            p.enderecos.forEach(e => {
                enderecosParaSalvar.push(e);
            });
        }

        exibirEnderecos();

    } catch (err) {
        console.error(err);
        alert("Erro ao carregar pessoa");
    }
}

/* ===============================
   EXIBIR ENDEREÇOS
================================= */
function exibirEnderecos() {
    listaEnderecos.innerHTML = "";

    enderecosParaSalvar.forEach((e, i) => {
        const div = document.createElement("div");
        div.className = "endereco-item";
        div.innerHTML = `
            <strong>${e.tipo_endereco}</strong> - ${e.logradouro}, ${e.numero}
            <button type="button" onclick="removerEndereco(${i})">Remover</button>
        `;
        listaEnderecos.appendChild(div);
    });
}

function removerEndereco(index) {
    enderecosParaSalvar.splice(index, 1);
    exibirEnderecos();
}

/* ===============================
   SALVAR
================================= */
async function botao_salvar() {

    const tipo = !formPF.classList.contains("hidden") ? "F" : "J";

    const payload = {
        tipo_pessoa: tipo,
        nome: tipo === "F" ? campo_nome.value : campo_razao.value,
        apelido: tipo === "F" ? campo_apelido.value : campo_fantasia.value,
        documento_federal: tipo === "F" ? campo_cpf.value : campo_cnpj.value,
        documento_estadual: tipo === "F" ? campo_rg.value : campo_inscricao.value,
        sexo: tipo === "F" ? (sexoMasculino.checked ? "M" : "F") : null,
        data_nascimento: tipo === "F" ? campo_data_nascimento.value : null,
        ativo: tipo === "F"
            ? (ativoPF_S.checked ? "A" : "I")
            : (ativoPJ_S.checked ? "A" : "I"),
        id_vinculo: campo_vinculo.value || null,
        enderecos: enderecosParaSalvar
    };

    try {
        const response = await fetch(
            idPessoa ? `${apiUrl}/${idPessoa}` : apiUrl,
            {
                method: idPessoa ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        const result = await response.json();

        if (!result.executado) {
            alert(result.mensagem || "Erro ao salvar");
            return;
        }

        alert("Pessoa salva com sucesso!");
        window.location.href = "pessoa_lista.html";

    } catch (err) {
        console.error(err);
        alert("Erro ao salvar");
    }
}

/* ===============================
   BOTÃO VOLTAR (PF / PJ)
================================= */
const btnBack = document.getElementById("btn_back");

btnBack.addEventListener("click", (event) => {
    event.preventDefault();

    // Se veio pela URL (?tipo=F ou ?tipo=J)
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");

    if (tipo === "J") {
        window.location.href = "pessoa_lista_juridica.html";
        return;
    }

    if (tipo === "F") {
        window.location.href = "pessoa_lista.html";
        return;
    }

    // Fallback: detecta pelo formulário visível
    const formPF = document.getElementById("formulario-fisico");
    const formPJ = document.getElementById("formulario-juridico");

    if (!formPF.classList.contains("hidden")) {
        window.location.href = "pessoa_lista.html";
    } else {
        window.location.href = "pessoa_lista_juridica.html";
    }
});
