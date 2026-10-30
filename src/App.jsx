import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../firebase/AuthContext";
import ProtectedRoute from "../firebase/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./css/global.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Login/>} />

          {/* protected routes */}
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
