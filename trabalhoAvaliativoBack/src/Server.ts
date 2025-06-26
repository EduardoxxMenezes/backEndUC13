import { error } from "console";
import { AppDataSource } from "./database/dataSource";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import UserRoutes from "./routes/UserRoutes";
import PetRoutes from "./routes/PetRoutes"

const app: Application = express();


app.use( //vai encontrar o link dos negocios, já que os links são diferentes do front e do back, o cors garante que não ocorra nenhum erro.
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
  })
);

app.use(express.json());  //permite ao seu servidor analisar solicitações recebidas (informações enviadas pelo usuário)
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use("/api", UserRoutes);
app.use("/api", PetRoutes); 

// Arquivos estáticos
app.use(express.static('view'));

// Rota raiz
app.get('/teste-buscar', (req, res) => {
  res.sendFile(path.join(__dirname, '../view/buscarAnimais.html'));
});

// Inicializa conexão com banco e depois inicia servidor
AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando 🚀");
      console.log("Porta: localhost:3000");
    });
  })
  .catch((error) => {
    console.error(error);
  });
