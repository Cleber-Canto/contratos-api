import 'express';

declare module 'express' {
    export interface Request {
        user?: any; // Define more specifically if possible
    }
}