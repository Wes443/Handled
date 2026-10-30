import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../firebase/AuthContext";
import ProtectedRoute from "../firebase/ProtectedRoute";

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
