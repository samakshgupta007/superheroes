import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import HeroList from './Hero/HeroList';
import HeroDetails from './Hero/HeroDetails';
import Login from './Login';
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export interface Heroes {
  id?: number;
  name: string;
  shortDescription: string;
  description: string;
  power: string;
  createdAt?: string;
  updatedAt?: string;
}

function App() {
  const [heroes, setHeroes] = useState([{}] as Heroes[])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const heroesListResponse = await axios.get('http://localhost:8000/heroes', { withCredentials: true })
      if(heroesListResponse.status === 200){
        setIsLoggedIn(true);
        setHeroes(heroesListResponse.data);
      }
    })();
  }, []);

  const deleteSuperHero = () => {
    (async () => {
      // const deleteHeroResponse = await axios.delete(`http://localhost:8000/heroes/${window.location.params.id}`)
      // console.log('got here now delete function', deleteHeroResponse);
    })();
  }

  return (
    <Box sx={{ mt: 10 }}>
      <Container>
        {/* <div>
          <Button style = {{ border: '1px solid black', color: 'white', background: 'black', marginTop: '20px' }} onClick = {() => deleteSuperHero()}>Delete SuperHero</Button>
        </div> */}
        </Container >
        <div>
            <BrowserRouter>
              <Routes>
                { isLoggedIn ?
                <Route
                  path="/"
                  element={
                    <Navigate to={'/login'} />
                  }
                /> :
                <Route
                  path="/"
                  element={
                    <Navigate to={'/superheroes'} />
                  }
                />
                }
              </Routes>
              <Routes>
                  <Route path="/login" element={<Login isLoggedIn = {isLoggedIn}/>}>
                  </Route>
              </Routes>
              <Routes>
                  <Route path="/superheroes" element={<HeroList heroes={heroes} isLoggedIn={isLoggedIn}/>}>
                  </Route>
              </Routes>
              <Routes>
                  <Route path="/superheroes/:id" element={<HeroDetails isLoggedIn={isLoggedIn}/>}>
                  </Route>
              </Routes>
            </BrowserRouter>
        </div>
    </Box>
  );
}

export default App;
