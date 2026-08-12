import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCustomer() {

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [serviceType, setServiceType] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8081/customers",
                {
                    name: name,
                    phoneNumber: phoneNumber,
                    serviceType: serviceType
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                `Customer added successfully! Token: ${response.data.tokenNumber}`
            );

            setName("");
            setPhoneNumber("");
            setServiceType("");

        } catch (error) {

            console.error("Add Customer Error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to add customer"
            );
        }
    };

    return (
        <div className="container mt-5">

            <div className="card shadow p-4 mx-auto"
                 style={{ maxWidth: "500px" }}>

                <h2 className="text-center mb-4">
                    Add Customer
                </h2>

                {message && (
                    <div className="alert alert-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Customer Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter customer name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Service Type
                        </label>

                        <select
                            className="form-select"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            required
                        >
                            <option value="">
                                Select service
                            </option>

                            <option value="Banking">
                                Banking
                            </option>

                            <option value="Account">
                                Account
                            </option>

                            <option value="Loan">
                                Loan
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Add Customer
                    </button>

                </form>

                <button
                    className="btn btn-secondary w-100 mt-3"
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </button>

            </div>

        </div>
    );
}

export default AddCustomer;