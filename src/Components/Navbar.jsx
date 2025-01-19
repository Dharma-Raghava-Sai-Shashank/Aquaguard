  import { useEffect, useState } from "react";
  import "./Navbar.css";
  import { Link, useNavigate } from "react-router-dom";

  const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const authtoken = localStorage.getItem("token");
      if (authtoken) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    }, []);
    const handle = () => {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    };
    return check ? (
      <>
        {" "}
        <nav className="bg-#7CB9E8 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link className="text-2xl font-bold text-black" to='/'>AQUAGUARD</Link>
            <div className="lg:flex hidden space-x-6">
              <Link class="button" to="/dashboard">
                Dashboard
              </Link>
              <Link class="button" to="/warehouses">
                Warehouses
              </Link>
              <button class="button" onClick={handle}>
                logout
              </button>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button> 
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden block mt-4 space-y-4 text-center">
              <Link
                to="/login"
                className="a block text-white py-2 px-4 hover:bg-gray-700 rounded"
              >
                Dashboard
              </Link>
              <Link
                to="/signup"
                className="a block text-white py-2 px-4 hover:bg-gray-700 rounded"
              >
                kya karu
              </Link>
            </div>
          )}
        </nav>{" "}
      </>
    ) : (
      <>
        <nav className="bg-#7CB9E8 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-bold text-black">TravelTrack</div>
            <div className="lg:flex hidden space-x-6">
              <Link class="button" to="/login">
                Login
              </Link>
              <Link class="button" to="/signup">
                Signup
              </Link>
              <Link class="button" to="/Contactus">
                Contact us
              </Link>
              <Link class="button" to="/aboutus">
                About us
              </Link>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden block mt-4 space-y-4 text-center">
              <Link
                to="/login"
                className="a block text-white py-2 px-4 hover:bg-gray-700 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="a block text-white py-2 px-4 hover:bg-gray-700 rounded"
              >
                Signup
              </Link>
              <Link
                to="/aboutus"
                className="a block text-white py-2 px-4 hover:bg-gray-700 rounded"
              >
                Features
              </Link>
              <Link
                to="/contactus"
                className="a block text-white py-2 px-4 hover:bg-gray-700 rounded"
              >
                Contact
              </Link>
            </div>
          )}
        </nav>{" "}
      </>
    );
  };

  export default Navbar;
