import { useState, useEffect } from 'react';
import { HeaderDiv, Input, LinkButton, Title, UserInfo, UserInfoP } from '../styles/styles';

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
            if(data.length === 0){
                setUsername("");
            }
            else{
                setUsername(data[0].username);
            }
        })
    } , []);

    return (
        <HeaderDiv>
            <a href="/"><Title>rate.me</Title></a>
            <Input placeholder="Search..." type="text"  onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === "Enter"){handleSearch()}}}/> 
            {username !== "" ? <LinkButton href='/add'>Add item</LinkButton> : <div></div>}
            {username === "" ? <LinkButton href='/login'>Login</LinkButton> : <UserInfo><UserInfoP>Welcome, {username}</UserInfoP><LinkButton href='/login'>Logout</LinkButton></UserInfo>}
            
        </HeaderDiv>
    );
}

export default Header;