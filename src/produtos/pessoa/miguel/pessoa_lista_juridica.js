const API_HOST = 'http://127.0.0.1:3000'
const API_BASE_URL = `${API_HOST}/pessoa/miguel`;

// Elementos HTML
// AJUSTE: Usa o ID específico da tabela Jurídica
const tabela = document.getElementById("tabela-pessoas-juridicas"); 
const inputFiltro = document.getElementById("filtro_busca");
const btnFiltrar = document.getElementById("btn_filtrar");

// =========================================================
// Funções de Navegação e Ação
// =========================================================

function editarPessoa(id) {
    // Redireciona para o cadastro no modo de edição de PJ
    window.location.href = `pessoa_cadastro.html?id=${id}&tipo=J`;
}

async function inativarPessoa(id) {
    if (!confirm("Tem certeza que deseja INATIVAR esta Pessoa Jurídica?")) {
        return;
    }
    
    const resposta = await fetch(`${API_BASE_URL}/inativar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });

    const contentType = resposta.headers.get("content-type");
    let respJson = { executado: false, mensagem: "Erro desconhecido." };

    if (contentType && contentType.includes("application/json")) {
        respJson = await resposta.json();
    } else if (!resposta.ok) {
        console.error("Erro do servidor:", await resposta.text());
        alert(`Erro ao inativar. Status: ${resposta.status}. Verifique o console.`);
        return;
    }

    if (resposta.ok && respJson.executado) {
        alert("Pessoa Jurídica inativada com sucesso!");
        await carregarPessoasJuridicas(); // Recarrega a lista
    } else {
        alert("Erro ao inativar: " + (respJson.mensagem || "Verifique o console."));
    }
}

// =========================================================
// Função de Carregamento da Lista
// =========================================================

const buscar_dados_pj = async function () {
    const termoBusca = inputFiltro ? inputFiltro.value.trim() : "";
    
    // Buscar apenas Pessoas Jurídicas (tipo_pessoa=J)
    let url = `${API_BASE_URL}?tipo_pessoa=J`; 

    if (termoBusca) {
        url += `&filtro=${encodeURIComponent(termoBusca)}`;
    }
    
    try {
        const requisicao = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!requisicao.ok) {
             console.error("Erro na API:", requisicao.status);
             return [];
        }

        const response = await requisicao.json()
        return response.data || []; 
    } catch (e) {
        console.error("Erro ao buscar dados:", e);
        return [];
    }
}

async function carregarPessoasJuridicas() {
    
    if (!tabela) {
        console.error("Elemento 'tabela' não encontrado no DOM. Verifique o ID 'tabela-pessoas-juridicas' no HTML.");
        return;
    }

    tabela.innerHTML = ""; // Limpa o <tbody>

    const pessoas = await buscar_dados_pj();

    if (pessoas.length === 0) {
        const row = tabela.insertRow();
        // Colspan ajustado para 9 (ID, Razão, Fantasia, CNPJ, IE, Ativo, Ação, Ação, Endereço)
        row.innerHTML = `<td colspan="9">Nenhuma Pessoa Jurídica ativa encontrada.</td>`; 
        return;
    }

    pessoas.forEach(pessoa => {
        const row = tabela.insertRow();
        row.insertCell(0).textContent = pessoa.id;
        row.insertCell(1).textContent = pessoa.nome; // Razão Social
        row.insertCell(2).textContent = pessoa.apelido; // Nome Fantasia
        row.insertCell(3).textContent = pessoa.documento_federal; // CNPJ
        row.insertCell(4).textContent = pessoa.documento_estadual || '-'; // IE/Insc Estadual
        row.insertCell(5).textContent = pessoa.ativo === 'A' ? 'Ativo' : 'Inativo';
            
        // Botões de Ações (Editar)
        const cellEdit = row.insertCell(6);
        cellEdit.className = "tabela-acoes";
        cellEdit.innerHTML = `
            <button type="button" class="btn-edit" onclick="editarPessoa(${pessoa.id})" title="Editar">
                <img src="../../../../imagens/editar.png" width="20" height="20" alt="Editar">
            </button>
        `;
        
        // Botões de Ações (Inativar)
        const cellInativar = row.insertCell(7);
        cellInativar.className = "tabela-acoes";
        cellInativar.innerHTML = `
            <button type="button" class="btn-delete" onclick="inativarPessoa(${pessoa.id})" title="Inativar">
                <img src="../../../../imagens/remover.png" width="20" height="20" alt="Inativar">
            </button>
        `;

        // Coluna Endereço
        const cellEndereco = row.insertCell(8);
        const btnEndereco = document.createElement('button');
        btnEndereco.textContent = "Endereço";
        btnEndereco.classList.add('btn-endereco');
        btnEndereco.onclick = function () {
             window.location.href = "endereco_lista.html?pessoa_id=" + pessoa.id;
        }
        cellEndereco.appendChild(btnEndereco);
    });

}

// Inicialização
window.onload = carregarPessoasJuridicas;

// Adiciona o listener para o botão de busca/filtro
if (btnFiltrar) {
    btnFiltrar.addEventListener('click', carregarPessoasJuridicas);
}