import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Resorts from "./pages/resorts/resorts";
import Forum from "./pages/forum/forum";
import Header from "./components/header/header";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
