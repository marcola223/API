# API - Gerenciamento de Produtos

## Sobre o Projeto

Esta API REST permite o gerenciamento de produtos, possibilitando operações de cadastro e consulta. Os dados são armazenados em memória, sendo ideal para aprendizado.

---

# Documentação dos Endpoints

## 🔹 1. Listar produtos

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

## 🔹 2. Buscar produto por ID

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

### 📥 Body:

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

# Collection do Postman

## O que entregar:

* Collection exportada (.json)
* Com:

  * GET /produtos
  * GET /produtos/:id
  * POST /produtos



# 👨‍💻 Autor

Marcos
GitHub: https://github.com/marcola223
