import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../firebase/AuthContext";
import ProtectedRoute from "../firebase/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import Chat from "./pages/Chat";
import OrderDetails from "./pages/OrderDetails";
import Report from "./pages/Report";
import RecurringReport from "./pages/RecurringReport";
import PendingOrders from "./pages/PendingOrders";
import PastOrders from "./pages/PastOrders";
import UpcomingOrders from "./pages/UpcomingOrders"

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
          <Route path="/create-order" element={<ProtectedRoute><CreateOrder/></ProtectedRoute>} />
          <Route path="/order-details" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
          <Route path="/report-issue" element={<ProtectedRoute><Report/></ProtectedRoute>} />
          <Route path="/report-recurring-issue" element={<ProtectedRoute><RecurringReport/></ProtectedRoute>} />
          <Route path="/past-orders" element={<ProtectedRoute><PastOrders/></ProtectedRoute>} />
          <Route path="/upcoming-orders" element={<ProtectedRoute><UpcomingOrders/></ProtectedRoute>} />
          <Route path="/pending-orders" element={<ProtectedRoute><PendingOrders/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
