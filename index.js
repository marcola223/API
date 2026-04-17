const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [
    { id: 1, nome: "Smartphone Samsung S24", preco: 5400, categoria: "Celulares", estoque: 15 },
    { id: 2, nome: "Mouse Gamer Logitech", preco: 250, categoria: "Periféricos", estoque: 50 },
    { id: 3, nome: "Monitor 24pol Dell", preco: 1200, categoria: "Monitores", estoque: 8 },
    { id: 4, nome: "Teclado Mecânico RGB", preco: 450, categoria: "Periféricos", estoque: 20 },
    { id: 5, nome: "MacBook Air M2", preco: 9800, categoria: "Notebooks", estoque: 5 },
    { id: 6, nome: "Headset HyperX Cloud", preco: 390, categoria: "Áudio", estoque: 30 },
    { id: 7, nome: "Placa de Vídeo RTX 4060", preco: 2100, categoria: "Hardware", estoque: 12 },
    { id: 8, nome: "Cadeira Ergonômica", preco: 1500, categoria: "Móveis", estoque: 10 },
    { id: 9, nome: "SSD NVMe 1TB", preco: 550, categoria: "Hardware", estoque: 45 },
    { id: 10, nome: "Webcam Full HD Pro", preco: 320, categoria: "Periféricos", estoque: 18 }
];

let proximoId = 11;


app.get('/api/produtos', (req, res) => {
    let { categoria, preco_max, ordem, direcao, pagina = 1, limite = 5 } = req.query;
    let resultado = [...produtos];


    if (categoria) {
        resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }
    if (preco_max) {
        resultado = resultado.filter(p => p.preco <= Number(preco_max));
    }

    if (ordem === 'preco' || ordem === 'nome') {
        resultado.sort((a, b) => {
            const valA = a[ordem];
            const valB = b[ordem];
            if (direcao === 'desc') return valA < valB ? 1 : -1;
            return valA > valB ? 1 : -1;
        });
    }

    const pagNum = parseInt(pagina);
    const limNum = parseInt(limite);
    const inicio = (pagNum - 1) * limNum;
    const final = inicio + limNum;

    res.json({
        total_itens: resultado.length,
        total_paginas: Math.ceil(resultado.length / limNum),
        pagina_atual: pagNum,
        dados: resultado.slice(inicio, final)
    });
});


app.get('/api/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });
    res.json(produto);
});

app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria, estoque } = req.body;


    if (!nome || nome.trim().length < 3) 
        return res.status(400).json({ erro: "O nome deve ter no mínimo 3 caracteres." });
    if (!preco || isNaN(preco) || preco <= 0) 
        return res.status(400).json({ erro: "O preço deve ser um número positivo." });
    if (!categoria) 
        return res.status(400).json({ erro: "A categoria é obrigatória." });

    const novo = {
        id: proximoId++,
        nome: nome.trim(),
        preco: Number(preco),
        categoria: categoria.trim(),
        estoque: parseInt(estoque) || 0
    };

    produtos.push(novo);
    res.status(201).json(novo);
});

app.put('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: "Produto não encontrado." });

    const { nome, preco, categoria, estoque } = req.body;

    if (nome) produtos[index].nome = nome.trim();
    if (preco && !isNaN(preco)) produtos[index].preco = Number(preco);
    if (categoria) produtos[index].categoria = categoria.trim();
    if (estoque !== undefined) produtos[index].estoque = parseInt(estoque);

    res.json(produtos[index]);
});

app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: "Produto não encontrado." });

    produtos.splice(index, 1);
    res.json({ mensagem: "Produto removido com sucesso." });
});

app.listen(PORT, () => {
    console.log(`🚀 API de Produtos rodando em http://localhost:${PORT}`);
});
