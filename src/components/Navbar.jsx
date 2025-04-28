import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/");
        }
        catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                <Link to="/" style={{ marginRight: "10px" }}>Login</Link>
                <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
                {user && (
                    <>
                        <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )
                }
            </nav>  
        </>
    )
}

export default Navbar;