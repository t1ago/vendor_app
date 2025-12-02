const campo_id = document.getElementById("id");
const campo_nome = document.getElementById("nome");
const campo_apelido = document.getElementById("apelido");
const campo_tipo_pessoa_f = document.getElementById("campo_tipo_pessoa_f");
const campo_tipo_pessoa_j = document.getElementById("campo_tipo_pessoa_j");
const campo_sexo_m = document.getElementById("campo_sexo_m");
const campo_sexo_f = document.getElementById("campo_sexo_f");
const campo_data_nascimento = document.getElementById("data_nascimento");
const campo_federal = document.getElementById("federal");
const campo_estadual = document.getElementById("estadual");
const campo_ativo_s = document.getElementById("ativoS");
const campo_ativo_n = document.getElementById("ativoN");
const campo_vinculo_s = document.getElementById("vinculoS");
const campo_vinculo_n = document.getElementById("vinculoN");



const preencherform = (endereco) => {
    document.getElementById("logradouro").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
};

const cepvalido = (cep) => {
    const cepNumeros = cep.replace(/\D/g, '');
    return cepNumeros.length === 8;
};

const pesquisarcep = async function () {
    const cep = document.getElementById("cep").value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (cepvalido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (!endereco.erro) {
            preencherform(endereco);
        }
    }
};

document.getElementById('cep').addEventListener('focusout', pesquisarcep);



const endereco_input = function () {
    document.querySelectorAll("#endereco-section input").forEach(input => input.value = "");
};

const cadastro_input = function () {
    document.querySelectorAll("#cadastro_section input").forEach(input => input.value = "");
};


const corpomontado = function () {

    const getValorRadio = (campo_s, campo_n) => campo_s.checked ? "S" : campo_n.checked ? "N" : null;

    const getTipoPessoa = () =>
        campo_tipo_pessoa_f.checked ? "F" :
            campo_tipo_pessoa_j.checked ? "J" : null;

    const getSexo = () =>
        campo_sexo_m.checked ? "M" :
            campo_sexo_f.checked ? "F" : null;

    return {
        nome: campo_nome.value,
        apelido: campo_apelido.value,
        tipo_pessoa: getTipoPessoa(),
        sexo: getSexo(),
        data_nascimento: parseInt(campo_data_nascimento.value) || 0,
        documento_federal: campo_federal.value,
        documento_estadual: campo_estadual.value,
        ativo: campo_ativo_s.checked ? "S" : "N",
        id_vinculo: getValorRadio(campo_vinculo_s, campo_vinculo_n)
    };
};


const salvando_Tela = async function () {

    const corpo = corpomontado();

    const requisicao = await fetch(`${API_HOST}/pessoa/miguel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo)
    });

    if (!requisicao.ok) {
        alert("Erro ao salvar pessoa");
        return;
    }

    const resposta = await requisicao.json();
    campo_id.value = resposta.data[0].id;
};



async function salvarEndereco(id_pessoa) {

    const tipo_endereco = document.getElementById("tipo_endereco")?.value;
    const logradouro = document.getElementById("logradouro")?.value;
    const numero = document.getElementById("numero")?.value;
    const bairro = document.getElementById("bairro")?.value;
    const cidade = document.getElementById("cidade")?.value;
    const estado = document.getElementById("estado")?.value;
    const cep = document.getElementById("cep")?.value;

    if (!tipo_endereco || !logradouro || !numero || !bairro || !cidade || !estado) {
        alert("Preencha todos os campos do endereço.");
        return;
    }

    const corpo = { cep, logradouro, numero, bairro, cidade, estado, tipo_endereco, id_pessoa, ativo: "S" };

    await fetch(`${API_HOST}/pessoas/miguel/endereco`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo)
    });

    return true;
}




const atualizando_tela = async function () {

    const corpo = corpomontado();

    await fetch(`${API_HOST}/pessoas/miguel/${campo_id.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo)
    });
};


const botao_salvar = async function () {

    const id = campo_id.value;

    // CADASTRO NOVO

    if (id === "") {
        await salvando_Tela();                     // cria pessoa
        await salvarEndereco(campo_id.value);      // salva endereço
        window.location.href = "pessoa_lista.html";
    }
    // EDITAR
    else {
        await atualizando_tela();
        await salvarEndereco(id);
    }
};




const dados = async function () {

    const parametros = new URLSearchParams(window.location.search);
    const pessoaId = parametros.get("id");

    if (!pessoaId) return;

    let requisicao = await fetch(`${API_HOST}/pessoas/miguel/${pessoaId}`);

    if (!requisicao.ok) return;

    let pessoa = (await requisicao.json()).data[0];

    campo_id.value = pessoa.id;
    campo_nome.value = pessoa.nome;
    campo_apelido.value = pessoa.apelido;

    campo_tipo_pessoa_f.checked = pessoa.tipo_pessoa === "F";
    campo_tipo_pessoa_j.checked = pessoa.tipo_pessoa === "J";

    campo_sexo_m.checked = pessoa.sexo === "M";
    campo_sexo_f.checked = pessoa.sexo === "F";

    campo_idade.value = pessoa.idade;

    campo_federal.value = pessoa.documento_federal;
    campo_estadual.value = pessoa.documento_estadual;

    campo_ativo_s.checked = pessoa.ativo === "S";
    campo_ativo_n.checked = pessoa.ativo === "N";

    campo_vinculo_s.checked = pessoa.id_vinculo === "S";
    campo_vinculo_n.checked = pessoa.id_vinculo === "N";
};

dados();
