import { useState, useEffect } from 'react';

const Login: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        localStorage.removeItem("token");
    } , []);

    const checkLogin = () => {
        fetch(`http://localhost:8000/users?q=${username}`)
        .then(res => res.json())
        .then(data => {
            if(data.length === 0){
                alert("User not found or password is incorrect");
                setUsername("");
                setPassword("");
            }
            else{
                if(data[0].password === password){
                    localStorage.setItem("token", data[0].token);
                    window.location.href = "/";
                }
                else{
                    alert("User not found or password is incorrect");
                    setUsername("");
                    setPassword("");
                }
            }
        })
    }


    return (
        <div>
            <h1>Login</h1>
            <h3>Username</h3>
            <input type="text" placeholder='login' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <h3>Password</h3>
            <input type="password" placeholder='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => checkLogin()}>Login</button>
            <a href="/register">Don't have an account? Register here</a>
        </div>
    );
}

export default Login;