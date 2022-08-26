import { useState, useEffect } from "react";
import adding from "../assets/adding.svg"
import { AddItemDiv, AddItemTitle, LoginImages, CategorySelector, CategorySelectorDiv, FormButton, FormItem, FormItemInput, FormItemLabel, StarDiv } from "../styles/styles";

const Add: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [rate, setRate] = useState<number>(0);
    const [category, setCategory] = useState<string>("Electronics");

    type Star = {
        value: number;
        color: string;
    }

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

    useEffect (() => {
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
        }
    )
    } , []);

    const handleSubmit = () => {
        var exists = false;
        fetch(`http://localhost:8000/products?q=${name}`)
        .then(res => res.json())
        .then(data => {
            if(data.length === 0){
                exists = false;
            }
            else{
                exists = true;
            }
        })
        .then(() => {
            if(username !== "" && name !== "" && image !== "" && category !== "" && !exists){
                fetch(`http://localhost:8000/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        created: username,
                        image: image,
                        comments: [],
                        category: category,
                        rate: [{
                            rate: rate,
                            user: username
                        }],
                        number_of_rates: 1
                    })
                })
                .then(res => res.json())
                .then(data => {
                    const id = data.id;
                    window.location.href = `product?q=${id}`;
                }
                )
            }
            else{
                alert("Product already exists, name too similar or you are not logged in");
            }
        })  
    }

    const categories = ["Electronics", "Clothes", "Books", "Sports", "Music", "Games", "Decoration", "Other"];

    return (
        <AddItemDiv>
            <AddItemTitle style={{margin: '0'}}>Add item</AddItemTitle>
            <FormItem>
                <FormItemLabel>Name</FormItemLabel>
                <FormItemInput type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)}/>
            </FormItem>
            <FormItem>
                <FormItemLabel>Link to image</FormItemLabel>
                <FormItemInput type="text" placeholder="Link to image..." value={image} onChange={(e) => setImage(e.target.value)}/>
            </FormItem>
            <FormItem>
                <FormItemLabel>Rate</FormItemLabel>
                <div className="stars" style={{display: 'flex', flexDirection: 'row'}}>
                {
                    stars.map((star, index) => {
                        return (
                            <div key={index} onClick={() => {
                                const newRate = star.value
                                setRate(newRate);
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
                </div>
            </FormItem>
            <FormItem>
                <FormItemLabel>Category</FormItemLabel>
                <CategorySelectorDiv>
                {
                    categories.map((tCategory) => {
                        if(category === tCategory){
                            return <CategorySelector style={{color: "56203D", borderColor: "#56203D", fontWeight: '600'}} onClick={() => setCategory(tCategory)}>{tCategory}</CategorySelector>
                        }
                        else{
                            return <CategorySelector onClick={() => setCategory(tCategory)}>{tCategory}</CategorySelector>
                        }
                    })
                }
                </CategorySelectorDiv>
            </FormItem>
            <FormButton onClick={handleSubmit}>Add</FormButton>
            <LoginImages src={adding} alt=''/>
        </AddItemDiv>
    );
}
export default Add;