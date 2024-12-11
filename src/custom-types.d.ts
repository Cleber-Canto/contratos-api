import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// Estende a interface global Request do Express
declare global {
  namespace Express {
    // Define um tipo de usuário que inclui o payload do JWT mais propriedades customizadas
    interface User extends JwtPayload {
      role?: string;
    }

    // Adiciona a propriedade user à interface Request
    interface Request {
      user?: User;
    }
  }
}

// Define uma nova interface que estende Request do Express diretamente
export interface CustomRequest extends Request {
  // Aqui você pode adicionar mais propriedades customizadas
  isUserAdmin?: boolean;  // Exemplo de propriedade customizada
}
