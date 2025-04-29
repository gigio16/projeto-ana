
const crypto = require('crypto');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;


// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));


// Middleware para processar dados enviados via formulário (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
// Middleware para processar JSON
app.use(express.json());


// Rota para exibir o formulário de cadastro de usuário (Cadastro.html)
app.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Cadastro.html'));
});


app.get('/tarefas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tarefa.html'));
});


app.get('/metas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'metaindex.html'));
});


// Rota GET para buscar os responsáveis e retornar em JSON
app.get('/api/usuario', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'usuario.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de usuario:', err);
            return res.status(500).json({ success: false, message: 'Erro ao obter usuário.' });
        }


        try {
            const responsaveis = JSON.parse(data);
            return res.status(200).json({ success: true, responsaveis });
        } catch (parseError) {
            console.error('Erro ao fazer o parsing do JSON:', parseError);
            return res.status(500).json({ success: false, message: 'Erro ao processar os usuários.' });
        }
    });
});


app.get('/api/tarefas', (req, res) => {
    const tarefasFilePath = path.join(__dirname, 'data', 'tarefas.json');


    fs.readFile(tarefasFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de tarefas:', err);
            return res.status(500).json({ success: false, message: 'Erro ao processar as tarefas.' });
        }


        let tarefas = [];
        try {
            if (data) {
                tarefas = JSON.parse(data);
            }
        } catch (parseError) {
            console.error('Erro ao fazer o parsing do arquivo de tarefas:', parseError);
            return res.status(500).json({ success: false, message: 'Erro ao processar as tarefas.' });
        }


        return res.status(200).json({ success: true, tarefas });
    });
});


// Rota POST para cadastrar um responsável e salvar no arquivo JSON
app.post('/CadastroUsuario', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    const filePath = path.join(__dirname, 'data', 'usuarios.json');

    //gerar ID
    const id = crypto.randomBytes(16).toString('hex');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        let usuarios = [];
        if (!err && data) {
            try {
                usuarios = JSON.parse(data);
            } catch (parseError) {
                console.error('Erro ao parsear JSON:', parseError);
                return res.status(500).json({ success: false, message: 'Erro no servidor' });
            }
        }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).json({ success: false, message: 'Erro ao processar o cadastro.' });
        }


        const usuarios = JSON.parse(data);


        const novoUsuario = {
            id: usuarios.length + 1,
            nome: nome,
            email: email || '' // Se o email não for fornecido, será uma string vazia
        };


        usuarios.push(novoUsuario);


        fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo JSON:', err);
                return res.status(500).json({ success: false, message: 'Erro ao salvar o usuário.' });
            }


            return res.status(200).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
        });
    });
});

 // Verificar se usuário já existe
 if (usuarios.some(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'E-mail já cadastrado' });
}

const novoUsuario = {
    id,
    nome,
    email,
    senha: crypto.createHash('sha256').update(senha).digest('hex'), // Hash da senha
    dataCriacao: new Date().toISOString()
};

usuarios.push(novoUsuario);

fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), (err) => {
    if (err) {
        console.error('Erro ao salvar:', err);
        return res.status(500).json({ success: false, message: 'Erro ao salvar usuário' });
    }
    res.status(201).json({ success: true, message: 'Usuário criado com sucesso!' });
});
});

// Adicionar rotas CRUD completas
app.route('/usuarios/:id')
    .get((req, res) => {
        // Implementar busca de usuário
    })
    .put((req, res) => {
        // Implementar atualização
    })
    .delete((req, res) => {
        // Implementar exclusão
    });

// Rota POST para cadastrar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { nome, descricao, data_entrega,usuario_id, status } = req.body;


    if (!nome || !descricao || !data_entrega || !usuario_id) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }


    const usuariosFilePath = path.join(__dirname, 'data', 'usuarios.json');


    fs.readFile(usuariosFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de usuario:', err);
            return res.status(500).json({ success: false, message: 'Erro ao processar os usuarios.' });
        }


        let usuarios;
        try {
            usuarios = JSON.parse(data);
        } catch (parseError) {
            console.error('Erro ao fazer o parsing do JSON de usuarios:', parseError);
            return res.status(500).json({ success: false, message: 'Erro ao processar os usuarios.' });
        }


        const usuario = usuarios.find(r => r.id === parseInt(usuario_id, 10));
        if (!usuario) {
            return res.status(400).json({ success: false, message: 'Usuário não encontrado.' });
        }


        const tarefasFilePath = path.join(__dirname, 'data', 'tarefas.json');


        fs.readFile(tarefasFilePath, 'utf8', (err, data) => {
            let tarefas = [];
            if (!err && data) {
                try {
                    tarefas = JSON.parse(data);
                } catch (parseError) {
                    console.error('Erro ao fazer o parsing do JSON de tarefas:', parseError);
                    return res.status(500).json({ success: false, message: 'Erro ao processar as tarefas.' });
                }
            }


            const novaTarefa = {
                id: tarefas.length + 1,
                nome,
                descricao,
                data_entrega,
                responsavel: responsavel.nome,
                status: status || 'incompleta'
            };


            tarefas.push(novaTarefa);


            fs.writeFile(tarefasFilePath, JSON.stringify(tarefas, null, 2), (err) => {
                if (err) {
                    console.error('Erro ao salvar a tarefa:', err);
                    return res.status(500).json({ success: false, message: 'Erro ao salvar a tarefa.' });
                }


                return res.status(200).json({ success: true, message: 'Tarefa cadastrada com sucesso!' });
            });
        });
    });
});


// Rota PUT para editar uma tarefa existente
app.put('/api/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, data_entrega, usuario, status } = req.body;


    const tarefasFilePath = path.join(__dirname, 'data', 'tarefas.json');


    fs.readFile(tarefasFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de tarefas:', err);
            return res.status(500).json({ success: false, message: 'Erro ao processar as tarefas.' });
        }


        let tarefas = [];
        try {
            if (data) {
                tarefas = JSON.parse(data);
            }
        } catch (parseError) {
            console.error('Erro ao fazer o parsing do arquivo de tarefas:', parseError);
            return res.status(500).json({ success: false, message: 'Erro ao processar as tarefas.' });
        }


        const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === parseInt(id, 10));
        if (tarefaIndex === -1) {
            return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
        }


        // Atualizar os dados da tarefa
        tarefas[tarefaIndex] = {
            ...tarefas[tarefaIndex],
            nome,
            descricao,
            data_entrega,
            responsavel,
            status
        };


        // Salvar as alterações no arquivo JSON
        fs.writeFile(tarefasFilePath, JSON.stringify(tarefas, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar a tarefa atualizada:', err);
                return res.status(500).json({ success: false, message: 'Erro ao salvar a tarefa atualizada.' });
            }


            return res.status(200).json({ success: true, message: 'Tarefa atualizada com sucesso!' });
        });
    });
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


