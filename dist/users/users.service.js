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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schemas_1 = require("../schemas/users.schemas");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async login(loginUserDto) {
        const user = await this.usersModel.collection.findOne({
            email: loginUserDto.email,
        });
        if (!user) {
            return null;
        }
        await this.usersModel.collection.findOneAndUpdate({ email: loginUserDto.email }, {
            $set: {
                dateLastLogin: new Date(),
            },
        });
        return user;
    }
    async registration(createUserDto) {
        const existingUser = await this.usersModel.collection.findOne({
            email: createUserDto.email,
        });
        if (existingUser) {
            return null;
        }
        createUserDto.dateReg = new Date();
        createUserDto.id = (0, uuid_1.v4)();
        createUserDto.banned = false;
        const createdUser = new this.usersModel(createUserDto);
        return createdUser.save();
    }
    async findOneByEmail(email) {
        return this.usersModel.findOne({ email });
    }
    async findOneById(id) {
        return this.usersModel.findOne({ id });
    }
    async findAll() {
        return this.usersModel.find();
    }
    async block(id) {
        await this.usersModel.updateOne({ id: id }, {
            $set: {
                banned: true,
            },
        });
        return this.findOneById(id);
    }
    async unblock(id) {
        await this.usersModel.updateOne({ id: id }, {
            $set: {
                banned: false,
            },
        });
        return this.findOneById(id);
    }
    async delete(id) {
        await this.usersModel.deleteOne({ id: id });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schemas_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map