import React, { useState, useEffect } from "react";
import { Box, Card, Container, Button, Input, Grid, CardContent, Typography } from "@mui/material";
import axios from "axios";

export interface Heroes {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  power: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [loginDetails, setLoginDetails] = useState({ name: '', password: ''});
  const [heroes, setHeroes] = useState([{"id":1,"name":"Spider-Man","shortDescription":"Spider-like abilities including superhuman strength and the ability to cling to most surfaces.","description":"Spider-Man has spider-like abilities including superhuman strength and the ability to cling to most surfaces. He is also extremely agile and has amazing reflexes. Spider-Man also has a “spider sense,” that warns him of impending danger. Spider-Man has supplemented his powers with technology.","power":"Superhuman strength, Spider web shooting","createdAt":"2022-03-09T21:22:53.536Z","updatedAt":"2022-03-09T21:22:53.536Z"},{"id":2,"name":"Iron Man","shortDescription":"Iron Man is the Armored Avenger - driven by a heart that is part machine, but all hero! He is the INVINCIBLE IRON MAN!","description":"When billionaire industrialist Tony Stark dons his sophisticated steel-mesh armor, he becomes a living high-tech weapon - the world's greatest fighting machine. Tony has primed his ultra modern creation for waging state of the art campaigns, attaining sonic flight, and defending the greater good! He is the Armored Avenger - driven by a heart that is part machine, but all hero! He is the INVINCIBLE IRON MAN!","power":"Ability to project repulsor blasts, Ability to fly","createdAt":"2022-03-09T21:27:23.503Z","updatedAt":"2022-03-09T21:27:23.503Z"},{"id":3,"name":"Captain America","shortDescription":"Injected with an experimental super-serum, the patriotic Steve Rogers emerged from the treatment with heightened endurance, strength, and reaction time.","description":"During WWII, the patriotic Steve Rogers was offered a place in the military's top operation: Rebirth. Injected with an experimental super-serum, Rogers emerged from the treatment with heightened endurance, strength, and reaction time. With extensive training and an indestructible Vibranium shield, Rogers soon became the country's ultimate weapon: CAPTAIN AMERICA! Though frozen in ice during a climactic battle toward the end of the war, Rogers was discovered and revived decades later. Now the living legend continues the war against evil in modern times as a member of The Avengers!","power":"Master hand-to-hand fighter, Equipped with virtually indestructible Vibranium shield","createdAt":"2022-03-09T21:30:06.781Z","updatedAt":"2022-03-09T21:30:06.781Z"},{"id":4,"name":"Black Widow","shortDescription":"Trained extensively in the art of espionage and outfitted with state-of-the-art equipment, Black Widow's combat skills are virtually unmatched.","description":"Natasha Romanoff is the super-spy known as the Black Widow! Trained extensively in the art of espionage and outfitted with state-of-the-art equipment, Black Widow's combat skills are virtually unmatched. One of S.H.I.E.L.D's most valuable agents, she has carried out numerous black-ops missions and has recently been assigned by Director Nick Fury to keep an eye on the Avengers.","power":"Master in the covert arts of espionage, infiltration & subterfuge","createdAt":"2022-03-09T21:31:26.120Z","updatedAt":"2022-03-09T21:31:26.120Z"},{"id":5,"name":"Black Panther","shortDescription":"King TChalla is the Black Panther - a sacred title that must be both inherited & earned by the current Wakandan ruler.","description":"Monarch of the secluded but technologically advanced African nation of Wakanda, King TChalla is the Black Panther; a sacred title that must be both inherited & earned by the current Wakandan ruler. Granted superhuman powers by ceremonially consuming a mystical heart-shaped herb, the Black Panther is responsible for defending his people, and the world, from any threats.","power":"Strength, Speed, Stamina, Reflexes","createdAt":"2022-03-09T21:33:33.311Z","updatedAt":"2022-03-09T21:33:33.311Z"}] as Heroes[])
  const [hero, setHero] = useState({"id":1,"name":"Spider-Man","shortDescription":"Spider-like abilities including superhuman strength and the ability to cling to most surfaces.","description":"Spider-Man has spider-like abilities including superhuman strength and the ability to cling to most surfaces. He is also extremely agile and has amazing reflexes. Spider-Man also has a “spider sense,” that warns him of impending danger. Spider-Man has supplemented his powers with technology.","power":"Superhuman strength, Spider web shooting","createdAt":"2022-03-09T21:22:53.536Z","updatedAt":"2022-03-09T21:22:53.536Z"} as Heroes)
  useEffect(() => {
    (async () => {
      // const heroesListResponse = await axios.get('http://localhost:8000/heroes', )
      // console.log('got it now', heroesListResponse)
    })();
  }, []);

  const login = () => {
    (async () => {
      const loginResponse = await axios.post('http://localhost:8000/login', loginDetails)
      console.log('got here now', loginResponse);
    })();
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Container>
        {/* {alert.active ? <Alert severity={alert.severity}>{alert.content}</Alert> : <></> } */}
        <h3>Login</h3>
        <Card>
          <div style = {{ padding: 30 }}>
            <Input type="text" value = {loginDetails.name} placeholder="Username" style={{ marginBottom: 10, width: '60%' }} onChange= {(e) => setLoginDetails({...loginDetails, name: e.target.value})}/>
            <br/>
            <Input type="password" value = {loginDetails.password} placeholder="Password" style={{ marginTop: 10, width: '60%' }} onChange= {(e) => setLoginDetails({...loginDetails, password: e.target.value})}/>
            <div>
              <Button style = {{ border: '1px solid black', color: 'white', background: 'black', marginTop: '20px' }} onClick = {() => login()}>Submit</Button>
            </div>
          </div>
        </Card>
        <Grid item xs={12} md={12} key={hero.id}>
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1, textAlign: 'center' }}>
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
                </CardContent>
            </Card>
        </Grid>
        <Grid container spacing={2} marginTop={2}>
            {heroes.map((item: Heroes, i: number) => {
                return (
                    <Grid item xs={12} md={12} key={item.id}>
                        <Card sx={{ display: 'flex' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                    <p>{item.id}. {item.name}</p>
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
    </Box>
  );
}

export default App;
