import eye from "../../assets/svg/eye-fill.svg";
import axios from "axios";
import eye2 from "../../assets/svg/eye-slash.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "../../components/loader";
import "./styles.css";
import { useGoogleLogin } from "@react-oauth/google";
import { baseURL } from "../../const";
import bedroom from "../../assets/images/neolocus/bg.jpg";
// import "../../components/styles/login.css";
import { useUser } from "../../context/userContext";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { userData, setUserData } = useUser();
  const navigate = useNavigate();
  const googleLoginURL = `${baseURL}/google_login`;

  const getUserData = async (userName) => {
    if (userName) {
      try {
        const formData = new FormData();
        formData.append("user", userName);
        const response = await axios.post(
          `${baseURL}/get_user_details`,
          formData
        );
        setUserData(response?.data?.paymentinfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(`${baseURL}/login`, formData);
      setLoading(false);

      if (response.data?.status === "success") {
        localStorage.setItem("email", email);
        localStorage.setItem("token", `${response.data}`);
        if (email == 'admin@gmail.com') {
          navigate('/admin/agents')
        }
        else {
          navigate("/dashboards/dashboard1");
        }
        getUserData(email);
      } else {
        setError(response.data?.errors?.password2?.join(" ") || "Login Failed");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserInfo(tokenResponse.access_token),
    onFailure: (response) => setError("Google login failed. Please try again."),
  });

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleGoogleLoginSuccess(response.data);
    } catch (error) {
      setError("Failed to fetch Google user info.");
      console.error("Error fetching Google user info:", error);
    }
  };

  const handleGoogleLoginSuccess = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", `${data.name.replaceAll(" ", "_")}`);
      formData.append("id", data.id);
      formData.append("email", data.email);

      const response = await axios.post(googleLoginURL, formData);
      if (response.status === 200) {
        localStorage.setItem("email", data?.name.replaceAll(" ", "_"));
        localStorage.setItem("email", data?.email);
        localStorage.setItem("token", response?.data);
      
        console.log(data?.email)
        if (data?.email == 'admin@gmail.com') {
          navigate('/admin/agents')
        }
        else {
          navigate("/dashboards/dashboard1");
        }
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError("Google login failed.");
      console.error("Google login error:", error);
    }
  };

  return (
    <div
      className="container-fluid row m-0  h-screen p-0"
      style={{ background: "rgb(255,255,255)" }}
    >
      <div
        className="col-md-6 pt-4 pb-4 d-flex justify-content-center align-items-center "
        style={{
          backgroundImage: `url(${bedroom})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="col-md-6 col-xs-12 col-sm-12 text-center pt-lg-5 mt-lg-5">
        <div className="pt-5"></div>
        <div
          className="row mt-3"
          style={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto">
            <div style={{ width: "100% !important" }}>
              <button
                className="custom-google-login-button"
                onClick={() => {
                  handleGoogleLogin();
                }}
              >
                <img
                  src={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAORSURBVHgBtZfNbxNHGMaf2d0EB/qxLpUsLIduLlVUqWXTSlUvldakPVZF6qGoF5JzVSXtpZeoWdo/oEY99FQ5qEItEohEHDgQ4eWCICDiXIgFElk+JGQg8oaIxCHxvLzjiChOduOv5JHW9s6M5zfzzjvPzgo0qDnbMvWO2DEBYUPgAy6y+DJB8Pk+kKAZKeH13Cp4jfQn6gK/6HUMqQ0xwIEgE/WlBpIxVmjiUL7go1nw+gy7RoXAMFqTL0BuaqpwumHwnN1rGZ0ih/VwtiU9kcgkL3o/by03thY8tj+yqQMMbSisdVUpFp2w8hqwmil10gWopNkd5df2L6fDKrSaUdQJr5E67OuEYUOjnu6pWaEu7jgOSWkCateSyFPQHs8PwvraWONHn/eO8q0bSiQRCI1Opm7MZrCDeAdYvAP+JNDC4anZgZ3aVsHLOVhLE4nc0rX3rFAokE7dvJPHLmo91BLOgW+K1oH+Z9saCCGHdxta7Vd9lCcxzb9s9Xv1/n4snkuiUupgKI2lbhQGsQcSKsxCYm5zoYK++LcbKHb2HLoe7T7tyJAV2PoWG9Hjq4j/dN+LfcX2t4O+H5nMCKEdQbOSlZOGIN4+4cY5U+//AgpKDpqUBCY0EWEWRAiwR+KMNrXI2piFvZTGjhPuLCv+btlmBFhEJJCG5pOmYarmi1IOZpdEaXP5k7Uu/Pr8E9x99U5ffvByy+ZxfORKjg8PzrYKKdNaPM2hFvDelN0um/jx6ae49+otnrQcQos67uasUCir/NLIV5OLKriqvs++6GboZzzjWLUBr/+Ane0/hla0VnHDK8gbz6SDKrhsIDMy/3GQCT7c1oy3W9bOfm2jCf3wW26I/fZEWJ0Q+pj6roJVuCcXE6ci+jEF5LT9z9GGzl7OX7+MSpJRj0//v9/T1ed2jWf1ZY9OQx1fo+WzsbgQlZn8oFdNOjvrqG1nadC+JQg1OPP90pc4yNdWsb0OhIK5E4ttUMHb3sOxlQSSxe/QsbbR1dj/f/RvPOlqnItn4RMkn5Gobbss7yviUfIMlmIP1K1f1rWak+Y2y1QhZHgfw320qVVjAQ+TZzyG9o276ZrJRB7o/57OWucLl9z58vwJtCQKCNqp/OCkG1Zb9xVGrTtId/mNosEBMJDEaU7AjFq6qFZ1wZsGwFmiO+odKt5lHimVA7y7721rYWXRPxiLB/PLpQectuPsHHkG1s2R17KaTnlOqfV9AAAAAElFTkSuQmCC"
                  }
                  alt=""
                />
                Sign in with Google
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div className="border-top"></div>
              <div style={{ width: "100%" }} className="text-lowercase">
                OR CONTINUE WITH
              </div>
              <div className="border-top"></div>
            </div>
            <h2 className="mb-1">{"Login"}</h2>
            <form onSubmit={handleLogin} className="px-lg-5">
              <div className="form-group d-flex flex-column text-start">
                <label className="label2 fs13">Email*</label>
                <input
                  type="email"
                  className=" border rounded-lg bg-red-500"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group   d-flex flex-column mt-3 text-start position-relative">
                <label className="label2 fs13">Password*</label>
                <input
                  type={togglePassword ? "text" : "password"}
                  className="form-control border rounded-full"
                  value={password}
                  maxLength={16}
                  minLength={8}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: "2.5rem" }} // Add padding to avoid overlap with the icon
                />
                <img
                  src={togglePassword ? eye2 : eye} // Use eye icons defined in your component
                  onClick={() => setTogglePassword(!togglePassword)}
                  alt="Toggle visibility"
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "10px",

                    top: "50%",

                    transform: "translateY(50%)",
                    width: "20px",
                    height: "20px",
                  }}
                />
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
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <div className="account2 mt-2">{"Don't have an account?"}</div>
              <Link to="/register" className="text-decoration-none register2">
                <span className="btn "> {"Register"}</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
