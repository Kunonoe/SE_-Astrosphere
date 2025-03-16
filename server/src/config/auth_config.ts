import dotenv from "dotenv";
dotenv.config();

const config = {
    JWT_SECRET: process.env.JWT_SECRET || "@S3CR3T",
    TOKEN_EXPIRATION: "1h" // อายุของ Token
};

export default config;