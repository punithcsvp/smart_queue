import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


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

            <div
                className="card border-0 shadow-sm"
                style={{
                    width: "480px",
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
                    {/* STAFF & ADMIN LOGIN */}
                    {/* ========================= */}

                    <div
                        className="text-center mb-4"
                    >

                        <h5
                            className="fw-bold mb-1"
                            style={{
                                color: "#212529"
                            }}
                        >
                            Staff & Admin Login
                        </h5>

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
                                    height: "45px"
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
                                    height: "45px"
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


                    {/* ========================= */}
                    {/* DIVIDER */}
                    {/* ========================= */}

                    <div
                        className="d-flex align-items-center my-4"
                    >

                        <div
                            className="flex-grow-1"
                            style={{
                                height: "1px",
                                backgroundColor: "#dee2e6"
                            }}
                        ></div>

                        <span
                            className="px-3 text-muted small"
                        >
                            OR
                        </span>

                        <div
                            className="flex-grow-1"
                            style={{
                                height: "1px",
                                backgroundColor: "#dee2e6"
                            }}
                        ></div>

                    </div>


                    {/* ========================= */}
                    {/* CUSTOMER PORTAL */}
                    {/* ========================= */}

                    <div className="text-center">

                        <p
                            className="text-muted mb-2"
                            style={{
                                fontSize: "13px"
                            }}
                        >
                            Are you a customer?
                        </p>

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


                    {/* ========================= */}
                    {/* FOOTER */}
                    {/* ========================= */}

                    <div
                        className="text-center mt-4"
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