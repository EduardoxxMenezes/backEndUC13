export class Produto{
    constructor(public id:number, public nome: string, public preco:number, public desc: string, public quantidade: number){

    }
}

export const produtos:Produto[] = [];