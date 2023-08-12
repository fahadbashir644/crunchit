import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import HireNow from './Components/HireNow/HireNow';
import Main from './Components/Main/Main';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/hirenow" element={<HireNow />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
