import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Forum from "./pages/forum/forum";
import Header from "./components/header/header";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import store from "./store";
import PoianaBrasov from "./pages/Poiana-Brasov/Poiana-Brasov";
import Straja from "./pages/Straja/Straja";
import Transalpina from "./pages/Transalpina/Transalpina";
import SuccessPage from "././pages/succes/succes";
import ChatBox from "./components/chat/chat";
import { UploadVideo } from "./components/uploadVideo/uploadVideo";
import ResortPage from "./pages/ResortPage/ResortPage";

const App = () => {
  return (
    <MantineProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
           <Route path="/resorts/:name" element={<ResortPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/chat" element={<ChatBox />} />
            <Route path="/analyzer" element={<UploadVideo />} />
            
          </Routes>
        </BrowserRouter>
      </Provider>
    </MantineProvider>
  );
};

export default App;
