import React,{useEffect,useState} from "react";
import './App.css'
import { Routes, Route,Navigate } from "react-router-dom";
import PageNotFound from "./components/pages/PageNotFound";
import Home from "./components/pages/Home/Home";
import Header from "./components/pages/header/Header"
import Footer from "./components/pages/footer/Footer";
import Login from "./components/core/login/Login";
import Cropform from "./components/pages/predictions/crop prediction/Cropform";
import TopCrops from './components/pages/predictions/crop prediction/TopCrops';

// import CropVarieties from "./components/pages/predictions/crop prediction/cropVarieties";
import CropVarietyFinder from "./components/pages/predictions/crop prediction/CropVarietyFinder";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
        <Header/>
        <div className="px-3 py-16">

<Routes>
 
  <Route path="/login" element={<Login/>} />
  <Route path="/cropform" element={<Cropform/>} />
  <Route path="/crop-prediction/top-crops" element={<TopCrops />} />
  <Route path="/" element={isAuthenticated ? <Navigate to="/login" />: <Home /> } />
  <Route path="/cropvarietyfinder" element={<CropVarietyFinder/>} />
  {/* <Route path="/cropvarieties" element={<CropVarieties/>} /> */}
  <Route path="*" element={<PageNotFound />} />
</Routes>
</div>

<Footer />
     
    </>
  )
}

export default App
