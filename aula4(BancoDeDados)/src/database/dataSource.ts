import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from "dotenv";

    dotenv.config()
    const{DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT} = process.env;
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER, // seu usuário do MySQL
    password: DB_PASS, // sua senha
    database: DB_NAME,
    synchronize: false, // CUIDADO! True no desenvolvimento, False em produção
    logging: true,
    entities: ["src/models/*.ts"],
});