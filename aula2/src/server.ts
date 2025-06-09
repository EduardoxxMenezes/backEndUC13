import express, {Application, Request, Response, NextFunction} from 'express';

const App: Application = express();
const port: number = 3000;

App.use(express.json()); 

App.get('/usuarios', (req: Request, res: Response) => {
    res.status(200).json({mensagem: 'Lista de usuarios'});
})

App.post('/usuarios', (req: Request, res: Response) => {
    const {nome} = req.body;
    if(!nome){
    res.status(400).json({ mensagem: 'nome é obrigatório!'})
}
res.status(201).json({mensagem: `Usuario ${nome} criado com sucesso!`})
});


const datalog = (req: Request, res: Response, next:NextFunction) => {
    let data: Date = new Date();
    console.log(`Requisição feita em: ${data}`)
    next();
}

App.use(datalog);

const porteiroMiddleware = (req: Request, res: Response, next: Function) => {
    console.log(` Requisição recebida em: ${req.url}`);
    next(); // Permite a requisição continuar para a rota
  };
  
  
//App.use(porteiroMiddleware);

App.listen(port, () => { console.log(`Servidor rodando em http://localhost:${port}`)})


//ATIVIDADES

//ATIVIDADE 1

App.post('/sobre', (req: Request, res: Response) => {
    const {nome, idade, desc} = req.body;
    if(!nome || !idade || !desc){
        res.status(400).json({mensagem:`é necessario inserir Nome, idade e descricao!`})
    }else{
    res.status(200).json({mensagem:`NOME: ${nome}, IDADE: ${idade}, DESCRICAO: ${desc}`})}
})

//ATIVIDADE 3

App.post('/comentarios', (req: Request, res: Response) => {
    const {texto} = req.body;
    if(!texto){
        res.status(400).json({mensagem:`é necessario inserir um texto!`})
    }
    res.status(201).json({mensagem:`Comentario recebido! ${texto}`});
})

//ATIVIDADE 4

App.delete('/comentarios/:id', porteiroMiddleware, (req: Request, res: Response) => {
    const {id} = req.body;
    if(id){
        res.status(204).json({mensagem: `ID: ${id} removido`})
    }
    else{
        res.status(400).json({mensagem: `ID não encontrado`})
    }
})


App.listen(port, () => { console.log(`Servidor rodando em http://localhost:${port}`)})