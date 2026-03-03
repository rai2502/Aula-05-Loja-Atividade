const express = require('express');
const app = express();

app.use(express.json());

// =========================
// FUNÇÃO PARA GERAR ID
// =========================
function gerarNovoId(lista) {
    if (lista.length === 0) return 1;
    return Math.max(...lista.map(item => item.id)) + 1;
}

// =========================
// ARRAY DE PRODUTOS
// =========================
let produtos = [];

// =====================================================
// =================== ROTAS PRODUTOS ==================
// =====================================================

// ✅ GET - Listar todos os produtos
app.get('/produtos', (req, res) => {
    res.status(200).json({
        sucesso: true,
        total: produtos.length,
        dados: produtos
    });
});

// ✅ POST - Criar Produto
app.post('/produtos', (req, res) => {
    const { nome, preco, descricao } = req.body;

    // 🔴 Validação
    if (!nome || preco == null) {
        return res.status(400).json({
            sucesso: false,
            erro: "Nome e preço são obrigatórios"
        });
    }

    const novoProduto = {
        id: gerarNovoId(produtos),
        nome,
        preco,
        descricao: descricao ?? null
    };

    produtos.push(novoProduto);

    res.status(201).json({
        sucesso: true,
        mensagem: "Produto criado com sucesso",
        produto: novoProduto
    });
});

// =====================================================
// TRATAMENTO DE ERRO 500
// =====================================================
app.use((err, req, res, next) => {
    console.error("Erro interno:", err.message);
    res.status(500).json({
        sucesso: false,
        erro: "Erro interno do servidor"
    });
});

// =========================
// INICIAR SERVIDOR
// =========================
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});