
grupo_botoes = document.getElementsByClassName('coluna-botoes-cadastro')[0]
grupo_mensagem = document.getElementsByClassName('coluna-operacao')[0]
mensagem_operacao = document.getElementById('operacao')
mensagem_imagem = document.getElementById('imagem')
botao_cancelar = document.getElementById('botao_cancelar')
botao_salvar = document.getElementById('botao_salvar')
alerta = document.getElementsByClassName('alerta')[0]
textos = null

REGEX_DOCUMENTO_FEDEREAL_PESSOA_FISICA = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
REGEX_DOCUMENTO_FEDEREAL_PESSOA_JURIDICA = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
REGEX_DOCUMENTO_ESTADUAL_PESSOA_FISICA = /^(\d{1,2}\.?)(\d{3}\.?)(\d{3})(\-?[0-9Xx]{1})$/
REGEX_DOCUMENTO_ESTADUAL_PESSOA_JURIDICA = /^\d{3}.?\d{3}.?\d{3}.?\d{3}$/
REGEX_VALIDACAO_DATA = /^(\d{2})\/(\d{2})\/(\d{4})$/
REGEX_CEP = /^\d{5}-\d{3}$/

valores_pessoa = {
    id_pessoa: null,
    nome: null,
    apelido: null,
    tipo_pessoa: null,
    sexo: null,
    data_inicio: null,
    documento_estadual: null,
    documento_federeal: null,
    id_vinculo: null,
    ativo: null,
    enderecos: []
}

valores_endereco = {
    id_endereco: null,
    cep: null,
    logradouro: null,
    numero: null,
    bairro: null,
    cidade: null,
    estado: null,
    tipo_endereco: null,
    ativo: null,
    buscado_por_cep: null
}

cadatro_endereco_status = null