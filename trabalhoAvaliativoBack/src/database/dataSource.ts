import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root', 
    database: 'usuariospetshop',
    synchronize: false,
    logging: true,
    entities: ["src/model/*.ts"],
});
