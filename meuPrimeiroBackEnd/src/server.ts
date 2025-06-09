import express, {Application,Request,Response} from "express";

const app: Application = express();

app.get("/", (req: Request,res: Response):void => {
    res.send("<h1>Hello World!</h1>")
})

app.get('/nome', (req:Request,res: Response):void => {
    res.send("<h1>Ola Folano</h1>")
})

app.listen(3000, () => {
    console.log("SERVIDOR INICIADO NA PORTA 3000.");
})

