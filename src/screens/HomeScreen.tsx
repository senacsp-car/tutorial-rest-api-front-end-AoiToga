import { link } from "fs";
import { type } from "os";
import { useEffect, useState } from "react";
import axios from "axios";

type Item = {
    id?: number; // ? = Pode ser Undefined
    nome: string;
    descricao: string;
}

export default function HomeScreen(){
    const [Itens, setItens] = useState<Item[]>([]); // or "useState([] as Item[])"

    // For the Item Forms
    const [nome, setNome] = useState<string>(); 
    const [descricao, setDescricao] = useState<string>();
    //

    useEffect(function() {

        axios.get('http://localhost:4000/api/itens') // Usando o Axios com o endereço do Back-end

        .then(function(response) { //Then = Função caso de bom;
            setItens(response.data); // data = body
        })
        .catch(function(error) { // Catch = Função caso de error;
            alert(error);
        });


        // setItens([
        //     {
        //     nome: "Coca-Cola", 
        //     descricao:"Lata 350ml",      // Just for test
        // } ]);

    }, []);
    

    function BotaoSalvarClicado(){
        if ((nome !== undefined) && (descricao !== undefined)){
            const item: Item = {
                nome,
                descricao
            }
        axios.post('http://localhost:4000/api/itens', item)
        .then()
        .catch();
    }
    }


    return (
        <>
        <h1>Home</h1>
        <ul>
            {Itens.map(function (Item) {
                return<li>{Item.nome} - {Item.descricao}</li>
            })}
        </ul>
       
        <div>
            <form>
                <input placeholder="Nome" type="text"onChange={function(e){setNome(e.target.value)}}/> <br />
                <input placeholder="Descrição" type="text"onChange={function(e){setDescricao(e.target.value)}}/>
            </form>
            <button onClick={BotaoSalvarClicado}>Adicionar Item</button>
        </div>


        </>
    );
};