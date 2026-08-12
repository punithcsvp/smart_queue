import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [searchType, setSearchType] = useState("name");
    const [searchValue, setSearchValue] = useState("");

    // Edit customer
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    const token = localStorage.getItem("token");


    // Get all customers
    const fetchCustomers = async () => {

        try {

            setLoading(true);
            setMessage("");

            const response = await axios.get(
                "http://localhost:8081/customers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCustomers(response.data);

        } catch (error) {

            console.error("Customers Error:", error);

            if (error.response?.status === 401) {
                setMessage("Session expired. Please login again.");
            } else if (error.response?.status === 403) {
                setMessage("You do not have permission to view customers.");
            } else {
                setMessage("Unable to load customers.");
            }

        } finally {
            setLoading(false);
        }
    };


    // Search customers
    const searchCustomers = async () => {

        if (!searchValue.trim()) {
            fetchCustomers();
            return;
        }

        try {

            setLoading(true);
            setMessage("");

            let url = "";

            if (searchType === "name") {

                url =
                    `http://localhost:8081/customers/search/name/${encodeURIComponent(searchValue)}`;

            } else if (searchType === "phone") {

                url =
                    `http://localhost:8081/customers/search/phone/${encodeURIComponent(searchValue)}`;

            } else if (searchType === "token") {

                url =
                    `http://localhost:8081/customers/token/${searchValue}`;

            }


            const response = await axios.get(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            // Name returns a List
            if (searchType === "name") {

                setCustomers(response.data);

                if (response.data.length === 0) {
                    setMessage("No customer found.");
                }

            }

            // Phone and token return a single customer
            else {

                if (response.data) {
                    setCustomers([response.data]);
                } else {
                    setCustomers([]);
                    setMessage("No customer found.");
                }

            }

        } catch (error) {

            console.error("Search Error:", error);

            if (error.response?.status === 404) {

                setCustomers([]);
                setMessage("No customer found.");

            } else if (error.response?.status === 403) {

                setMessage(
                    "You do not have permission to search customers."
                );

            } else {

                setMessage("Unable to search customers.");

            }

        } finally {

            setLoading(false);

        }
    };


    // Update customer
    const updateCustomer = async () => {

        try {

            await axios.put(
                `http://localhost:8081/customers/${editingCustomer.id}`,
                editingCustomer,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Customer updated successfully.");

            setShowEdit(false);
            setEditingCustomer(null);

            fetchCustomers();

        } catch (error) {

            console.error("Update Error:", error);

            if (error.response?.status === 403) {

                setMessage(
                    "You do not have permission to update customers."
                );

            } else {

                setMessage("Unable to update customer.");

            }
        }
    };


    // Cancel customer
    const cancelCustomer = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this customer?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.put(
                `http://localhost:8081/customers/${id}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Customer cancelled successfully.");

            fetchCustomers();

        } catch (error) {

            console.error("Cancel Error:", error);

            if (error.response?.status === 403) {

                setMessage(
                    "You do not have permission to cancel customers."
                );

            } else if (error.response?.status === 404) {

                setMessage("Customer not found.");

            } else {

                setMessage("Unable to cancel customer.");

            }
        }
    };


    // Delete customer
    const deleteCustomer = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8081/customers/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Customer deleted successfully.");

            fetchCustomers();

        } catch (error) {

            console.error("Delete Error:", error);

            if (error.response?.status === 403) {

                setMessage(
                    "You do not have permission to delete customers."
                );

            } else {

                setMessage("Unable to delete customer.");

            }
        }
    };


    // Load customers when page opens
    useEffect(() => {
        fetchCustomers();
    }, []);


    return (

        <div className="container mt-4 mb-5">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        Customers
                    </h2>

                    <p className="text-muted mb-0">
                        View and manage registered customers
                    </p>
                </div>

                <button
                    className="btn btn-outline-secondary"
                    onClick={fetchCustomers}
                >
                    🔄 Refresh
                </button>

            </div>


            {/* Search Card */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <div>
                            <h5 className="fw-bold mb-1">
                                Search Customer
                            </h5>

                            <small className="text-muted">
                                Find customers by name, phone number or token
                            </small>
                        </div>

                    </div>


                    <div className="row g-2">

                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={searchType}
                                onChange={(e) =>
                                    setSearchType(e.target.value)
                                }
                            >

                                <option value="name">
                                    Search by Name
                                </option>

                                <option value="phone">
                                    Search by Phone
                                </option>

                                <option value="token">
                                    Search by Token
                                </option>

                            </select>

                        </div>


                        <div className="col-md-6">

                            <input
                                type={
                                    searchType === "token"
                                        ? "number"
                                        : "text"
                                }
                                className="form-control"
                                placeholder={`Enter ${searchType}`}
                                value={searchValue}
                                onChange={(e) =>
                                    setSearchValue(e.target.value)
                                }
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        searchCustomers();
                                    }

                                }}
                            />

                        </div>


                        <div className="col-md-3">

                            <button
                                className="btn btn-primary w-100"
                                onClick={searchCustomers}
                            >
                                🔍 Search
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Message */}

            {message && (

                <div className="alert alert-info border-0 shadow-sm py-2">
                    {message}
                </div>

            )}


            {/* Edit Customer */}

            {showEdit && editingCustomer && (

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div>

                                <h5 className="fw-bold mb-1">
                                    Edit Customer
                                </h5>

                                <small className="text-muted">
                                    Update customer information
                                </small>

                            </div>

                        </div>


                        <div className="row g-3">

                            {/* Name */}

                            <div className="col-md-4">

                                <label className="form-label small fw-semibold">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={editingCustomer.name || ""}
                                    onChange={(e) =>
                                        setEditingCustomer({
                                            ...editingCustomer,
                                            name: e.target.value
                                        })
                                    }
                                />

                            </div>


                            {/* Phone */}

                            <div className="col-md-4">

                                <label className="form-label small fw-semibold">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        editingCustomer.phoneNumber || ""
                                    }
                                    onChange={(e) =>
                                        setEditingCustomer({
                                            ...editingCustomer,
                                            phoneNumber: e.target.value
                                        })
                                    }
                                />

                            </div>


                            {/* Service */}

                            <div className="col-md-4">

                                <label className="form-label small fw-semibold">
                                    Service Type
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        editingCustomer.serviceType || ""
                                    }
                                    onChange={(e) =>
                                        setEditingCustomer({
                                            ...editingCustomer,
                                            serviceType: e.target.value
                                        })
                                    }
                                />

                            </div>

                        </div>


                        <div className="mt-4">

                            <button
                                className="btn btn-success me-2"
                                onClick={updateCustomer}
                            >
                                💾 Save Changes
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => {

                                    setShowEdit(false);
                                    setEditingCustomer(null);

                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* Customer List */}

            {loading ? (

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <div
                            className="spinner-border text-primary mb-3"
                            role="status"
                        ></div>

                        <p className="text-muted mb-0">
                            Loading customers...
                        </p>

                    </div>

                </div>

            ) : customers.length === 0 ? (

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <div
                            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3"
                            style={{
                                width: "55px",
                                height: "55px"
                            }}
                        >
                            🔍
                        </div>

                        <h5 className="fw-semibold">
                            No Customers Found
                        </h5>

                        <p className="text-muted mb-0">
                            Try searching with different customer details.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="card border-0 shadow-sm">

                    {/* Table Header */}

                    <div className="card-body border-bottom py-3 px-4">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h5 className="fw-bold mb-1">
                                    Customer List
                                </h5>

                                <small className="text-muted">
                                    Registered customers
                                </small>

                            </div>


                            <span className="badge bg-light text-dark border px-3 py-2">
                                {customers.length} Customers
                            </span>

                        </div>

                    </div>


                    {/* Table */}

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>

                                    <th className="px-4">
                                        ID
                                    </th>

                                    <th>
                                        Token
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Service
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th className="text-end px-4">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {customers.map((customer) => (

                                    <tr key={customer.id}>

                                        <td className="px-4 text-muted">
                                            {customer.id}
                                        </td>


                                        <td>

                                            <span className="fw-bold text-primary">
                                                #{customer.tokenNumber}
                                            </span>

                                        </td>


                                        <td>

                                            <span className="fw-semibold">
                                                {customer.name}
                                            </span>

                                        </td>


                                        <td>
                                            {customer.phoneNumber}
                                        </td>


                                        <td>
                                            {customer.serviceType}
                                        </td>


                                        <td>

                                            <span
                                                className={`badge ${
                                                    customer.status === "COMPLETED"
                                                        ? "bg-success"
                                                        : customer.status === "SERVING"
                                                        ? "bg-primary"
                                                        : customer.status === "CANCELLED"
                                                        ? "bg-danger"
                                                        : "bg-warning text-dark"
                                                }`}
                                            >
                                                {customer.status}
                                            </span>

                                        </td>


                                        <td className="text-end px-4">

                                            {/* Edit */}

                                            <button
                                                className="btn btn-outline-warning btn-sm me-2"
                                                onClick={() => {

                                                    setEditingCustomer({
                                                        ...customer
                                                    });

                                                    setShowEdit(true);

                                                }}
                                            >
                                                ✏️ Edit
                                            </button>


                                            {/* Cancel */}

                                            {customer.status !== "CANCELLED" &&
                                             customer.status !== "COMPLETED" && (

                                                <button
                                                    className="btn btn-outline-secondary btn-sm me-2"
                                                    onClick={() =>
                                                        cancelCustomer(customer.id)
                                                    }
                                                >
                                                    ❌ Cancel
                                                </button>

                                            )}


                                            {/* Delete */}

                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() =>
                                                    deleteCustomer(customer.id)
                                                }
                                            >
                                                🗑️ Delete
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

export default Customers;