import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

const secret = JWT_SECRET
export function generateToken(payload:Object){
    if (!secret) {
        throw new Error('JWT secret not set in NEXTAUTH_SECRET')
    }

    return jwt.sign(payload, secret, {
        expiresIn: '7d'
    })
}
export function verifyToken(token:string){
      if (!secret) {
        throw new Error('JWT secret not set in NEXTAUTH_SECRET')
    }
    return jwt.verify(token,secret)
}