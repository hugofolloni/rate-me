import { useState, useEffect } from "react";

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
                .then(() => {
                    window.location.href = "/";
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
        <div>
            <h2>Add new items</h2>
            <p>Name</p>
            <input type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)}/>
            <p>Link to image</p>
            <input type="text" placeholder="Link to image..." value={image} onChange={(e) => setImage(e.target.value)}/>
            <p>Rate</p>
            <div className="stars" style={{display: 'flex', flexDirection: 'row'}}>
            {
                stars.map((star, index) => {
                    return (
                        <div key={index} onClick={() => {
                            const newRate = star.value
                            setRate(newRate);
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
            </div>
            <p>Category</p>
            <div className='categories' style={{display: 'flex', flexDirection: 'row'}}>
            {
                categories.map((tCategory, index) => {
                    if(category === tCategory){
                        return <div style={{border: '1px solid red', width: '100px'}} onClick={() => setCategory(tCategory)}>{tCategory}</div>
                    }
                    else{
                        return <div style={{border: '1px solid black',  width: '100px'}} onClick={() => setCategory(tCategory)}>{tCategory}</div>
                    }
                })
            }
            </div>
            <button onClick={handleSubmit}>Add</button>
            
        </div>
    );
}
export default Add;