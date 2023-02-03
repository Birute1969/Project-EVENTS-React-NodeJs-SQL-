import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { PageLayout } from './components/PageLayout/PageLayout';
import { Events } from './pages/Events/Events';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

function App() {
  const navigate = useNavigate();
  const[user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
    navigate('/');
  }

  return (
    <div>
      <Title>Events</Title>

      <Routes>
        <Route  path="/" element={<PageLayout user={user}/>}>
          <Route index element={<Events/>} />
        </Route>

        <Route path="/register" element = {<Register/>}/>
        <Route path="/login" element = {<Login onSuccess={handleLoginSuccess}/>}/>

      </Routes>
      
    </div>
  );
}

export default App;