export class Lista{
    id;
    desc;
    qtd;
    preco;
    categoria;

    constructor(_id, _desc, _qtd, _preco, _categoria){
        this.id = _id;
        this.desc = _desc;
        this.qtd = _qtd;
        this.preco = _preco;
        this.categoria = _categoria;
    }
}