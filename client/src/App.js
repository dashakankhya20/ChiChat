import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Register, Chat, Login, SetAvatar } from "./pages";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/setAvatar" element={<SetAvatar />} />
      <Route path="/" element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
