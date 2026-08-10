import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8081/users/login",
                {
                    email: email,
                    password: password
                }
            );

            // Save JWT
            localStorage.setItem("token", response.data.token);

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error("Login Error:", error);

            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        }
    };

    return (

        <div className="d-flex justify-content-center align-items-center vh-100">

            <div
                className="card shadow p-4"
                style={{ width: "400px" }}
            >

                <div className="text-center mb-4">

                    <h2 className="fw-bold">
                        Smart Queue
                    </h2>

                    <p className="text-muted">
                        Queue Management System
                    </p>

                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">
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
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
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
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;
