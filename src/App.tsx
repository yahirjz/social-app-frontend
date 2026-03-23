import { Routes, Route } from "react-router-dom";
import Login  from "./pages/Login"
import  Register  from "./pages/Register"
import Feed from "./pages/Feed";
import Profile from "./pages/Profile"

function App(){
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
        </Routes>
    )
}

export default App;