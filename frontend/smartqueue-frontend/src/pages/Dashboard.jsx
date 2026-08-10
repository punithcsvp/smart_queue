import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:8081/customers/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("Dashboard Data:", response.data);

                setDashboard(response.data);

            } catch (error) {

                console.error("Dashboard Error:", error);

                setError("Unable to load dashboard");

            }
        };

        fetchDashboard();

    }, []);

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!dashboard) {
        return <h2>Loading Dashboard...</h2>;
    }

    return (
        <div className="container mt-4">

            <h1 className="mb-4">
                Smart Queue Dashboard
            </h1>

            <div className="row">

                <div className="col-md-3">
                    <div className="card shadow p-3">
                        <h5>Total Customers</h5>
                        <h2>{dashboard.totalCustomers}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3">
                        <h5>Waiting</h5>
                        <h2>{dashboard.waitingCustomers}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3">
                        <h5>Serving</h5>
                        <h2>{dashboard.servingCustomers}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3">
                        <h5>Completed</h5>
                        <h2>{dashboard.completedCustomers}</h2>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;