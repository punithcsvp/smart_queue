import { useEffect, useState } from "react";
import axios from "axios";

function Queue() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    // Get waiting customers
    const fetchQueue = async () => {

        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:8081/customers/queue",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCustomers(response.data);

        } catch (error) {

            console.error("Queue Error:", error);

            if (error.response?.status === 401) {
                setMessage("Session expired. Please login again.");
            } else if (error.response?.status === 403) {
                setMessage("You do not have permission to view the queue.");
            } else {
                setMessage("Unable to load queue.");
            }

        } finally {
            setLoading(false);
        }
    };


    // Call next customer
    const callNextCustomer = async () => {

        try {

            const response = await axios.put(
                "http://localhost:8081/customers/next",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                `Token ${response.data.tokenNumber} is now being served.`
            );

            fetchQueue();

        } catch (error) {

            console.error("Call Next Error:", error);

            if (error.response?.status === 403) {
                setMessage("You do not have permission to call the next customer.");
            } else if (error.response?.status === 500) {
                setMessage("Queue is empty.");
            } else {
                setMessage("Unable to call next customer.");
            }
        }
    };


    // Complete customer
    const completeCustomer = async (id) => {

        try {

            const response = await axios.put(
                `http://localhost:8081/customers/${id}/complete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                `Token ${response.data.tokenNumber} completed successfully.`
            );

            fetchQueue();

        } catch (error) {

            console.error("Complete Error:", error);

            if (error.response?.status === 403) {
                setMessage("You do not have permission.");
            } else {
                setMessage("Unable to complete customer.");
            }
        }
    };


    // Load queue when page opens
    useEffect(() => {
        fetchQueue();
    }, []);


    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1 className="fw-bold">
                    Queue Management
                </h1>

                <div>

                    <button
                        className="btn btn-primary me-2"
                        onClick={callNextCustomer}
                    >
                        📞 Call Next
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={fetchQueue}
                    >
                        🔄 Refresh
                    </button>

                </div>

            </div>


            {/* Message */}

            {message && (

                <div className="alert alert-info">
                    {message}
                </div>

            )}


            {/* Loading */}

            {loading ? (

                <div className="text-center">
                    <h4>Loading queue...</h4>
                </div>

            ) : customers.length === 0 ? (

                <div className="alert alert-success">
                    No customers are currently waiting.
                </div>

            ) : (

                <div className="card shadow">

                    <div className="card-body">

                        <table className="table table-hover">

                            <thead>

                                <tr>
                                    <th>Token</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>

                                {customers.map((customer) => (

                                    <tr key={customer.id}>

                                        <td>
                                            <strong>
                                                {customer.tokenNumber}
                                            </strong>
                                        </td>

                                        <td>
                                            {customer.name}
                                        </td>

                                        <td>
                                            {customer.phoneNumber}
                                        </td>

                                        <td>
                                            {customer.serviceType}
                                        </td>

                                        <td>

                                            <span className="badge bg-warning text-dark">
                                                {customer.status}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() =>
                                                    completeCustomer(customer.id)
                                                }
                                            >
                                                ✓ Complete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Queue;