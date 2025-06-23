import { error } from "console";
import { AppDataSource } from "./database/dataSource";
import express, { Application, Request, Response } from "express"
import cors from 'cors'
import path from "path";
import UserRoutes from "./routes/UserRoutes";

const app: Application = express()
app.use(express.json());
app.use("/api", UserRoutes);
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
}))

app.use(express.static('view'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../view/telaLogin.html'));
})

AppDataSource.initialize().then(()=>{
    app.listen(3000, () => {
        console.log("Servidor rodando 🚀")
        console.log("Porta: localhost:3000")
    })
}).catch((error) => {
    console.error(error)
})