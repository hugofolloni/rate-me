import { useState, useEffect } from 'react'

const Category: React.FC = () => {

    type Product = {
        id: number;
        name: string;
    };

    
    const [products, setProducts] = useState<Product[]>([]);

    useEffect (() => {
        const query: string = window.location.href.split("?q=")[1];
        fetch(`http://localhost:8000/products?category=${query}`)
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        }
        )
    } , []);

    return (
        <div>
            <h1>Category</h1>
            {products.map(product => (
                    <div key={product.id}>
                        <p>{product.name}</p>
                        <a href={`product?q=${product.id}`}>Go to</a>
                    </div>
            ))}
        </div>
    );
}

export default Category;