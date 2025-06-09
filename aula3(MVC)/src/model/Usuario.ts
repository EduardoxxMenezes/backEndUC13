export class Usuario{
    // private nome: string;
    // private cpf: string;
    // private idade: number;

    // constructor(nome: string, cpf: string, idade: number){
    //     this.nome = nome;
    //     this.cpf = cpf;
    //     this.idade = idade
    // }

    constructor(public id:number, public nome:string, public email:string){}
}

    export const usuarios: Usuario[] = [];