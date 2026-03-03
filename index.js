const express = require('express');
const app = express();

app.use(express.json());

// =========================
// FUNÇÃO GERAR ID
// =========================
function gerarNovoId(lista) {
    if (lista.length === 0) return 1;
    return Math.max(...lista.map(item => item.id)) + 1;
}

// =========================
// CATEGORIAS
// =========================
let categorias = [
    { id: 1, nome: "Massas" },
    { id: 2, nome: "Risotos" },
    { id: 3, nome: "Bebidas" },
    { id: 4, nome: "Sobremesas" }
];

// =========================
// PRODUTOS RESTAURANTE ITALIANO
// =========================
let produtos = [

    // MASSAS
    { id: 1, categoriaId: 1, nome: "Spaghetti alla Carbonara", preco: 49.00, descricao: "Pancetta italiana, parmesão e gema cremosa.", imagem: "" },
    { id: 2, categoriaId: 1, nome: "Fettuccine Alfredo", preco: 52.00, descricao: "Molho cremoso especial com toque de noz-moscada.", imagem: "" },
    { id: 3, categoriaId: 1, nome: "Tagliatelle alla Bolognese", preco: 55.00, descricao: "Ragu tradicional cozido lentamente.", imagem: "" },
    { id: 4, categoriaId: 1, nome: "Penne al Pesto Genovese", preco: 48.00, descricao: "Manjericão fresco, pinoli e azeite extra virgem.", imagem: "" },
    { id: 5, categoriaId: 1, nome: "Lasanha alla Casa", preco: 58.00, descricao: "Camadas de massa fresca, carne e queijo gratinado.", imagem: "" },
    { id: 6, categoriaId: 1, nome: "Spaghetti ai Frutti di Mare", preco: 69.00, descricao: "Camarões, mexilhões e lula ao molho branco.", imagem: "" },
    { id: 7, categoriaId: 1, nome: "Ravioli di Ricotta e Spinaci", preco: 56.00, descricao: "Recheado com ricota e espinafre ao molho pomodoro.", imagem: "" },
    { id: 8, categoriaId: 1, nome: "Gnocchi al Pomodoro", preco: 47.00, descricao: "Nhoque artesanal ao molho de tomate italiano.", imagem: "" },

    // RISOTOS
    { id: 9, categoriaId: 2, nome: "Risoto de Camarão", preco: 59.00, descricao: "Arroz arbóreo cremoso com camarões frescos.", imagem: "" },
    { id: 10, categoriaId: 2, nome: "Risoto al Funghi", preco: 54.00, descricao: "Cogumelos frescos e toque de vinho branco.", imagem: "" },
    { id: 11, categoriaId: 2, nome: "Risoto Parma", preco: 62.00, descricao: "Presunto de Parma com parmesão envelhecido.", imagem: "" },

    // BEBIDAS
    { id: 12, categoriaId: 3, nome: "Vinho Tinto Italiano", preco: 89.00, descricao: "Garrafa 750ml.", imagem: "" },
    { id: 13, categoriaId: 3, nome: "Vinho Branco Seco", preco: 84.00, descricao: "Leve e refrescante.", imagem: "" },
    { id: 14, categoriaId: 3, nome: "Aperol Spritz", preco: 32.00, descricao: "Clássico drink italiano.", imagem: "" },

    // SOBREMESAS
    { id: 15, categoriaId: 4, nome: "Tiramisù", preco: 29.00, descricao: "Mascarpone, café e cacau.", imagem: "" },
    { id: 16, categoriaId: 4, nome: "Panna Cotta", preco: 26.00, descricao: "Com calda de frutas vermelhas.", imagem: "" },
    { id: 17, categoriaId: 4, nome: "Cannoli Siciliano", preco: 28.00, descricao: "Massa crocante recheada com ricota doce.", imagem: "" }
];

// =========================
// ROTAS PRODUTOS
// =========================

// GET TODOS
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

// GET POR ID
app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(produto);
});

// POST
app.post('/produtos', (req, res) => {
    const { nome, preco, categoriaId, descricao, imagem } = req.body;

    if (!nome || preco == null || !categoriaId) {
        return res.status(400).json({ erro: "Nome, preço e categoriaId são obrigatórios" });
    }

    const categoriaExiste = categorias.find(c => c.id === categoriaId);
    if (!categoriaExiste) {
        return res.status(400).json({ erro: "Categoria não existe" });
    }

    const novoProduto = {
        id: gerarNovoId(produtos),
        nome,
        preco,
        categoriaId,
        descricao: descricao ?? "",
        imagem: imagem ?? ""
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// DELETE
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    const removido = produtos.splice(index, 1)[0];
    res.json({ mensagem: "Produto removido", produto: removido });
});

// =========================
// INICIAR SERVIDOR
// =========================
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});