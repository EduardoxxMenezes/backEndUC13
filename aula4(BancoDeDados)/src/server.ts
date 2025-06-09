import express, {Application} from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/ProdutoRoutes";
import { AppDataSource } from "./database/dataSource";

const app: Application = express();

app.use(express.json());
app.use("/api", userRoutes)
app.use("/api", productRoutes)

AppDataSource.initialize()
.then(() => {
    app.listen(3000, () => console.log('Server rodando na porta 3000'));
})
.catch((error) => console.log(error));