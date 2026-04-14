const express = require('express');
const app = express();
const PORT = 3000; // Alterado para 3000 para evitar conflitos comuns na porta 80

app.use(express.json());

// Dados iniciais (Mínimo 10 registros)
let jogos = [
    { id: 1, titulo: "The Witcher 3", plataforma: "PC", ano: 2015, genero: "RPG" },
    { id: 2, titulo: "Elden Ring", plataforma: "PS5", ano: 2022, genero: "Souls-like" },
    { id: 3, titulo: "Zelda: Breath of the Wild", plataforma: "Switch", ano: 2017, genero: "Aventura" },
    { id: 4, titulo: "God of War Ragnarok", plataforma: "PS5", ano: 2022, genero: "Ação" },
    { id: 5, titulo: "Cyberpunk 2077", plataforma: "PC", ano: 2020, genero: "RPG" },
    { id: 6, titulo: "Hollow Knight", plataforma: "PC", ano: 2017, genero: "Metroidvania" },
    { id: 7, titulo: "Red Dead Redemption 2", plataforma: "Xbox", ano: 2018, genero: "Mundo Aberto" },
    { id: 8, titulo: "Mario Odyssey", plataforma: "Switch", ano: 2017, genero: "Plataforma" },
    { id: 9, titulo: "Minecraft", plataforma: "Multi", ano: 2011, genero: "Sandbox" },
    { id: 10, titulo: "Final Fantasy VII Rebirth", plataforma: "PS5", ano: 2024, genero: "RPG" }
];

let proximoId = 11;

// --- ENDPOINTS ---

// GET: Listar com Filtros, Ordenação e Paginação
app.get('/api/jogos', (req, res) => {
    let { genero, plataforma, ordem, direcao, pagina = 1, limite = 5 } = req.query;
    let resultado = [...jogos];

    // Filtros
    if (genero) {
        resultado = resultado.filter(j => j.genero.toLowerCase() === genero.toLowerCase());
    }
    if (plataforma) {
        resultado = resultado.filter(j => j.plataforma.toLowerCase() === plataforma.toLowerCase());
    }

    // Ordenação
    if (ordem === 'ano' || ordem === 'titulo') {
        resultado.sort((a, b) => {
            const valA = a[ordem];
            const valB = b[ordem];
            if (direcao === 'desc') return valA < valB ? 1 : -1;
            return valA > valB ? 1 : -1;
        });
    }

    // Paginação
    const pag = parseInt(pagina);
    const lim = parseInt(limite);
    const inicio = (pag - 1) * lim;
    const final = inicio + lim;

    res.json({
        total: resultado.length,
        pagina: pag,
        limite: lim,
        dados: resultado.slice(inicio, final)
    });
});

// GET por ID
app.get('/api/jogos/:id', (req, res) => {
    const jogo = jogos.find(j => j.id === parseInt(req.params.id));
    if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado." });
    res.json(jogo);
});

// POST: Criar Jogo
app.post('/api/jogos', (req, res) => {
    const { titulo, plataforma, ano, genero } = req.body;

    // Validações
    if (!titulo || titulo.trim().length < 2) 
        return res.status(400).json({ erro: "Título inválido (mínimo 2 caracteres)." });
    if (!plataforma) 
        return res.status(400).json({ erro: "Plataforma é obrigatória." });
    if (!ano || isNaN(ano) || ano < 1950 || ano > 2030) 
        return res.status(400).json({ erro: "Ano deve ser entre 1950 e 2030." });

    const novoJogo = {
        id: proximoId++,
        titulo: titulo.trim(),
        plataforma: plataforma.trim(),
        ano: parseInt(ano),
        genero: genero || "Não informado"
    };

    jogos.push(novoJogo);
    res.status(201).json(novoJogo);
});

// PUT: Atualizar Jogo
app.put('/api/jogos/:id', (req, res) => {
    const index = jogos.findIndex(j => j.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ erro: "Jogo não encontrado." });

    const { titulo, plataforma, ano, genero } = req.body;

    // Validação de dados recebidos (se existirem)
    if (ano && (isNaN(ano) || ano < 1950)) 
        return res.status(400).json({ erro: "Ano inválido." });

    jogos[index] = {
        ...jogos[index],
        ...(titulo && { titulo: titulo.trim() }),
        ...(plataforma && { plataforma: plataforma.trim() }),
        ...(ano && { ano: parseInt(ano) }),
        ...(genero && { genero: genero.trim() })
    };

    res.json(jogos[index]);
});

// DELETE: Remover Jogo
app.delete('/api/jogos/:id', (req, res) => {
    const index = jogos.findIndex(j => j.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ erro: "Jogo não encontrado." });

    jogos.splice(index, 1);
    res.json({ mensagem: "Jogo removido com sucesso." });
});

app.listen(PORT, () => {
    console.log(`🚀 Games API rodando em http://localhost:${PORT}`);
});
