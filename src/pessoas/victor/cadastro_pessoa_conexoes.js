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
async function buscarTodosFiltro(filtro,tipo_pessoa) {
    requisao = await fetch(`${API_HOST}/pessoas/victor/?esp${tipo_pessoa}&filtro=${filtro}`,{
        method: "GET",
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
    resultado = await requisao.json();
    return resultado;
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
async function inativar(id_pessoa) {
    requisao = await fetch(`${API_HOST}/pessoas/i/${id_pessoa}`,{
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
}