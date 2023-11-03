const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const supabaseUrl = 'http://db.brpzasywsysljmdlzihb.supabase.co';
const supabaseKey = '2qljLuaTBL6SfLwH';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Rota para criar um novo item de compra
app.post('/itens_compra', async (req, res) => {
  try {
    const { nome, quantidade, comprado } = req.body;
    const { data, error } = await supabase.from('itens_compra').upsert([
      { nome, quantidade, comprado },
    ]);
    if (error) {
      return res.status(400).json({ error: 'Erro ao criar item de compra' });
    }
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para listar todos os itens de compra
app.get('/itens_compra', async (req, res) => {
  try {
    const { data, error } = await supabase.from('itens_compra').select('*');
    if (error) {
      return res.status(400).json({ error: 'Erro ao buscar itens de compra' });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para atualizar um item de compra por ID
app.put('/itens_compra/:id', async (req, res) => {
  try {
    const { nome, quantidade, comprado } = req.body;
    const itemId = req.params.id;
    const { data, error } = await supabase.from('itens_compra').upsert([
      { id: itemId, nome, quantidade, comprado },
    ]);
    if (error) {
      return res.status(400).json({ error: 'Erro ao atualizar item de compra' });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para excluir um item de compra por ID
app.delete('/itens_compra/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { data, error } = await supabase.from('itens_compra').delete().eq('id', itemId);
    if (error) {
      return res.status(400).json({ error: 'Erro ao excluir item de compra' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
