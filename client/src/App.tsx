import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Resorts from "./pages/resorts/resorts";
import Forum from "./pages/forum/forum";
import Header from "./components/header/header";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css'
import { Provider } from "react-redux";
import store from "./store";
import Sinaia from "./pages/Sinaia/Sinaia";
import PoianaBrasov from "./pages/Poiana-Brasov/Poiana-Brasov";

const App = () => {
  return (
    <MantineProvider>
      <Provider store={store}>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/Sinaia" element={ <Sinaia/>} />
          <Route path="/Poiana-Brasov" element={ <PoianaBrasov/>} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </MantineProvider>
  );
};

export default App;
