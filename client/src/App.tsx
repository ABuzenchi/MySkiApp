import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Resorts from "./pages/resorts/resorts";
import Forum from "./pages/forum/forum";


const App=() =>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/resorts" element={<Resorts/>}/>
      <Route path="/forum" element={<Forum/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
