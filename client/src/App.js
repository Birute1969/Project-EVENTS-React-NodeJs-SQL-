import { Route, Routes } from 'react-router';
import styled from 'styled-components'
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { Events } from './pages/Events/Events';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;


function App() {
  return (
    <div>
      <Title>Events</Title>
      <Routes>
        <Route path='/'/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;