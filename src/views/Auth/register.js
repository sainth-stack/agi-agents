import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../components/loader/index";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import bedroom from "../../assets/images/neolocus/bg.jpg";
import axios from "axios";
import { baseURL } from "../../const";
// import "../../components/styles/resgister.css";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    setLoading(true);
    setError("");
    setFieldErrors({});
    event.preventDefault();
    var formData = new FormData();

    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password1", password);
    formData.append("password2", password2);
    formData.append("role", "basic");

    try {
      const response = await axios.post(`${baseURL}/register`, formData);
      setLoading(false);

      if (response.data.status === "success") {
        navigate("/login");
      } else {
        setError("Registration failed");
        setFieldErrors(response.data.errors || {});
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred");
      console.error(err);
    }
  };

  return (
    <div
      className="container-fluid row m-0 p-0 h-screen "
      style={{ background: "rgb(255, 255, 255)" }}
    >
      <div
        className="col-md-6 pt-4 pb-4 d-flex justify-content-center align-items-center "
        style={{
          backgroundImage: `url(${bedroom})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="col-md-6 col-xs-12 col-sm-12 text-center pt-4 ">
        <div className="row ">
          <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto">
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '95vh', justifyContent: 'center' }}>
              <h2 className="mb-3">Register</h2>
              <form onSubmit={handleRegister} className="px-lg-5 w-full">
                <div className="form-group d-flex flex-column text-start">
                  <label className="label2 fs13">User Name*</label>
                  <input
                    type="text"
                    className="form-control border"
                    id="username"
                    name="username"
                    autoComplete="off"
                    value={userName}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {fieldErrors.username && (
                    <div className="text-danger" style={{ fontSize: "14px" }}>
                      {fieldErrors.username.join(", ")}
                    </div>
                  )}
                </div>
                <div className="form-group d-flex flex-column mt-3 text-start">
                  <label className="label2 fs13">Email*</label>
                  <input
                    type="email"
                    className="form-control border"
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {fieldErrors.email && (
                    <div className="text-danger" style={{ fontSize: "14px" }}>
                      {fieldErrors.email.join(", ")}
                    </div>
                  )}
                </div>
                <div className="form-group d-flex flex-column mt-3 text-start">
                  <label className="label2 fs13">Password*</label>
                  <input
                    type={toggle2 ? "text" : "password"}
                    className="form-control border"
                    id="password"
                    name="password"
                    value={password}
                    maxLength={16}
                    minLength={8}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="relative">
                    <img
                      className="eye3"
                      src={toggle2 ? eye2 : eye}
                      onClick={() => setToggle2(!toggle2)}
                      alt="Toggle visibility"
                    />
                  </div>
                  {fieldErrors.password1 && (
                    <div className="text-danger" style={{ fontSize: "14px" }}>
                      {fieldErrors.password1.join(", ")}
                    </div>
                  )}
                </div>
                <div className="form-group d-flex flex-column mt-3 text-start">
                  <label className="label2 fs13">Confirm Password*</label>
                  <input
                    type={toggle2 ? "text" : "password"}
                    className="form-control border"
                    id="password2"
                    name="password2"
                    value={password2}
                    maxLength={16}
                    minLength={8}
                    required
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                  <div className="relative">
                    <img
                      className="eye3"
                      src={toggle2 ? eye2 : eye}
                      onClick={() => setToggle2(!toggle2)}
                      alt="Toggle visibility"
                    />
                  </div>
                  {fieldErrors.password2 && (
                    <div className="text-danger" style={{ fontSize: "14px" }}>
                      {fieldErrors.password2.join(", ")}
                    </div>
                  )}
                </div>
                <div
                  className="text-danger text-start mt-2"
                  style={{ fontSize: "14px" }}
                >
                  {error}
                </div>
                <button
                  className="btn w-100 text-white border-0 mt-4"
                  style={{
                    background: "#4887c7",
                    borderRadius: "40px",

                    height: "40px",
                  }}
                  type={loading ? "button" : "submit"}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
              <div className="mt-3 ">Already Have An Account?</div>
              <Link to="/login" className="text-decoration-none login1">
                <span> Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
