export interface AuthUser {
    name: string;
    email: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    data: string;
    message: string;
    status: string;
}

export interface RegisterRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface RegisterResponse {
    token: string;
    user: AuthUser;
}

