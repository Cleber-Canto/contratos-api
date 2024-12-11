import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './authMiddleware';
import ContratoCompra from './ContratoCompra';
import { CustomRequest } from '../src/custom-types';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

app.use(express.json());

// Endpoint para login
app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'gerente' && password === 'senhaDoGerente') {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '30d' });
        console.log(`Login successful for user: ${username}`);
        res.json({ token });
    } else {
        console.log(`Login failed for user: ${username}`);
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

let contratos: ContratoCompra[] = [];

// Endpoint para consultar todos os contratos
app.get('/contratos', authenticateToken, (req: Request, res: Response) => {
    console.log('Accessed all contratos');
    res.json(contratos);
});

// Endpoint para criar um novo contrato
app.post('/contratos', authenticateToken, (req: CustomRequest, res: Response) => {
    const { empresa, cliente, transporte } = req.body;
    if (!empresa || !cliente || !transporte) {
        return res.status(400).json({ error: 'Dados do contrato incompletos' });
    }
    const id = contratos.length + 1;
    const novoContrato = new ContratoCompra(id, empresa, cliente, transporte);
    contratos.push(novoContrato);
    console.log(`Contrato created: ${JSON.stringify(novoContrato)}`);
    res.status(201).json(novoContrato);
});

// Endpoint para atualizar um contrato existente
app.put('/contratos/:id', authenticateToken, (req: CustomRequest, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID de contrato inválido' });
    }

    const index = contratos.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Contrato não encontrado' });
    }

    const { empresa, cliente, transporte } = req.body;
    if (!empresa || !cliente || !transporte) {
        return res.status(400).json({ error: 'Dados do contrato incompletos' });
    }

    contratos[index] = new ContratoCompra(id, empresa, cliente, transporte);
    console.log(`Contrato updated: ${JSON.stringify(contratos[index])}`);
    res.json(contratos[index]);
});

// Endpoint para deletar um contrato
app.delete('/contratos/:id', authenticateToken, (req: CustomRequest, res: Response) => {
    const id = parseInt(req.params.id, 10);
    
    // Verifica se o ID é um número válido
    if (isNaN(id) || id <= 0) {
        console.error(`Delete request failed: Invalid contract ID (${req.params.id})`);
        return res.status(400).json({ error: 'ID de contrato inválido' });
    }

    const index = contratos.findIndex(c => c.id === id);
    
    // Verifica se o contrato existe
    if (index === -1) {
        console.error(`Delete request failed: No contract found with ID ${id}`);
        return res.status(404).json({ error: 'Contrato não encontrado' });
    }

    // Realiza a exclusão do contrato
    const [deletedContrato] = contratos.splice(index, 1);
    console.log(`Contrato deleted successfully: ${JSON.stringify(deletedContrato)}`);
    res.json(deletedContrato);
});


// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
