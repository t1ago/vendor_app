// /src/produtos/clientes/dam/lista_clientes.js

const API_HOST = "http://127.0.0.1:3000";

const el = id => document.getElementById(id);

async function exibirDados() {
    const corpoTabela = el("corpoTabela");
    corpoTabela.innerHTML = "<tr><td colspan='7'>Carregando clientes...</td></tr>";

    try {
        const resposta = await fetch(`${API_HOST}/clientesDam`);
        if (!resposta.ok) throw new Error("Erro ao buscar clientes.");

        const resultado = await resposta.json();

        corpoTabela.innerHTML = "";

        const clientes = Array.isArray(resultado.data) 
            ? resultado.data 
            : Array.isArray(resultado) 
                ? resultado 
                : [];
        
        if (clientes.length === 0) {
            corpoTabela.innerHTML = "<tr><td colspan='7'>Nenhum cliente cadastrado.</td></tr>";
            return;
        }
        
        clientes.forEach(item => {
            const linha = document.createElement("tr");

            const colunaNome = criarColuna(item.nome, 'left');
            const colunaApelido = criarColuna(item.apelido, 'left');
            const colunaCPF = criarColuna(item.cpf, 'left');
            const colunaRG = criarColuna(item.rg, 'left');
            const colunaSexo = criarColuna(item.sexo, 'left');
            const colunaAtivo = criarColuna(item.ativo ? "✅ Sim" : "❌ Não", 'left');
            
            const colunaAcoes = document.createElement("td");
            colunaAcoes.style.textAlign = "left"
            const botaoEditar = criarBotao("✏️", "Editar Cliente", () => alterarCliente(item.id));
            const botaoExcluir = criarBotao("🗑️", "Excluir Cliente", () => excluirCliente(item.id));
            colunaAcoes.append(botaoEditar, botaoExcluir);
            
            linha.append(colunaNome, colunaApelido, colunaCPF, colunaRG, colunaSexo, colunaAtivo, colunaAcoes);
            corpoTabela.appendChild(linha);
        });
    } catch (erro) {
        console.error("Erro ao carregar clientes:", erro);
        corpoTabela.innerHTML = "<tr><td colspan='7'>Erro ao carregar clientes. Verifique o servidor.</td></tr>";
        alert("Erro ao carregar clientes.");
    }
}

function criarColuna(conteudo, align = 'left') {
    const coluna = document.createElement("td");
    coluna.textContent = conteudo;
    coluna.style.textAlign = align;
    return coluna;
}


function alterarCliente (id) {
    window.location.href = `cadastro_clientes.html?id=${id}`;
}

function criarBotao(emoji, title, onClick) {
    const btn = document.createElement("button");
    btn.innerHTML = emoji;
    btn.title = title;
    btn.onclick = onClick;
    return btn;
}

async function excluirCliente(id) {
    if (!confirm("Deseja realmente excluir este cliente?")) return;
    
    try {
        const resposta = await fetch(`${API_HOST}/clientesDam/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        
        if (resposta.ok) {
            alert("Cliente excluído com sucesso!");
            exibirDados();
        } else {
            alert("Erro ao excluir cliente.")
        }
    } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Erro no servidor.");
    }
}

function abrirCadastro() {
    window.location.href = "../dam/cadastro_clientes.html"
}

function irParaIndex(){
    window.location.href = "../../../../index.html" 
}

exibirDados();