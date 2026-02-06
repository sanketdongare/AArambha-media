import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
    userId: string;
    email: string;
    role: 'user' | 'admin';
}

/**
 * Sign a JWT token with the provided payload
 * @param payload - The data to encode in the token
 * @returns A signed JWT token string
 */
export async function signToken(payload: JWTPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // Token expires in 7 days
        .sign(secret);
}

/**
 * Verify and decode a JWT token
 * @param token - The JWT token to verify
 * @returns The decoded payload or null if invalid
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as JWTPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}
