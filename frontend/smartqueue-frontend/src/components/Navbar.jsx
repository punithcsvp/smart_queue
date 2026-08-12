import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (

        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">

            <div className="container">

                {/* Brand */}

                <Link
                    to="/dashboard"
                    className="navbar-brand d-flex align-items-center"
                >

                    <div
                        className="d-flex justify-content-center align-items-center me-2"
                        style={{
                            width: "34px",
                            height: "34px",
                            backgroundColor: "#0d6efd",
                            color: "white",
                            borderRadius: "7px",
                            fontWeight: "600"
                        }}
                    >
                        SQ
                    </div>

                    <span className="fw-semibold">
                        Smart Queue
                    </span>

                </Link>


                {/* Mobile toggle */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    {/* Navigation */}

                    <ul className="navbar-nav ms-4">

                        <li className="nav-item">

                            <Link
                                to="/dashboard"
                                className={`nav-link px-3 ${
                                    isActive("/dashboard")
                                        ? "text-primary fw-semibold"
                                        : "text-dark"
                                }`}
                            >
                                Dashboard
                            </Link>

                        </li>


                        <li className="nav-item">

                            <Link
                                to="/queue"
                                className={`nav-link px-3 ${
                                    isActive("/queue")
                                        ? "text-primary fw-semibold"
                                        : "text-dark"
                                }`}
                            >
                                Queue
                            </Link>

                        </li>


                        <li className="nav-item">

                            <Link
                                to="/customers"
                                className={`nav-link px-3 ${
                                    isActive("/customers")
                                        ? "text-primary fw-semibold"
                                        : "text-dark"
                                }`}
                            >
                                Customers
                            </Link>

                        </li>


                        <li className="nav-item">

                            <Link
                                to="/add-Customers"
                                className={`nav-link px-3 ${
                                    isActive("/add-Customers")
                                        ? "text-primary fw-semibold"
                                        : "text-dark"
                                }`}
                            >
                                Add Customer
                            </Link>

                        </li>

                    </ul>


                    {/* Right side */}

                    <div className="ms-auto">

                        <button
                            className="btn btn-outline-danger btn-sm px-3"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;