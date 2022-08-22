import { useEffect, useState } from "react";

const Search: React.FC = () => {
    
    type Product = {
        id: number;
        name: string;
    };

    const [products, setProducts] = useState<Product[]>([]);

    useEffect (() => {
        const query: string = window.location.href.split("?q=")[1];
        var filteredProducts: Product[] = [];
        fetch('http://localhost:8000/products')
        .then(res => res.json())
        .then(data => {
            for(let i = 0; i < data.length; i++) {
                if(data[i].name.toLowerCase().includes(query.toLowerCase())) {
                    const product = {id: data[i].id, name: data[i].name};
                    filteredProducts.push(product);
                }
            }
        setProducts(filteredProducts);
        })
    }, [])

    return (
        <div>
            <h1>rateme</h1>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <p>{product.name}</p>
                        <a href={`product?q=${product.id}`}>Go to</a>
                    </div>
            ))}
            </div>
        </div>
    );
}

export default Search;