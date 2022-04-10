import { useState, useEffect } from "react";
import { Container, Card, CardContent, Grid, Typography, Alert, Button } from '@mui/material';
import { Heroes } from '../App';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function HeroList() {

    const [hero, setHero] = useState({ name: '', shortDescription: '', description: '', power: '' } as Heroes)
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const heroId = window.location.href.split('superheroes/')[1];
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const heroDetailsResponse = await axios.get(`http://localhost:8000/heroes/${heroId}`, { withCredentials: true })
                if(heroDetailsResponse.status === 401){
                    setIsLoggedIn(false);
                }
                else if(heroDetailsResponse.status === 200){
                    if(!heroDetailsResponse.data){
                        navigate("/superheroes");
                    } else {
                        setHero(heroDetailsResponse.data);
                    }
                } else {
                    setAlert({active: true, content: 'Unable to fetch superhero details', severity: 'error'});
                }
            } catch {
                setAlert({active: true, content: 'Unable to fetch superhero details', severity: 'error'});
            }
        })();
    }, []);

    const deleteSuperHero = () => {
    (async () => {
        const deleteHeroResponse = await axios.delete(`http://localhost:8000/heroes/${heroId}`, { withCredentials: true })
        if(deleteHeroResponse.status === 200){
            setAlert({active: true, content: 'Deleted superhero successfully', severity: 'success'});
            navigate("/superheroes");
        } else {
            setAlert({active: true, content: 'Unable to delete the superhero. Please try again', severity: 'error'});
        }
    })();
    }

    const [alert, setAlert] = useState({
        active: false as boolean,
        content: '' as string,
        severity: 'error' as 'error' | 'success'
    });

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/login");
        }
        if(alert.active){
            setTimeout(() => {
                setAlert({active: false, content: '', severity: 'error'})
            }, 3000)
        }
    }, [alert]);

    return (
        <Container>
            <Grid item xs={12} md={12} key={hero.id}>
                {alert.active ? <Alert severity={alert.severity}>{alert.content}</Alert> : <></> }
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1, textAlign: 'center' }}>
                        <img src = "data:image/jpeg;base64,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" />
                        <Typography component="h2" variant="h5">
                            <p>{hero.name}</p>
                        </Typography>
                        <Typography component="h5" variant="h5">
                            <p><strong>Power:</strong> {hero.power}</p>
                        </Typography>
                        <Typography component="h6" variant="h6">
                            <p>{hero.shortDescription}</p>
                        </Typography>
                        <Typography component="p" variant="body1">
                            <p><strong>Description:</strong> {hero.description}</p>
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            <p><strong>Created At:</strong> {hero.createdAt}</p>
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            <p><strong>UpdatedAt:</strong> {hero.createdAt}</p>
                        </Typography>
                         <div>
                            <Button style = {{ border: '1px solid red', color: 'white', background: 'red', marginTop: '20px' }} onClick = {() => deleteSuperHero()}>Delete SuperHero</Button>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Container >
    );
}
