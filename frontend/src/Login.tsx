import { useState, useEffect } from "react";
import { Container, Input, Card, Button, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

export default function Login({isLoggedIn}: {isLoggedIn: boolean}) {

    const [loginDetails, setLoginDetails] = useState({ name: '', password: ''});
    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        active: false as boolean,
        content: '' as string,
        severity: 'error' as 'error' | 'success'
    });

    useEffect(() => {
        if(isLoggedIn){
            navigate('/superheroes');
        }
        if(alert.active){
            setTimeout(() => {
                setAlert({active: false, content: '', severity: 'error'})
            }, 3000)
        }
    }, [alert, isLoggedIn]);

    const login = () => {
        (async () => {
            try {
                const loginResponse = await axios.post('http://localhost:8000/login', loginDetails, { withCredentials: true })
                if(loginResponse.status === 201){
                    return window.location.href = '/superheroes'
                } else {
                    // eslint-disable-next-line no-throw-literal
                    throw 'error';
                }
            } catch {
                setAlert({active: true, content: 'Login failed. Please try again', severity: 'error'})
            }
        })();
    }

    return (
        <Container>
            <h3>Login</h3>
            <Card>
                {alert.active ? <Alert severity={alert.severity}>{alert.content}</Alert> : <></> }
                <div style = {{ padding: 30 }}>
                    <Input type="text" value = {loginDetails.name} placeholder="Username" style={{ marginBottom: 10, width: '60%' }} onChange= {(e) => setLoginDetails({...loginDetails, name: e.target.value})}/>
                    <br/>
                    <Input type="password" value = {loginDetails.password} placeholder="Password" style={{ marginTop: 10, width: '60%' }} onChange= {(e) => setLoginDetails({...loginDetails, password: e.target.value})}/>
                    <div>
                    <Button style = {{ border: '1px solid black', color: 'white', background: 'black', marginTop: '20px' }} onClick = {() => login()}>Submit</Button>
                    </div>
                </div>
            </Card>
        </Container >
    );
}
