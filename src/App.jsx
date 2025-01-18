import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Main from "./components/layouts/Main.jsx";
import Login from "./pages/Login"
import './App.css'
import Register from "./pages/Register.jsx";
import { Provider } from 'react-redux';
import './utils/autoload.js'
import Authstore from "./stores/authStore.js";
import Post from "./pages/Post.jsx";
function App() {
  return (
    <Provider store={Authstore}>
    <BrowserRouter>
      <Routes>
        <Route element={<Main/>}>
           <Route index element={<Home/>} />
           <Route path="/post/:postId" element={<Post/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
