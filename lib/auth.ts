import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { verifyToken, type JWTPayload } from './jwt';

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain text password with a hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password from database
 * @returns True if passwords match, false otherwise
 */
export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Get the current authenticated user from the request cookies
 * @returns User payload from JWT or null if not authenticated
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token');

        if (!token) {
            return null;
        }

        const payload = await verifyToken(token.value);
        return payload;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

/**
 * Require authentication - throws error if not authenticated
 * @returns User payload from JWT
 */
export async function requireAuth(): Promise<JWTPayload> {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}

/**
 * Require admin role - throws error if not admin
 * @returns User payload from JWT
 */
export async function requireAdmin(): Promise<JWTPayload> {
    const user = await requireAuth();

    if (user.role !== 'admin') {
        throw new Error('Forbidden - Admin access required');
    }

    return user;
}
