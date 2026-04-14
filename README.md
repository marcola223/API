# API - Gerenciamento de Produtos

## Sobre o Projeto

Esta API REST permite o gerenciamento de produtos, possibilitando operações de cadastro e consulta. Os dados são armazenados em memória, sendo ideal para aprendizado.

---

# Documentação dos Endpoints

## 1. Listar produtos

* **Método:** GET
* **URL:** `/produtos`
* **Body:** ❌ Não possui

### Resposta:

```json
[
  {
    "id": 1,
    "nome": "Notebook",
    "preco": 3500,
    "categoria": "Informática"
  }
]
```

---

## 2. Buscar produto por ID

* **Método:** GET
* **URL:** `/produtos/:id`
* **Body:** ❌ Não possui

### Resposta:

```json
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500,
  "categoria": "Informática"
}
```

### ❌ Erro:

```json
{
  "erro": "Produto não encontrado"
}
```

---

##  3. Criar produto

* **Método:** POST
* **URL:** `/produtos`

### Body:

```json
{
  "nome": "Mouse",
  "preco": 150,
  "categoria": "Informática"
}
```

###  Resposta:

```json
{
  "id": 3,
  "nome": "Mouse",
  "preco": 150,
  "categoria": "Informática"
}
```

---

#  Exemplos no Postman

##  POST (Criar produto)

* URL: `http://localhost:3000/produtos`
* Body:

```json
{
  "nome": "Teclado",
  "preco": 200,
  "categoria": "Informática"
}
```

---

## GET (Listar)

* URL: `http://localhost:3000/produtos`

---

## GET por ID

* URL: `http://localhost:3000/produtos/1`

---

# Validações Implementadas

## Campos obrigatórios

* nome
* preco
* categoria

Erro:

```json
{
  "erro": "Campos obrigatórios não preenchidos"
}
```

---

## Tipo de dados

* preco deve ser número
* nome deve ser texto

Erro:

```json
{
  "erro": "Tipo de dado inválido"
}
```

---

##  Validação de ID

* Verifica se existe antes de buscar

---

# Implementação da API

##  Endpoint POST funcionando

Exemplo em Express:

```javascript
app.post('/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
    }

    if (typeof preco !== 'number') {
        return res.status(400).json({ erro: "Preço deve ser número" });
    }

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco,
        categoria
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});
```

---

# 📦 Criar 5 recursos via POST

No Postman, envie:

1.

```json
{ "nome": "Notebook", "preco": 3500, "categoria": "Informática" }
```

2.

```json
{ "nome": "Mouse", "preco": 150, "categoria": "Informática" }
```

3.

```json
{ "nome": "Teclado", "preco": 200, "categoria": "Informática" }
```

4.

```json
{ "nome": "Monitor", "preco": 1200, "categoria": "Informática" }
```

5.

```json
{ "nome": "Headset", "preco": 300, "categoria": "Informática" }
```

---
🛠️ Documentação de Alteração e ExclusãoEste guia foca nos endpoints responsáveis pela manutenção dos dados na TechStore API, detalhando como atualizar informações existentes e como remover registros do banco de dados (em memória).
1. Atualizar Produto (PUT)O método PUT é utilizado para realizar atualizações em um produto específico. A API suporta atualização parcial, o que significa que você só precisa enviar os campos que deseja alterar.EndpointPUT /api/produtos/:idParâmetros de URLid: O identificador numérico único do produto.Corpo da Requisição (JSON)CampoTipoDescriçãonomeString(Opcional) Novo nome do produto (mín. 3 caracteres).precoNumber(Opcional) Novo valor unitário (deve ser > 0).categoriaString(Opcional) Nova categoria do item.estoqueNumber(Opcional) Nova quantidade disponível.Exemplo de Payload:JSON{
  "preco": 4850.00,
  "estoque": 25
}
Respostas200 OK: Retorna o objeto do produto já atualizado.400 Bad Request: Erro de validação (ex: preço negativo ou nome muito curto).404 Not Found: O ID informado não existe na base de dados.

2. Remover Produto (DELETE)O método DELETE remove permanentemente um registro da lista de produtos.EndpointDELETE /api/produtos/:idParâmetros de URLid: O identificador numérico único do produto que será excluído.Respostas200 OK: Retorna uma mensagem de confirmação de sucesso.JSON{ "mensagem": "Produto removido com sucesso" }
404 Not Found: Retorna erro caso o ID não seja encontrado.JSON{ "erro": "Produto não encontrado" }

Considerações ImportantesValidação de ID: Ambos os métodos convertem o parâmetro :id da URL para um número inteiro. Certifique-se de enviar apenas dígitos.Persistência: Como esta API utiliza armazenamento em memória (variável let produtos), reiniciar o servidor Node.js fará com que todos os dados deletados ou alterados voltem ao estado original dos 10 registros iniciais.Exemplo de Teste no cURLAtualizar o produto 1:Bashcurl -X PUT http://localhost:3000/api/produtos/1 \
-H "Content-Type: application/json" \
-d '{"nome": "Samsung S24 Ultra"}'
Deletar o produto 1:Bashcurl -X DELETE http://localhost:3000/api/produtos/1

# Collection do Postman
  **Professor meu arquivo Postman, não estava reconhecendo aqui no git, por isso coloquei o link da minha workspace, o restante esta documentado**
  * POST /produtos](https://marcosgotardo-920b3739-4205019.postman.co/workspace/MARCOS-GOTARDO-AGUILHERA's-Work~ba7d1ea1-86a3-46c2-8682-7610be597a30/collection/53346952-d3da2dbf-db2d-4c59-a6b0-ab0d3cbefc94?action=share&creator=53346952)



# 👨‍💻 Autor

Marcos
GitHub: https://github.com/marcola223
