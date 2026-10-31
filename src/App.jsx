import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../firebase/AuthContext";
import ProtectedRoute from "../firebase/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders"
import Chat from "./pages/Chat";
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
          <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
