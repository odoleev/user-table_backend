"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
let JwtGuard = class JwtGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Ошибка авторизации');
        }
        const validToken = this.authService.verifyToken(token);
        if (validToken === null || validToken === void 0 ? void 0 : validToken.error) {
            throw new common_1.UnauthorizedException(validToken.error);
        }
        return (request.token = token);
    }
};
JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], JwtGuard);
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=jwt.guard.js.map