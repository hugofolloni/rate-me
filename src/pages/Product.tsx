import { useEffect, useState } from "react";

const Product: React.FC = () => {

    type Comments = {
        user: string;
        comment: string;
    };

    type Product = {
        id: number;
        name: string;
        image: string;
        rate: number;
        comments: Comments [];
        numberOfRates: number;
        created: string;
        category: string;
    };

    const [product, setProduct] = useState<Product>();

    useEffect (() => {
        const query: string = window.location.href.split("?q=")[1];
        fetch(`http://localhost:8000/products/${query}`)
        .then(res => res.json())
        .then(data => {
            const product = data;
            var commentList: Comments [] = [];
            for(let i = 0; i < product.comments.length; i++) {
                const comment = {user: product.comments[i].user, comment: product.comments[i].comment};
                commentList.push(comment);
            }
            console.log(commentList)
            setProduct({id: product.id, category: product.category, name: product.name, created: product.created, image: product.image, rate: product.rate, comments: commentList, numberOfRates: product.number_of_rates});
        })

        const token = localStorage.getItem("token");
        fetch(`http://localhost:8000/users?token=${token}`)
        .then(res => res.json())
        .then(data => {
            if(data.length === 0){
                setUsername("");
            }
            else{
                setUsername(data[0].name);
            }
        })
    } , []);

    const [username, setUsername] = useState<string>("");

    const [addNote, setAddNote] = useState<boolean>(false);
    const [note, setNote] = useState<string>("");

    const handleAddComment = () => {
        if(note !== "" && username !== "") {
            var listOfComments: Comments [] = []
            if(product){
                listOfComments = product.comments;
            }
            listOfComments.push({
                user: username,
                comment: note
            });
            if(product){
                setProduct({...product, comments: listOfComments});
                fetch(`http://localhost:8000/products/${product.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        comments: listOfComments
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.error){
                            alert(data.error)
                        }
                        else{
                            setAddNote(false);
                            setNote("");
                        }
                    }
                    )
                }    
        }
    }

    const addRate = (rate: number) => {
        console.log(product?.id)
        var newRate = 0
        var newNumberOfRates = 0
        if(product){
            console.log("rate: " + rate + " product.rate: " + product.rate + " product.numberOfRates: " + product.numberOfRates)
            newRate = (product?.rate * product?.numberOfRates + rate) / (product?.numberOfRates + 1);
            newNumberOfRates = product?.numberOfRates + 1;
        }
        fetch(`http://localhost:8000/products/${product?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: product?.id,
                name: product?.name,
                created: product?.created,
                image: product?.image,
                comments: product?.comments,
                category: product?.category,
                rate: newRate,
                number_of_rates: newNumberOfRates
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.rate, rate, data.number_of_rates, newNumberOfRates)
        })
    }

    return (
        <div>
            <div>
                <p>{product?.name}</p>
                <img src={product?.image} alt={product?.name}/>
                <p>{Math.round(Number(product?.rate) / 2)} stars</p>
                {
                    product?.comments.map(comment => (
                        <div key={comment.user + comment.comment}>
                            <p>{comment.user}</p>
                            <p>{comment.comment}</p>
                        </div>
                    ))
                }        
                { username !== "" ? <p onClick={() => setAddNote(true)}>Adicionar comentário</p> : <div></div>}    
                { addNote ? <div>
                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)}/>
                    <button onClick={() => handleAddComment()}>Adicionar</button>
                </div> : <div></div>}
                { username !== "" ? 
                    <div>
                        <p onClick={() => addRate(2)}>1</p>
                        <p onClick={() => addRate(4)}>2</p>
                        <p onClick={() => addRate(6)}>3</p>
                        <p onClick={() => addRate(8)}>4</p>
                        <p onClick={() => addRate(10)}>5</p>
                    </div> : <div></div>
                }
            </div>
        </div>
    );
}

export default Product;