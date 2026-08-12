import { useState } from "react";
import axios from "axios";

function CustomerPortal() {

    const [token, setToken] = useState("");
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const checkStatus = async () => {

        if (!token.trim()) {
            setMessage("Please enter your token number.");
            setCustomer(null);
            return;
        }

        try {

            setLoading(true);
            setMessage("");
            setCustomer(null);

            const response = await axios.get(
                `http://localhost:8081/public/queue/${token}`
            );

            setCustomer(response.data);

        } catch (error) {

            console.error("Queue Status Error:", error);

            if (error.response?.status === 404) {
                setMessage("No customer was found with this token.");
            } else {
                setMessage("Unable to retrieve queue status.");
            }

        } finally {
            setLoading(false);
        }
    };


    const getStatus = () => {

        if (!customer) return null;

        switch (customer.status) {

            case "SERVING":
                return {
                    label: "Now Serving",
                    className: "status-serving"
                };

            case "COMPLETED":
                return {
                    label: "Completed",
                    className: "status-completed"
                };

            case "CANCELLED":
                return {
                    label: "Cancelled",
                    className: "status-cancelled"
                };

            default:
                return {
                    label: "Waiting",
                    className: "status-waiting"
                };
        }
    };


    const status = getStatus();


    return (

        <div className="customer-page">

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <header className="customer-header">

                <div className="customer-brand">

                    <div className="brand-mark">
                        SQ
                    </div>

                    <div>
                        <div className="brand-name">
                            SmartQueue
                        </div>

                        <div className="brand-subtitle">
                            Customer Portal
                        </div>
                    </div>

                </div>

            </header>


            {/* ========================= */}
            {/* MAIN */}
            {/* ========================= */}

            <main className="customer-main">

                <div className="customer-heading">

                    <div className="eyebrow">
                        QUEUE STATUS
                    </div>

                    <h1>
                        Check your queue
                    </h1>

                    <p>
                        Enter your token number to view your current
                        position and service status.
                    </p>

                </div>


                <div className="customer-grid">


                    {/* ========================= */}
                    {/* SEARCH */}
                    {/* ========================= */}

                    <section className="search-panel">

                        <div className="panel-label">
                            TOKEN NUMBER
                        </div>

                        <h2>
                            Find your queue
                        </h2>

                        <p className="panel-description">
                            Enter the token number provided to you
                            when you registered.
                        </p>


                        <div className="token-field">

                            <span className="token-prefix">
                                #
                            </span>

                            <input
                                type="number"
                                value={token}
                                placeholder="000"
                                onChange={(e) =>
                                    setToken(e.target.value)
                                }
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        checkStatus();
                                    }

                                }}
                            />

                        </div>


                        <button
                            className="check-button"
                            onClick={checkStatus}
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="button-spinner"></span>
                                    Checking
                                </>
                            ) : (
                                <>
                                    Check queue status
                                    <span>→</span>
                                </>
                            )}

                        </button>


                        {message && (

                            <div className="search-error">
                                {message}
                            </div>

                        )}


                        <div className="search-note">

                            <span className="note-icon">
                                i
                            </span>

                            <span>
                                Your token number is printed on the
                                receipt provided at registration.
                            </span>

                        </div>

                    </section>


                    {/* ========================= */}
                    {/* STATUS */}
                    {/* ========================= */}

                    <section className="status-panel">

                        {!customer ? (

                            <div className="status-empty">

                                <div className="empty-icon">
                                    01
                                </div>

                                <h3>
                                    Your queue information
                                </h3>

                                <p>
                                    Enter your token number to see
                                    your position in the queue.
                                </p>

                            </div>

                        ) : (

                            <>

                                {/* STATUS HEADER */}

                                <div className="status-header">

                                    <div>

                                        <div className="panel-label">
                                            CURRENT STATUS
                                        </div>

                                        <h2>
                                            {customer.name}
                                        </h2>

                                        <p>
                                            {customer.serviceType}
                                        </p>

                                    </div>


                                    <div
                                        className={`status-badge ${status.className}`}
                                    >
                                        <span className="status-dot"></span>
                                        {status.label}
                                    </div>

                                </div>


                                {/* TOKEN */}

                                <div className="token-display">

                                    <div>

                                        <div className="display-label">
                                            YOUR TOKEN
                                        </div>

                                        <div className="large-token">
                                            #{customer.tokenNumber}
                                        </div>

                                    </div>


                                    <div className="position-display">

                                        <div className="display-label">
                                            QUEUE POSITION
                                        </div>

                                        <div className="queue-number">
                                            {customer.queuePosition}
                                        </div>

                                    </div>

                                </div>


                                {/* DETAILS */}

                                <div className="details-grid">

                                    <div className="detail">

                                        <span>
                                            Customer
                                        </span>

                                        <strong>
                                            {customer.name}
                                        </strong>

                                    </div>


                                    <div className="detail">

                                        <span>
                                            Service
                                        </span>

                                        <strong>
                                            {customer.serviceType}
                                        </strong>

                                    </div>


                                    <div className="detail">

                                        <span>
                                            Token
                                        </span>

                                        <strong>
                                            #{customer.tokenNumber}
                                        </strong>

                                    </div>


                                    <div className="detail">

                                        <span>
                                            Status
                                        </span>

                                        <strong>
                                            {status.label}
                                        </strong>

                                    </div>

                                </div>


                                {/* MESSAGE */}

                                <div
                                    className={`queue-message ${status.className}`}
                                >

                                    {customer.status === "WAITING" && (

                                        <>
                                            <strong>
                                                Please wait for your turn.
                                            </strong>

                                            <span>
                                                We will call your token when
                                                it is your turn to be served.
                                            </span>
                                        </>

                                    )}


                                    {customer.status === "SERVING" && (

                                        <>
                                            <strong>
                                                Your turn is now.
                                            </strong>

                                            <span>
                                                Please proceed to the
                                                service counter.
                                            </span>
                                        </>

                                    )}


                                    {customer.status === "COMPLETED" && (

                                        <>
                                            <strong>
                                                Service completed.
                                            </strong>

                                            <span>
                                                Your request has been
                                                successfully completed.
                                            </span>
                                        </>

                                    )}


                                    {customer.status === "CANCELLED" && (

                                        <>
                                            <strong>
                                                Queue entry cancelled.
                                            </strong>

                                            <span>
                                                This queue entry is no
                                                longer active.
                                            </span>
                                        </>

                                    )}

                                </div>

                            </>

                        )}

                    </section>

                </div>

            </main>


            {/* ========================= */}
            {/* FOOTER */}
            {/* ========================= */}

            <footer className="customer-footer">

                SmartQueue · Digital Queue Management

            </footer>


            {/* ========================= */}
            {/* STYLES */}
            {/* ========================= */}

            <style>{`

                * {
                    box-sizing: border-box;
                }

                .customer-page {
                    min-height: 100vh;
                    background: #f6f8fb;
                    color: #172033;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Roboto,
                        Arial,
                        sans-serif;
                }

                .customer-header {
                    height: 72px;
                    background: #ffffff;
                    border-bottom: 1px solid #e6e9ef;
                    display: flex;
                    align-items: center;
                    padding: 0 6%;
                }

                .customer-brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .brand-mark {
                    width: 38px;
                    height: 38px;
                    border-radius: 9px;
                    background: #1d4ed8;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: .5px;
                }

                .brand-name {
                    font-size: 17px;
                    font-weight: 700;
                    letter-spacing: -.2px;
                }

                .brand-subtitle {
                    color: #8992a3;
                    font-size: 11px;
                    margin-top: 1px;
                }

                .customer-main {
                    width: min(1120px, 90%);
                    margin: 0 auto;
                    padding: 60px 0 40px;
                }

                .customer-heading {
                    margin-bottom: 34px;
                }

                .eyebrow,
                .panel-label {
                    color: #1d4ed8;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1.2px;
                }

                .customer-heading h1 {
                    margin: 8px 0 8px;
                    font-size: 36px;
                    line-height: 1.15;
                    letter-spacing: -1px;
                    font-weight: 750;
                }

                .customer-heading p {
                    margin: 0;
                    color: #687386;
                    font-size: 15px;
                }

                .customer-grid {
                    display: grid;
                    grid-template-columns: 390px 1fr;
                    gap: 22px;
                    align-items: stretch;
                }

                .search-panel,
                .status-panel {
                    background: #ffffff;
                    border: 1px solid #e4e8ef;
                    border-radius: 14px;
                    box-shadow:
                        0 3px 12px rgba(20, 32, 56, .04);
                }

                .search-panel {
                    padding: 32px;
                    min-height: 480px;
                    display: flex;
                    flex-direction: column;
                }

                .search-panel h2,
                .status-panel h2 {
                    font-size: 21px;
                    margin: 7px 0 7px;
                    font-weight: 700;
                    letter-spacing: -.3px;
                }

                .panel-description {
                    color: #737d8e;
                    font-size: 13px;
                    line-height: 1.6;
                    margin: 0 0 30px;
                }

                .token-field {
                    height: 58px;
                    display: flex;
                    align-items: center;
                    border: 1px solid #d9dee7;
                    border-radius: 9px;
                    background: #ffffff;
                    transition: border-color .2s, box-shadow .2s;
                    overflow: hidden;
                }

                .token-field:focus-within {
                    border-color: #1d4ed8;
                    box-shadow: 0 0 0 3px rgba(29, 78, 216, .08);
                }

                .token-prefix {
                    padding-left: 17px;
                    color: #8a94a6;
                    font-size: 19px;
                    font-weight: 600;
                }

                .token-field input {
                    border: none;
                    outline: none;
                    width: 100%;
                    height: 100%;
                    padding: 0 15px 0 7px;
                    font-size: 20px;
                    font-weight: 600;
                    color: #172033;
                    background: transparent;
                }

                .token-field input::placeholder {
                    color: #c0c6d0;
                }

                .check-button {
                    margin-top: 14px;
                    height: 52px;
                    border: none;
                    border-radius: 9px;
                    background: #1d4ed8;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    transition: background .2s;
                }

                .check-button:hover {
                    background: #1e40af;
                }

                .check-button:disabled {
                    opacity: .7;
                    cursor: not-allowed;
                }

                .check-button span {
                    font-size: 18px;
                }

                .button-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,.4);
                    border-top-color: #ffffff;
                    border-radius: 50%;
                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                .search-error {
                    margin-top: 15px;
                    padding: 12px 14px;
                    background: #fff3f2;
                    border: 1px solid #ffd8d5;
                    color: #b42318;
                    border-radius: 8px;
                    font-size: 13px;
                }

                .search-note {
                    margin-top: auto;
                    padding-top: 25px;
                    display: flex;
                    gap: 10px;
                    color: #7a8494;
                    font-size: 12px;
                    line-height: 1.5;
                }

                .note-icon {
                    flex-shrink: 0;
                    width: 18px;
                    height: 18px;
                    border: 1px solid #b8c0cc;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 700;
                }

                .status-panel {
                    min-height: 480px;
                    padding: 32px;
                }

                .status-empty {
                    min-height: 414px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 30px;
                }

                .empty-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 12px;
                    background: #f0f4fa;
                    color: #7c8798;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 20px;
                }

                .status-empty h3 {
                    font-size: 18px;
                    margin: 0 0 7px;
                    font-weight: 700;
                }

                .status-empty p {
                    color: #7b8595;
                    font-size: 13px;
                    max-width: 300px;
                    line-height: 1.6;
                    margin: 0;
                }

                .status-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 20px;
                    padding-bottom: 25px;
                    border-bottom: 1px solid #edf0f4;
                }

                .status-header h2 {
                    margin-top: 6px;
                }

                .status-header p {
                    color: #707a8c;
                    font-size: 13px;
                    margin: 0;
                }

                .status-badge {
                    flex-shrink: 0;
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    text-transform: uppercase;
                    letter-spacing: .4px;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: currentColor;
                }

                .status-waiting {
                    color: #9a6700;
                    background: #fff8e6;
                }

                .status-serving {
                    color: #087443;
                    background: #ecfdf3;
                }

                .status-completed {
                    color: #1d4ed8;
                    background: #eff6ff;
                }

                .status-cancelled {
                    color: #b42318;
                    background: #fff1f0;
                }

                .token-display {
                    margin: 26px 0;
                    padding: 25px;
                    border-radius: 11px;
                    background: #f8fafc;
                    border: 1px solid #edf0f4;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .display-label {
                    color: #8992a1;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    margin-bottom: 6px;
                }

                .large-token {
                    color: #1d4ed8;
                    font-size: 42px;
                    line-height: 1;
                    font-weight: 750;
                    letter-spacing: -1px;
                }

                .position-display {
                    text-align: right;
                    padding-left: 30px;
                    border-left: 1px solid #e1e5eb;
                }

                .queue-number {
                    font-size: 36px;
                    font-weight: 750;
                    line-height: 1;
                }

                .details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    border: 1px solid #e6e9ee;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .detail {
                    padding: 15px 17px;
                }

                .detail:nth-child(1),
                .detail:nth-child(2) {
                    border-bottom: 1px solid #e6e9ee;
                }

                .detail:nth-child(1),
                .detail:nth-child(3) {
                    border-right: 1px solid #e6e9ee;
                }

                .detail span {
                    display: block;
                    color: #8a93a2;
                    font-size: 11px;
                    margin-bottom: 5px;
                }

                .detail strong {
                    font-size: 13px;
                    font-weight: 600;
                }

                .queue-message {
                    margin-top: 20px;
                    padding: 15px 17px;
                    border-radius: 9px;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    border: 1px solid transparent;
                    font-size: 13px;
                }

                .queue-message span {
                    font-size: 12px;
                    opacity: .8;
                }

                .customer-footer {
                    text-align: center;
                    color: #9aa2af;
                    font-size: 11px;
                    padding: 0 0 30px;
                }

                @media (max-width: 850px) {

                    .customer-grid {
                        grid-template-columns: 1fr;
                    }

                    .search-panel,
                    .status-panel {
                        min-height: auto;
                    }

                    .status-empty {
                        min-height: 300px;
                    }

                }

                @media (max-width: 550px) {

                    .customer-main {
                        width: 92%;
                        padding-top: 40px;
                    }

                    .customer-heading h1 {
                        font-size: 30px;
                    }

                    .customer-header {
                        padding: 0 4%;
                    }

                    .search-panel,
                    .status-panel {
                        padding: 23px;
                    }

                    .status-header {
                        flex-direction: column;
                    }

                    .token-display {
                        padding: 20px;
                    }

                    .large-token {
                        font-size: 34px;
                    }

                    .queue-number {
                        font-size: 30px;
                    }

                }

            `}</style>

        </div>
    );
}

export default CustomerPortal;