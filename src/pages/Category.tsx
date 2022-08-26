import { useState, useEffect } from 'react'
import { ProductListDiv, QueryDisplay, SearchPageDiv, SearchProductLink, SingleItemRate, SingleItemTitle, SingleProductDiv, SingleProductImageDiv, SingleProductImg } from '../styles/styles';

const Category: React.FC = () => {

    type Product = {
        id: number;
        name: string;
        image: string;
        rate: number;
    };

    
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<string>("");

    useEffect (() => {
        const query: string = window.location.href.split("?q=")[1];
        setCategory(query);
        fetch(`http://localhost:8000/products?category=${query}`)
        .then(res => res.json())
        .then(data => {
            var productList: Product[] = [];
            for(let i = 0; i < data.length; i++){
                var rate = 0;
                for(let j = 0; j < data[i].rate.length; j++){
                    rate += data[i].rate[j].rate;
                }
                rate = rate / data[i].rate.length;
                productList.push({
                    id: data[i].id,
                    name: data[i].name,
                    image: data[i].image,
                    rate: rate
                });
            }
                    
            setProducts(productList);
        }
        )
    } , []);

    return (
        <SearchPageDiv>
            <QueryDisplay>Searching {category}:</QueryDisplay>
            <ProductListDiv>
                {products.map(product => (
                        <SingleProductDiv key={product.id}>
                            <SingleItemTitle>{product.name}</SingleItemTitle>
                            <SingleProductImageDiv>
                                <SingleProductImg src={product.image} alt={product.name}/>
                            </SingleProductImageDiv>
                            <SingleItemRate>{Math.round(Number(product.rate))/2}/5</SingleItemRate>
                            <SearchProductLink href={`product?q=${product.id}`}>Go to</SearchProductLink>
                        </SingleProductDiv>
                ))}
            </ProductListDiv>
        </SearchPageDiv>
    );
}

export default Category;