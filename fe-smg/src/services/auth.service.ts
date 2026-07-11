import api from "../lib/axios";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: {
        id: number;
        name: string;
        email: string;
        role: string;
        };
    };
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

class AuthService {
    async login(payload: LoginRequest) {
        const response = await api.post<LoginResponse>(
            "/auth/login",
            payload
        );
        return response.data;
    }
    
    async register(
        payload: RegisterRequest
    ) {
        const response = await api.post(
            "/auth/register",
            payload
        );
        return response.data;
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}

export default new AuthService();