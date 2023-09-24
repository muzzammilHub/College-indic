import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/loginpage' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
