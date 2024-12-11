import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Função para gerar o token JWT no login
export function login(req: Request, res: Response) {
    const { username } = req.body; // Assume que o corpo da requisição contém um username
    const user = { name: username }; // Cria um objeto usuário simplificado

    // Gera um token com expiração de 30 dias
    const accessToken = jwt.sign(user, process.env.JWT_SECRET || 'suaChaveSecretaSuperSecreta', {
        expiresIn: '30d' // Configura o token para expirar em 30 dias
    });

    res.json({ accessToken }); // Envia o token gerado para o cliente
}

// Função para autenticar o token
export function authenticateToken(req: Request, res: Response, next: Function) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrai o token do cabeçalho

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'suaChaveSecretaSuperSecreta', (err, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado.' });
        }

        // Adiciona o usuário decodificado ao objeto de requisição
        req.user = decoded as Express.User;
        next(); // Continua para a próxima middleware ou rota
    });
}
