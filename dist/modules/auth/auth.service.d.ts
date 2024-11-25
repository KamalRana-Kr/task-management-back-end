import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private readonly users;
    constructor(jwtService: JwtService);
    validateUser(username: string, password: string): any;
    login(user: any): {
        access_token: string;
    };
}
