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
                const comment = {user: product.comments[i].user, comment: product.comments[i].text};
                commentList.push(comment);
            }
            console.log(commentList)
            setProduct({id: product.id, name: product.name, image: product.image, rate: product.rate / 2, comments: commentList});
        })
    } , []);


    return (
        <div>
            <div>
                <p>{product?.name}</p>
                <img src={product?.image} alt={product?.name}/>
                <p>{product?.rate} stars</p>
                {
                    product?.comments.map(comment => (
                        <div key={comment.user}>
                            <p>{comment.user}</p>
                            <p>{comment.comment}</p>
                        </div>
                    ))
                }            
            </div>
        </div>
    );
}

export default Product;