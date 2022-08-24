import {useState} from 'react';

const Register: React.FC = () => {

    var generateToken = () => {
        const token1 = Math.random().toString(36)
        const token2 = Math.random().toString(36)
        const finalToken = token1.concat(token2)
        fetch(`http://localhost:8000/users?token=${finalToken}`)
        .then(res => res.json())
        .then(data => {
            if(data.length === 0){
                return finalToken
            }
            else{
                generateToken()
            }
        })
    };
    
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const createAccount = () => {
        fetch(`http://localhost:8000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                token: generateToken()
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                alert(data.error)
            }
            else{
                localStorage.setItem("username", username);
                window.location.href = "/";
            }
        }).catch(err => {
            alert(err)
        }
        )
    
    }

    return ( 
        <div>
            <h1>Register</h1>
            <p>Please enter your username and password</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => createAccount()}>Register</button>
        </div>
    );
}

export default Register;