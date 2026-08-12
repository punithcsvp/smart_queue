import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // =========================
    // LOGIN
    // =========================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:8081/users/login",
                {
                    email: email,
                    password: password
                }
            );

            // Save JWT
            localStorage.setItem(
                "token",
                response.data.token
            );

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error("Login Error:", error);

            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fa",
                padding: "20px"
            }}
        >

            {/* ========================= */}
            {/* MAIN CARD */}
            {/* ========================= */}

            <div
                className="card border-0 shadow-sm"
                style={{
                    width: "800px",
                    maxWidth: "100%",
                    borderRadius: "14px"
                }}
            >

                <div className="card-body px-5 py-4">


                    {/* ========================= */}
                    {/* HEADER */}
                    {/* ========================= */}

                    <div className="text-center mb-4">

                        <div
                            className="d-flex justify-content-center align-items-center mx-auto mb-3"
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "#0d6efd",
                                color: "white",
                                borderRadius: "10px",
                                fontSize: "24px",
                                fontWeight: "600"
                            }}
                        >
                            Q
                        </div>

                        <h3 className="fw-semibold mb-1">
                            Smart Queue
                        </h3>

                        <p className="text-muted mb-0">
                            Queue Management System
                        </p>

                    </div>


                    {/* ========================= */}
                    {/* TWO SECTIONS */}
                    {/* ========================= */}

                    <div className="row g-4">


                        {/* ========================= */}
                        {/* STAFF / ADMIN LOGIN */}
                        {/* ========================= */}

                        <div className="col-md-7">

                            <div
                                className="h-100 p-4"
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    border: "1px solid #e1e5ea",
                                    borderRadius: "12px"
                                }}
                            >

                                {/* ========================= */}
                                {/* LOGIN HEADING */}
                                {/* ========================= */}

                                <div className="text-center mb-4">

                                    <h4
                                        className="fw-bold mb-2"
                                        style={{
                                            color: "#212529",
                                            fontSize: "22px"
                                        }}
                                    >
                                        Staff & Admin Login
                                    </h4>

                                    <div
                                        className="mx-auto mb-2"
                                        style={{
                                            width: "45px",
                                            height: "3px",
                                            backgroundColor: "#0d6efd",
                                            borderRadius: "3px"
                                        }}
                                    ></div>

                                    <p
                                        className="text-muted mb-0"
                                        style={{
                                            fontSize: "13px"
                                        }}
                                    >
                                        Sign in to access and manage the queue
                                    </p>

                                </div>


                                {/* ========================= */}
                                {/* ERROR */}
                                {/* ========================= */}

                                {error && (

                                    <div
                                        className="alert alert-danger py-2 px-3"
                                        style={{
                                            fontSize: "14px"
                                        }}
                                    >
                                        {error}
                                    </div>

                                )}


                                {/* ========================= */}
                                {/* LOGIN FORM */}
                                {/* ========================= */}

                                <form onSubmit={handleLogin}>


                                    {/* Email */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label fw-medium"
                                        >
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            style={{
                                                height: "45px",
                                                backgroundColor: "white"
                                            }}
                                            required
                                        />

                                    </div>


                                    {/* Password */}

                                    <div className="mb-4">

                                        <label
                                            className="form-label fw-medium"
                                        >
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            style={{
                                                height: "45px",
                                                backgroundColor: "white"
                                            }}
                                            required
                                        />

                                    </div>


                                    {/* Login Button */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        style={{
                                            height: "45px",
                                            borderRadius: "7px",
                                            fontWeight: "500"
                                        }}
                                        disabled={loading}
                                    >

                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></span>

                                                Logging in...
                                            </>
                                        ) : (
                                            "Login"
                                        )}

                                    </button>

                                </form>

                            </div>

                        </div>


                        {/* ========================= */}
                        {/* CUSTOMER PORTAL */}
                        {/* ========================= */}

                        <div className="col-md-5">

                            <div
                                className="h-100 p-4 d-flex flex-column justify-content-center text-center"
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #e1e5ea",
                                    borderRadius: "12px"
                                }}
                            >

                                {/* Customer Icon */}

                                <div
                                    className="d-flex justify-content-center align-items-center mx-auto mb-3"
                                    style={{
                                        width: "55px",
                                        height: "55px",
                                        backgroundColor: "#eaf2ff",
                                        color: "#0d6efd",
                                        borderRadius: "12px",
                                        fontSize: "27px"
                                    }}
                                >
                                    🎫
                                </div>


                                {/* Customer Heading */}

                                <h5
                                    className="fw-bold mb-2"
                                    style={{
                                        fontSize: "21px"
                                    }}
                                >
                                    Customer Portal
                                </h5>


                                {/* Customer Description */}

                                <p
                                    className="text-muted mb-4"
                                    style={{
                                        fontSize: "13px",
                                        lineHeight: "1.6"
                                    }}
                                >
                                    Are you a customer?
                                    <br />
                                    Check your token and queue
                                    status without logging in.
                                </p>


                                {/* Customer Button */}

                                <button
                                    type="button"
                                    className="btn btn-outline-primary w-100"
                                    style={{
                                        height: "45px",
                                        borderRadius: "7px",
                                        fontWeight: "500"
                                    }}
                                    onClick={() =>
                                        navigate("/customer")
                                    }
                                >
                                    Check Your Queue

                                    <span className="ms-2">
                                        →
                                    </span>

                                </button>

                            </div>

                        </div>

                    </div>


                    {/* ========================= */}
                    {/* FOOTER */}
                    {/* ========================= */}

                    <div
                        className="text-center mt-4 pt-3"
                        style={{
                            borderTop: "1px solid #f0f0f0"
                        }}
                    >

                        <small className="text-muted">
                            Smart Queue Management System
                        </small>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;