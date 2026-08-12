import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Queue from "./pages/Queue";
import AddCustomer from "./pages/AddCustomer";
import Customers from "./pages/Customers";
import CustomerPortal from "./pages/CustomerPortal";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";


function AppContent() {

    const location = useLocation();

    return (

        <>

           {/* Show Navbar except Login and Customer Portal */}
{location.pathname !== "/" &&
 location.pathname !== "/customer" &&
 <Navbar />}


            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Login />}
                />


                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Queue */}
                <Route
                    path="/queue"
                    element={
                        <ProtectedRoute>
                            <Queue />
                        </ProtectedRoute>
                    }
                />


                {/* Customers */}
                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    }
                />


                {/* Add Customer */}
                <Route
                    path="/add-Customers"
                    element={
                        <ProtectedRoute>
                            <AddCustomer />
                        </ProtectedRoute>
                    }
                />


                {/* Unknown URL */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />
                {/* Customer Portal - Public */}
<Route
    path="/customer"
    element={<CustomerPortal />}
/>

            </Routes>

        </>

    );
}


function App() {

    return (

        <BrowserRouter>

            <AppContent />

        </BrowserRouter>

    );
}


export default App;