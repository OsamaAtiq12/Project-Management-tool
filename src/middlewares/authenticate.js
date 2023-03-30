import {  AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

export function AuthenticateRequest(token) {

    if (!token) return null;
    const secret = process.env.JWT_SECRET;
    
    
       
    try {
        const  data  = jwt.verify(token, secret);
        return data;
    } catch (err) {
        console.log("----error login----", err)
        throw new AuthenticationError('Invalid token');
    }
}