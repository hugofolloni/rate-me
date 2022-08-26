import {useState} from 'react';
import { sha1, sha256, sha512 } from 'crypto-hash';
import { LoginImages, LoginContainer, LoginTitle, FormItem, FormItemLabel, FormItemInput, LoginDiv, FormButton} from '../styles/styles';
import aircraft from '../assets/aircraft.svg';


const Register: React.FC = () => {
    
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const createAccount = async () => {
        const firstToken = await sha256(username)
        const secondToken = await sha512(firstToken)
        var realToken = await sha1(secondToken)
        fetch(`http://localhost:8000/users?token=${realToken}`)
        .then(res => res.json())
        .then(data => {
            if(data.length !== 0){
                alert("Username already exists")
                realToken = "";
            }
        })
        .then(() => {
        if(realToken === ""){
            alert("Invalid username")
        }
        else if (username === "" || password === "" || email === ""){
            alert("Please fill in all fields")
        }
        else{
            fetch(`http://localhost:8000/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    token: realToken
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    alert(data.error)
                }
                else{
                    localStorage.setItem("token", realToken);
                    window.location.href = "/";
                }
            }).catch(err => {
                alert(err)
            }
            )
        }
    })  
    
    }

    return ( 
        <LoginDiv>   
        <LoginContainer>
            <LoginTitle>Register</LoginTitle>
            <FormItem>
                <FormItemLabel>Username</FormItemLabel>
                <FormItemInput type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </FormItem>
            <FormItem>
                <FormItemLabel>Email</FormItemLabel>
                <FormItemInput type="email" placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
            </FormItem>
            <FormItem>
                <FormItemLabel>Password</FormItemLabel>
                <FormItemInput type="password" placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormItem>
            <FormButton onClick={() => createAccount()}>Register</FormButton>
            </LoginContainer>
            <LoginImages src={aircraft} alt=''/>
        </LoginDiv>
    );
    	
}
export default Register;