import { useState, useEffect } from "react";

const Add: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [rate, setRate] = useState<number>(0);
    const [category, setCategory] = useState<string>("");

    useEffect (() => {
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
        }
    )
    } , []);

    const handleSubmit = () => {
        var exists = false;
        fetch(`http://localhost:8000/products?q=${name}`)
        .then(res => res.json())
        .then(data => {
            console.log(data, data.length)
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
                        rate: rate,
                        number_of_rates: 1
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.location.href = "/";
                }
                )
            }
            else{
                alert("Product already exists, name too similar or you are not logged in");
            }
        })  
    }

    return (
        <div>
            <h2>Add new items</h2>
            <p>Please enter the name of the item you want to add</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <p>Please enter the image of the item you want to add</p>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
            <p>Please enter the rate of the item you want to add</p>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}/>
            <p>Please enter the category of the item you want to add</p>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
}

export default Add;