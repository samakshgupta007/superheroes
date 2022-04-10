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

  return (
    <Box sx={{ mt: 10 }}>
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
                  <Route path="/superheroes/:id" element={<HeroDetails/>}>
                  </Route>
              </Routes>
            </BrowserRouter>
        </div>
    </Box>
  );
}

export default App;
