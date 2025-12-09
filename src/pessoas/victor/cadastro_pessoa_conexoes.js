async function buscarTodos(tipo_pessoa) {
    requisao = await fetch(`${API_HOST}/pessoas/victor/?esp=${tipo_pessoa}`,{
        method: "GET",
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
    if(requisao.ok) {
        resultado = await requisao.json();
        return resultado;
    }
    
}
async function buscarEstados() {
    requisao = await fetch(`${API_HOST}/enderecos/victor/estados`,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
    resultado = await requisao.json();
    return resultado;
}
async function buscarEnderecoId(id_endereco) {
    requisao = await fetch(`${API_HOST}/pessoas/victor/e/${id_endereco}`,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
    resultado = await requisao.json();
    return resultado;
}
