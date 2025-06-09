import express, {Application} from "express";
import UsuarioRoutes from "./routes/UsuarioRoute";
import ProdutoRoutes from "./routes/ProdutoRoute";

const app:Application = express();

app.use(express.json());

app.use(ProdutoRoutes);



app.listen(3000, () => {
    console.log("PORTA ABERTA EM: http:/localhost/3000");
})