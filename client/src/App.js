import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components'
import { PageLayout } from './components/PageLayout/PageLayout';
import { UserContextWrapper} from './contexts/UserContextWrapper';
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
    <UserContextWrapper>
      <Title>Events</Title>

      <Routes>
        <Route  path="/" element={<PageLayout/>}>
          <Route index element={<Events/>} />
        </Route>

        <Route path="/register" element = {<Register/>}/>
        <Route path="/login" element = {<Login/>}/>

      </Routes>
    </UserContextWrapper>
  );
}

export default App;