import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../Styling/Login.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^.{6,}$/;
const NAME_REGEX = /^.{2,}$/;

function Login() {
  const { login, register } = useContext(UserContext);
  const navigate = useNavigate();

  const firstFieldRef = useRef(null);

  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (firstFieldRef.current) firstFieldRef.current.focus();
  }, [isRegistering]);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(formData.firstName));
  }, [formData.firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(formData.lastName));
  }, [formData.lastName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(formData.password));
    setValidMatch(
      formData.password === formData.confirmPassword &&
      formData.confirmPassword.length > 0
    );
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    setError("");
  }, [formData, isRegistering]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    setError("");

    if (isRegistering) {
      if (!validFirstName || !validLastName || !validEmail || !validPwd || !validMatch) {
        setError("Please fix the highlighted fields before continuing.");
        return;
      }
      register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });
      setRegistered(true);
      setIsRegistering(false);
      setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    } else {
      if (!formData.email || !formData.password) {
        setError("Please enter your email and password.");
        return;
      }
      const success = login({
        email: formData.email,
        password: formData.password,
      });
      if (!success) {
        setError("Invalid email or password. Please try again.");
        return;
      }
      navigate("/");
    }
  }

  function renderIndicator(value, isValid) {
    if (!value) return null;
    return (
      <span className={`inputIndicator ${isValid ? "indicatorValid" : "indicatorInvalid"}`}>
        {isValid ? "✓" : "✗"}
      </span>
    );
  }

  return (
    <div className="loginPage">
      <div className="loginCard">

        <div className="loginHeader">
          <h1 className="loginTitle">ABSA</h1>
          <p className="loginSubtitle">Welcome to the NextGen Wealth Studio</p>
        </div>

        <div className="loginToggle">
          <button
            className={!isRegistering ? "toggleActive" : ""}
            onClick={() => setIsRegistering(false)}
          >
            Login
          </button>
          <button
            className={isRegistering ? "toggleActive" : ""}
            onClick={() => setIsRegistering(true)}
          >
            Register
          </button>
        </div>

        {registered && !isRegistering && (
          <div className="successBanner">
            Account created! You can now log in below.
          </div>
        )}

        {isRegistering && (
          <div className="inputRow">
            <div className="inputGroup">
              <label className="inputLabel">Name</label>
              <div className="inputWrapper">
                <input
                  className={`loginInput ${formData.firstName && (validFirstName ? "inputValid" : "inputInvalid")}`}
                  type="text"
                  name="firstName"
                  placeholder="Your name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => setFirstNameFocus(true)}
                  onBlur={() => setFirstNameFocus(false)}
                  ref={firstFieldRef}
                />
                {renderIndicator(formData.firstName, validFirstName)}
              </div>
              {firstNameFocus && formData.firstName && !validFirstName && (
                <p className="inputHint">At least 2 characters.</p>
              )}
            </div>

            <div className="inputGroup">
              <label className="inputLabel">Surname</label>
              <div className="inputWrapper">
                <input
                  className={`loginInput ${formData.lastName && (validLastName ? "inputValid" : "inputInvalid")}`}
                  type="text"
                  name="lastName"
                  placeholder="Your surname"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => setLastNameFocus(true)}
                  onBlur={() => setLastNameFocus(false)}
                />
                {renderIndicator(formData.lastName, validLastName)}
              </div>
              {lastNameFocus && formData.lastName && !validLastName && (
                <p className="inputHint">At least 2 characters.</p>
              )}
            </div>
          </div>
        )}

        <div className="inputGroup">
          <label className="inputLabel">Email Address</label>
          <div className="inputWrapper">
            <input
              className={`loginInput ${formData.email && (validEmail ? "inputValid" : "inputInvalid")}`}
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              ref={!isRegistering ? firstFieldRef : null}
            />
            {renderIndicator(formData.email, validEmail)}
          </div>
          {emailFocus && formData.email && !validEmail && (
            <p className="inputHint">Please enter a valid email address.</p>
          )}
        </div>

        <div className="inputGroup">
          <label className="inputLabel">Password</label>
          <div className="inputWrapper">
            <input
              className={`loginInput ${formData.password && (validPwd ? "inputValid" : "inputInvalid")}`}
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {renderIndicator(formData.password, validPwd)}
          </div>
          {pwdFocus && formData.password && !validPwd && (
            <p className="inputHint">Password must be at least 6 characters.</p>
          )}
        </div>

        {isRegistering && (
          <div className="inputGroup">
            <label className="inputLabel">Confirm Password</label>
            <div className="inputWrapper">
              <input
                className={`loginInput ${formData.confirmPassword && (validMatch ? "inputValid" : "inputInvalid")}`}
                type="password"
                name="confirmPassword"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              {renderIndicator(formData.confirmPassword, validMatch)}
            </div>
            {matchFocus && formData.confirmPassword && !validMatch && (
              <p className="inputHint">Passwords do not match.</p>
            )}
            {formData.confirmPassword && validMatch && (
              <p className="inputHintValid">Passwords match.</p>
            )}
          </div>
        )}

        {error && (
          <p className="loginError" aria-live="assertive">{error}</p>
        )}

        <button className="loginSubmit" onClick={handleSubmit}>
          {isRegistering ? "Create Account" : "Login"}
        </button>

        {isRegistering && (
          <p className="loginFooter">
            Already have an account?{" "}
            <span className="loginLink" onClick={() => setIsRegistering(false)}>
              Sign in here
            </span>
          </p>
        )}

        {!isRegistering && (
          <p className="loginFooter">
            Don't have an account?{" "}
            <span className="loginLink" onClick={() => setIsRegistering(true)}>
              Register here
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;