"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    JWT_SECRET: process.env.JWT_SECRET || "@S3CR3T",
    TOKEN_EXPIRATION: "1h" // อายุของ Token
};
exports.default = config;
//# sourceMappingURL=auth_config.js.map