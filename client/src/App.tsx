import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Forum from "./pages/forum/forum";
import Header from "./components/header/header";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import store from "./store";
import Sinaia from "./pages/Sinaia/Sinaia";
import PoianaBrasov from "./pages/Poiana-Brasov/Poiana-Brasov";
import Straja from "./pages/Straja/Straja";
import Transalpina from "./pages/Transalpina/Transalpina";
import SuccessPage from "./pages/succes";
import ChatBox from "./components/chat/chat";
import { UploadVideo } from "./components/uploadVideo/uploadVideo";

const App = () => {
  return (
    <MantineProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/Sinaia" element={<Sinaia />} />
            <Route path="/Poiana Brașov" element={<PoianaBrasov />} />
            <Route path="/Straja" element={<Straja />} />
            <Route path="/Transalpina" element={<Transalpina />} />
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
