import { useState, useEffect } from 'react';

const Header: React.FC = () => {
   
    const [search, setSearch] = useState<string>("");

    const handleSearch = () => {
        window.location.href = `search?q=${search}`;
    }

    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:8000/users?token=${token}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.length === 0){
                setUsername("");
            }
            else{
                setUsername(data[0].name);
            }
        })
    } , []);

    return (
        <div>
            Rate.me
            <input type="text"  onChange={(e) => setSearch(e.target.value)}/> 
            <button onClick={handleSearch}>Search</button>
            {username === "" ? <a href='/login'>Login</a> : <div><p>Welcome, {username}</p><a href='/login'>Logout</a></div>}
            {username !== "" ? <a href='/add'>Add</a> : <div></div>}
            
        </div>
    );
}

export default Header;