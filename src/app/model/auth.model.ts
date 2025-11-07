/** 
 * User object returned by the API
 */
export interface AuthUser {
    email: string;
}

/**
 *  Login response object returned by the API
 */
export interface LoginResponse {
    auth_token: string;
    user: AuthUser;
}

/**
 *  Login credentials sent to the API
 */
export interface LoginCredentials {
    email: string;
    password: string;
}