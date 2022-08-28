import { useEffect, useState } from "react";
import { AddCommentTitle, AddCommentButton, AddCommentDiv, CommentsDiv, CommentText, CommentTitle, ProductContainer, ProductDiv, ProductImage, ProductRate, ProductTitle, ReviewDiv, SingleComment, StarDiv, StarsDiv, TranslucentBackground, AddCommentText, AddInsideCommentButton } from "../styles/styles";

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
        { value: 1, color: "#aaaaaa" },
        { value: 2, color: "#aaaaaa" },
        { value: 3, color: "#aaaaaa" },
        { value: 4, color: "#aaaaaa" },
        { value: 5, color: "#aaaaaa" },
        { value: 6, color: "#aaaaaa" },
        { value: 7, color: "#aaaaaa" },
        { value: 8, color: "#aaaaaa" },
        { value: 9, color: "#aaaaaa" },
        { value: 10, color: "#aaaaaa" },
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
                const comment = {user: product.comments[i].user, comment: product.comments[i].comment};
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
        <ProductDiv>
            <ProductContainer>
                <ProductTitle>{product?.name}</ProductTitle>
                <ProductImage src={product?.image} alt={product?.name}/>
                <ProductRate>{Math.round(Number(product?.rate)) /2} stars</ProductRate>
                { username !== "" ? 
                    <ReviewDiv>
                        <h3>Review:</h3>
                        <StarsDiv>
                            {
                                
                                stars.map((star, index) => {
                                    return (
                                        <div key={index} onClick={() => {
                                            const newRate = star.value
                                            addRate(newRate);
                                            setStars(stars.map(star => {
                                            if(star.value > newRate){
                                                return {...star, color: "#aaaaaa"};
                                            }
                                            else{
                                                return {...star, color: "#56203D"};
                                            }
                                        }));
                                    }}>
                                        <StarDiv style={{backgroundColor: star.color}}></StarDiv>
                                        </div>
                                    )
                                }
                                )
                            }
                        </StarsDiv>
                    </ReviewDiv> : <div></div>
                }
                <CommentsDiv>
                {
                    product?.comments.map(comment => (
                        <SingleComment key={comment.user + comment.comment}>
                            <CommentTitle>{comment.user}</CommentTitle>
                            <CommentText>{comment.comment}</CommentText>
                        </SingleComment>
                    ))
                }        
                </CommentsDiv>
                { username !== "" ? <AddCommentButton onClick={() => setAddNote(true)}>Adicionar comentário</AddCommentButton> : <div></div>}    
                { addNote ? <div>
                    <TranslucentBackground onClick={() => setAddNote(false)}></TranslucentBackground>
                    <AddCommentDiv>
                        <AddCommentTitle>Add a comment</AddCommentTitle>
                        <AddCommentText value={note} onChange={(e) => setNote(e.target.value)}/>
                        <AddInsideCommentButton onClick={() => handleAddComment()}>Adicionar</AddInsideCommentButton>
                    </AddCommentDiv>
                </div> : <div></div>}
            </ProductContainer>
        </ProductDiv>
    );
}

export default Product;