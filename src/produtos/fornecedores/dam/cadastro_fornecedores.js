const campos = [
    { id: 'nome', label: 'Nome', required: true},
    { id: 'moeda', label: 'Moeda', required: true},
    { id: 'preco_compra', label: 'Preço de Compra', type: 'number', required: true},
    { id: 'preco_venda', label: 'Preço de Venda', type: 'number', required: true},
    { id: 'grupo', label: 'Grupo', required: true},
    { id: 'categoria', label: 'Categoria', required: true},
    { id: 'medida', label: 'Unidade de Medida', required: true},
    { id: 'marca', label: 'Marca', required: true},
    { id: 'cor', label: 'Cor', required: true},
    { id: 'descricao', label: 'Descrição', type: 'textarea', required: true},
];

const container = document.getElementById('campos-dinamicos');

campos.forEach(campo=> {
    const linha = document.createElement('div');
    linha.className = 'linha';

    const label = document.createElement('label');
    label.setAttribute('for', campo.id);
    label.textContent = campo.label;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = campo.id;
    input.name = campo.id;

    if (campo.required) {
        input.required = true;
        input.minLength = 3;
        input.maxLength = 64;
    }

    linha.appendChild(label);
    linha.appendChild(input);
    linha.appendChild(linha);
});