import { useState, useEffect } from "react";
import { Container, Modal, Box, Alert, Card, CardContent, Grid, Typography, Button, Input, TextField } from '@mui/material';
import axios from 'axios';
import { Heroes } from '../App';
import { useNavigate } from "react-router-dom";

export default function HeroList({ heroes, isLoggedIn }: { heroes:  Heroes[], isLoggedIn: boolean}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [newHero, setNewHero] = useState({ name: '', shortDescription: '', description: '', power: '' } as Heroes);
    const [alert, setAlert] = useState({
        active: false as boolean,
        content: '' as string,
        severity: 'error' as 'error' | 'success'
    });
    const navigate = useNavigate();

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

    const createNewHero = () => {
        (async () => {
            if(!(newHero.name || newHero.shortDescription || newHero.description || newHero.power)){
                setAlert({active: true, content: 'All fields are required', severity: 'error'});
                return;
            }
          const addHeroResponse = await axios.post(`http://localhost:8000/heroes`, newHero, { withCredentials: true });
          if(addHeroResponse.status === 201){
            setModalOpen(false);
            setAlert({active: true, content: 'Added Hero Successfully', severity: 'success'})
            setTimeout(() => {
               return window.location.href = '/';
            }, 1000)
          }
        })();
      }

    return (
        <Container>
            {alert.active ? <Alert severity={alert.severity}>{alert.content}</Alert> : <></> }
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, backgroundColor: 'white', border: '2px solid #000' }}>
                    {alert.active ? <Alert severity={alert.severity}>{alert.content}</Alert> : <></> }
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ padding: '10px 20px' }}>
                        Add SuperHero
                    </Typography>
                    <Typography id="modal-modal-description" style={{ padding: '10px 20px' }}>
                        <Input type="text" required={true} value = {newHero.name} placeholder="Name" style={{ marginBottom: 10, width: '60%' }} onChange= {(e) => setNewHero({...newHero, name: e.target.value})}/>
                        <Input type="text" required={true} value = {newHero.shortDescription} placeholder="Short Description" style={{ marginBottom: 10, width: '60%' }} onChange= {(e) => setNewHero({...newHero, shortDescription: e.target.value})}/>
                        <TextField type="text" required={true} value = {newHero.description} placeholder="Description" style={{ marginBottom: 10, width: '60%' }} onChange= {(e) => setNewHero({...newHero, description: e.target.value})}/>
                        <Input type="text" required={true} value = {newHero.power} placeholder="Power" style={{ marginBottom: 10, width: '60%' }} onChange= {(e) => setNewHero({...newHero, power: e.target.value})}/>
                        <br/>
                        <Button style={{ marginTop: '20px', color: 'white', background: 'black' }} onClick={() => createNewHero()}>Add Hero</Button>
                    </Typography>
                </Box>
            </Modal>
            <div>
                <Button style = {{ border: '1px solid black', color: 'white', background: 'black', marginTop: '20px' }} onClick = {() => setModalOpen(true)}>Add SuperHero</Button>
            </div>
            <Grid container spacing={2} marginTop={2}>
                {heroes.map((item: Heroes) => {
                    return (
                        <Grid item xs={12} md={12} key={item.id}>
                            <Card sx={{ display: 'flex' }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography component="h2" variant="h5">
                                        <p>{item.id}. <a href={window.location.href + `/${item.id}`}>{item.name}</a></p>
                                    </Typography>
                                    <Typography component="p" variant="body1">
                                        <p><strong>Short Description:</strong> {item.shortDescription}</p>
                                    </Typography>
                                    <Typography component="p" variant="body2">
                                        <p><strong>Description:</strong> {item.description}</p>
                                    </Typography>
                                    <Typography component="h6" variant="h6">
                                        <p><strong>Power:</strong> {item.power}</p>
                                    </Typography>
                                    <Typography component="p" variant="subtitle1">
                                        <p><strong>Created At:</strong> {item.createdAt}</p>
                                    </Typography>
                                    <Typography component="p" variant="subtitle1">
                                        <p><strong>UpdatedAt:</strong> {item.createdAt}</p>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container >
    );
}
