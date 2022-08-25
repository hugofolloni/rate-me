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

    type Star = {
        value: number;
        color: string;
    }

    type Rate = {
        rate: number;
        user: string;
    }

    const [rateArray, setRateArray] = useState<Rate[]>([]);

    const [stars, setStars] = useState<Star[]>([
        { value: 1, color: "white" },
        { value: 2, color: "white" },
        { value: 3, color: "white" },
        { value: 4, color: "white" },
        { value: 5, color: "white" },
        { value: 6, color: "white" },
        { value: 7, color: "white" },
        { value: 8, color: "white" },
        { value: 9, color: "white" },
        { value: 10, color: "white" },
    ]);

    const [product, setProduct] = useState<Product>();

    useEffect (() => {
        const query: string = window.location.href.split("?q=")[1];
        fetch(`http://localhost:8000/products/${query}`)
        .then(res => res.json())
        .then(data => {
            const product = data;
            var commentList: Comments [] = [];
            for(let i = 0; i < product.comments.length; i++) {
                const comment = {user: product.comments[i].user, comment: product.comments[i].text};
                commentList.push(comment);
            }
            const rate = product.rate.reduce((a:number, b:Rate) => a + b.rate, 0) / product.rate.length;
            setRateArray(product.rate);
            setProduct({id: product.id, category: product.category, name: product.name, created: product.created, image: product.image, rate: rate, comments: commentList, numberOfRates: product.number_of_rates});
        })

        const token = localStorage.getItem("token");
        fetch(`http://localhost:8000/users?token=${token}`)
        .then(res => res.json())
        .then(data => {
            if(data.length === 0){
                setUsername("");
            }
            else{
                setUsername(data[0].username);
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
        var newNumberOfRates = product?.numberOfRates;
        var newRateArray: Rate [] = rateArray;
        var alreadyVoted:boolean = false;
        for(let i = 0; i < newRateArray.length; i++) {
            if(newRateArray[i].user === username) {
                newRateArray[i].rate = rate;
                alreadyVoted = true;
                break;
            }
        }
        if(!alreadyVoted) {
            newRateArray.push({
                rate: rate,
                user: username
            });
            if(newNumberOfRates !== undefined) {
                newNumberOfRates++;
            }
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
                rate: newRateArray,
                number_of_rates: newNumberOfRates
            })
        })
        .then(res => res.json())
    }

    return (
        <div>
            <div>
                <p>{product?.name}</p>
                <img src={product?.image} alt={product?.name}/>
                <p>{Math.round(Number(product?.rate)) /2} stars</p>
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
                   <div className="stars" style={{display: 'flex', flexDirection: 'row'}}>
                   {
                       stars.map((star, index) => {
                           return (
                               <div key={index} onClick={() => {
                                   const newRate = star.value
                                   addRate(newRate);
                                   setStars(stars.map(star => {
                                       if(star.value > newRate){
                                           return {...star, color: "white"};
                                       }
                                       else{
                                           return {...star, color: "gold"};
                                       }
                                   }));
                               }}>
                                   <div style={{backgroundColor: star.color, border: '1px solid black', width: '10px', height:'10px'}}></div>
                               </div>
                           )
                       }
                       )
                   }
                   </div> : <div></div>
                }
            </div>
        </div>
    );
}

export default Product;