import express, {Application} from "express";
import UserRoutes from "./Routes/UserRoutes"
import dishRoutes from "./Routes/dishRoutes"
import orderRoutes from "./Routes/orderRoutes"
import { AppDataSource } from "./config/data-source";

const app: Application = express();

app.use(express.json());
app.use("/api", UserRoutes)
app.use("/api", dishRoutes)
app.use("/api", orderRoutes)

AppDataSource.initialize()
.then(() => {
    app.listen(3000, () => console.log('Server rodando na porta 3000'));
})
.catch((error) => console.log(error));