import { useState, useEffect } from 'react';
import { LoginContainer, LoginTitle, CreateAccountLink, FormItem, FormItemLabel, FormItemInput, LoginDiv, FormButton, LoginImages} from '../styles/styles';
import astro from '../assets/astro.svg';

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
        <LoginDiv>   
            <LoginContainer>
                <LoginTitle>Login</LoginTitle>
                <FormItem>
                    <FormItemLabel>Username</FormItemLabel>
                    <FormItemInput type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <FormItemLabel>Password</FormItemLabel>
                    <FormItemInput type="password" placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormItem>
                <FormButton onClick={() => checkLogin()}>Login</FormButton>
            </LoginContainer>
            <CreateAccountLink href="/register">Don't have an account? Register here</CreateAccountLink>
            <LoginImages src={astro} alt=''/>
        </LoginDiv>
    );
}

export default Login;