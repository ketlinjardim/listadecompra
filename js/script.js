//fetch server para requisitos http

fetch("http://localhost:3000/lista/vizualizar")
.then((resposta)=>{

if(resposta.status == 200){

    resposta.json().then((dados)=>{
        const div = document.querySelector("#root");
        dados.map ( (produto)=>{
            const card = document.createElement("article")
            card.id = produto.id

            const desc = document.createElement("span")
            desc.innerText = produto.desc

            const qtd = document.createElement("span")
            qtd.innerText = produto.qtd

            const preco = document.createElement("span")
            preco.innerText = produto.preco

            const categoria = document.createElement("span")
            categoria.innerText = produto.categoria

            const edit = document.createElement('a')
            edit.className = 'edit'
            edit.innerText = 'editar'
 edit.href = `./post.html?id=${produto.id}&desc=${produto.desc}&qtd=${produto.qtd}&preco=${produto.preco}&categoria=${produto.categoria}`           


            const del = document.createElement('button')
            del.className = 'delete'
            del.innerText = 'excluir'
            del.addEventListener('click', ()=>{
                fetch(`http://localhost:3000/lista/excluir/${id}` , {
                    method: 'DELETE',
                    headers:{
                        'Content-type': 'application/json'
                    },
                }).then((resposta)=>{
                    if(resposta.status != 200){
                        console.log(resposta.json())
                    }
                })
            })
           

            card.append(desc,preco,qtd,edit,del)
           
            div.append(card)
        })
    })
}
})

const params = new URLSearchParams(window.location.search)

const id = params.get('id');
const desc = params.get('desc');
const preco = params.get('preco');
const qtd = params.get('qtd');

if(id != null && desc != null && qtd != null && preco != null && categoria != null ){


    document.querySelector('button')
    .addEventListener('click',()=>{
        fetch(`http://localhost:3000/lista/alterar/${id}` , {
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              "desc" :  document.querySelector('#desc').value,
              "qtd" :  parseFloat(document.querySelector('#qtd').value),
              "preco" : parseFloat( document.querySelector('#preco').value),
              "categoria" :  parseFloat(document.querySelector('#categoria').value),
              
            })
        }).then((resposta)=>{
            if(resposta.status != 200){
                console.log(resposta.json())
            }
        })
    })
    }
    
    else{ document.querySelector('#botao')
    .addEventListener('click',()=>{
        fetch("http://localhost:3000/lista/cadastrar" , {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              "desc" :  document.querySelector('#desc').value,
              "qtd" :  parseFloat(document.querySelector('#qtd').value),
              "preco" : parseFloat( document.querySelector('#preco').value),
              "categoria" : parseFloat( document.querySelector('#categoria').value),
              
              
            })
        }).then((resposta)=>{
            if(resposta.status != 200){
                console.log(resposta.json())
            }
        })
    })}
