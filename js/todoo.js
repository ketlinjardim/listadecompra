import cors  from 'cors';
import express from 'express';
import { Lista } from './lista.js';

//objeto

let ListaMercado = [
    new Lista(1,"Farinha de trigo", 2, 6, "Mercearia"),
    new Lista(2,"Carne Moída", 2, 19, "Açougue"),
    new Lista(3,"Pão", 8, 10, "Mercearia"),
    new Lista(4,"Massa pronta Lasanha", 1, 12, "Congelados"),
    new Lista(5,"Manga", 5, 6, "Hortifruti")
]

const List = express();
List.use(express.json());
List.use(cors());
List.use(express.urlencoded({extended: true}));

//get

List.get("/lista/vizualizar", (req, res)=>{
    return res.status(200).json(ListaMercado);
})

//post

List.post("/lista/cadastrar", (req, res)=>{
    const{ id, desc, qtd, preco, categoria} = req.body;
    ListaMercado.push(new Lista(ListaMercado.length + 1, id, desc, qtd, preco, categoria));
    return res.status(200).json("Cadastrado!")
})

//put

List.put("/lista/alterar/:id", (req, res)=>{
    const { id } = req.params;
    const {desc, qtd, preco, categoria} = req.body;
    let produtos = ListaMercado.find(objeto => objeto.id == id);
    produtos.desc = desc;
    produtos.qtd = qtd;
    produtos.preco = preco;
    produtos.categoria = categoria;
    return res.status(200).json("Alterado!");
})

//delete

List.delete("/lista/excluir/:id",(req,res)=>{
    const { id } = req.params;
    ListaMercado = ListaMercado.filter(delte => delte.id != id);
    return res.status(200).json("Deletado!");
})

List.listen(3000, ()=>{
    console.log("Api no ar!")
})