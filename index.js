const express = require('express');
const app = express();
const PORT = 80;

app.use(express.json());

// Dados em memória
let produtos = [
    { id: 1, nome: "Notebook", preco: 3500, categoria: "Informática" },
    { id: 2, nome: "Mouse", preco: 150, categoria: "Informática" }
];

let proximoId = 3;

// POST
app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body;

    const precoNum = Number(preco);

    // VALIDAÇÕES
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    if (isNaN(precoNum) || precoNum <= 0) {
        return res.status(400).json({ erro: "Preço deve ser um número maior que 0" });
    }

    if (!categoria || categoria.trim() === "") {
        return res.status(400).json({ erro: "Categoria é obrigatória" });
    }

    const novoProduto = {
        id: proximoId++,
        nome: nome.trim(),
        preco: precoNum,
        categoria: categoria.trim()
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// GET (lista com filtros, ordenação e paginação)
app.get('/api/produtos', (req, res) => {
    const { categoria, preco_max, preco_min, ordem, direcao, pagina = 1, limite = 10 } = req.query;

    let resultado = [...produtos];

    // FILTROS
    if (categoria) {
        resultado = resultado.filter(p =>
            p.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }

    if (preco_max) {
        resultado = resultado.filter(p => p.preco <= Number(preco_max));
    }

    if (preco_min) {
        resultado = resultado.filter(p => p.preco >= Number(preco_min));
    }

    // ORDENAÇÃO
    if (ordem) {
        resultado.sort((a, b) => {
            if (ordem === 'preco') {
                return direcao === 'desc' ? b.preco - a.preco : a.preco - b.preco;
            }
            if (ordem === 'nome') {
                return direcao === 'desc'
                    ? b.nome.localeCompare(a.nome)
                    : a.nome.localeCompare(b.nome);
            }
            return 0;
        });
    }

    // PAGINAÇÃO (com segurança)
    const paginaNum = Math.max(1, parseInt(pagina) || 1);
    const limiteNum = Math.max(1, parseInt(limite) || 10);

    const inicio = (paginaNum - 1) * limiteNum;
    const paginado = resultado.slice(inicio, inicio + limiteNum);

    res.json({
        dados: paginado,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});

// GET por ID
app.get('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(produto);
});

// PUT (atualizar produto)
app.put('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    const { nome, preco, categoria } = req.body;

    if (nome) produto.nome = nome.trim();

    if (preco !== undefined) {
        const precoNum = Number(preco);
        if (isNaN(precoNum) || precoNum <= 0) {
            return res.status(400).json({ erro: "Preço inválido" });
        }
        produto.preco = precoNum;
    }

    if (categoria) produto.categoria = categoria.trim();

    res.json(produto);
});

// DELETE
app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    produtos.splice(index, 1);

    res.json({ mensagem: "Produto removido com sucesso" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});