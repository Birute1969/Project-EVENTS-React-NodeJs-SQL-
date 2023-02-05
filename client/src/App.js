import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/PageLayout';
import { UserContextWrapper} from './contexts/UserContextWrapper';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { Events } from './pages/Events/Events';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

function App() {
  return (
    <UserContextWrapper>
      <Routes>
        <Route  path="/" element={<PageLayout/>}>
          <Route index element={<Events/>} />
        </Route>

        <Route path="/register" element = {<Register/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </UserContextWrapper>
  );
}

export default App;