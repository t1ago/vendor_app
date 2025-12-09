// CONFIG
const API_HOST = "http://127.0.0.1:3000";

//Utilitários gerais
const el = id => document.getElementById(id);

async function exibirDados() {
    const corpoTabela = el("corpoTabela");
    corpoTabela.innerHTML = "";

    try {
        const resposta = await fetch(`${API_HOST}/fornecedoresDam`);
        if (!resposta) throw new Error("Erro ao buscar fornecedores");

        const resultado = await resposta.json();

        const fornecedores = Array.isArray(resultado.data) ? resultado.data : [];
        
        fornecedores.forEach(item => {
            const linha = document.createElement("tr");

            const colunaNome = document.createElement("td");
            colunaNome.textContent = item.nome;

            const colunaMoeda = document.createElement("td");
            colunaMoeda.textContent = item.nome_moeda;

            const colunaCompra = document.createElement("td");
            colunaCompra.textContent = item.preco_compra;

            const colunaVenda = document.createElement("td");
            colunaVenda.textContent = item.preco_venda;

            const colunaGrupo = document.createElement("td");
            colunaGrupo.textContent = item.nome_grupo;

            const colunaCategoria = document.createElement("td");
            colunaCategoria.textContent = item.nome_categoria;

            const colunaMedida = document.createElement("td");
            colunaMedida.textContent = item.nome_unidade_medida;

            const colunaMarca = document.createElement("td");
            colunaMarca.textContent = item.nome_marca;

            const colunaCor = document.createElement("td");
            colunaCor.textContent = item.cor_hexadecimal;

            const colunaDescricao = document.createElement("td");
            colunaDescricao.textContent = item.descricao;

            const colunaAcoes = document.createElement("td");
            const botaoEditar = criarBotao("✏️", "Editar fornecedor", () => alterarFornecedor(item.id));
            const botaoExcluir = criarBotao("🗑️", "Excluir fornecedor", () => excluirFornecedor(item.id));
            colunaAcoes.append(botaoEditar, botaoExcluir);

            linha.append(colunaNome, colunaMoeda, colunaCompra, colunaVenda, colunaGrupo,
                colunaCategoria, colunaMedida, colunaMarca, colunaCor, colunaDescricao, colunaAcoes);
            corpoTabela.appendChild(linha);
        });
    } catch (erro) {
    console.error("Erro ao carregar fornecedores:", erro);
    alert("Erro ao carregar fornecedores.");
  }
}

//Rediciona para tela de edição
function alterarFornecedor (id) {
    window.location.href = `cadastro_fornecedores.html?id=${id}`;
}

//Emoji, tooltip e evento
function criarBotao(emoji, title, onClick) {
    const btn = document.createElement("button");
    btn.innerHTML = emoji;
    btn.title = title;
    btn.onclick = onClick;
    return btn;
}

async function excluirFornecedor(id) {
  if (!confirm("Deseja realmente excluir este fornecedor?")) return;

    try {
        const resposta = await fetch(`http://127.0.0.1:3000/fornecedoresDam/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
        });

        if (resposta.ok) {
            alert("Fornecedor excluído com sucesso!");
            exibirDados();
        } else {
            alert("Erro ao excluir fornecedor.")
        }
    } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Erro no servidor.");
    }
}

function abrirCadastro() {
    window.location.href = "../dam/cadastro_fornecedores.html"
}

function irParaIndex(){
    window.location.href = "../../../../index.html"
}

//Carregar a página
exibirDados();