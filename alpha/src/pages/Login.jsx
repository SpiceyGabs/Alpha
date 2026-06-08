import { useState, useEffect,useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";  
import "../Styling/Login.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;       //regular expressions(regex) for validating email, password, and name inputs, and checking is a string matches the confirm password field. These regex patterns are used in the useEffect hooks to validate the form data as the user types.
const PWD_REGEX = /^.{6,}$/;
const NAME_REGEX = /^.{2,}$/;


function Login() {
  const {login,register} = useContext(UserContext);
  const navigate = useNavigate();

  const emailRef = useRef(null);

  const [isRegistering, setIsResigtering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

 
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(formData.name));
  }, [formData.name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(formData.password));
    setValidMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    setError("");
  }, [formData]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    setError("");

    if (isRegistering) {
      if (!validName || !validEmail || !validPwd || !validMatch) {
        setError("Please fix the errors above before continuing.");
        return;
      }
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/");
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
        setError("Invalid email or password.");
        return;
      }
      navigate("/");
    }
  }

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1 className="loginTitle">ABSA</h1>
        <p className="loginSubtitle"> Welcome to the NextGen Wealth Studio</p>

        <div className="loginToggle">
          <button
            className={!isRegistering ? "toggleActive" : ""}
            onClick={() => { setIsRegistering(false); setError(""); }}
          >
            Login
          </button>
          <button
            className={isRegistering ? "toggleActive" : ""}
            onClick={() => { setIsRegistering(true); setError(""); }}
          >
            Register
          </button>
        </div>

        {isRegistering && (
          <div className="inputGroup">
            <div className="inputWrapper">
              <input
                className={`loginInput ${formData.name && (validName ? "inputValid" : "inputInvalid")}`}
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
              {formData.name && (
                <span className={`inputIndicator ${validName ? "indicatorValid" : "indicatorInvalid"}`}>
                  {validName ? "✓" : "✗"}
                </span>
              )}
            </div>
            {nameFocus && formData.name && !validName && (
              <p className="inputHint">Name must be at least 2 characters.</p>
            )}
          </div>
        )}

        <div className="inputGroup">
          <div className="inputWrapper">
            <input
              className={`loginInput ${formData.email && (validEmail ? "inputValid" : "inputInvalid")}`}
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              ref={emailRef}
            />
            {formData.email && (
              <span className={`inputIndicator ${validEmail ? "indicatorValid" : "indicatorInvalid"}`}>
                {validEmail ? "✓" : "✗"}
              </span>
            )}
          </div>
          {emailFocus && formData.email && !validEmail && (
            <p className="inputHint">Please enter a valid email address.</p>
          )}
        </div>

        <div className="inputGroup">
          <div className="inputWrapper">
            <input
              className={`loginInput ${formData.password && (validPwd ? "inputValid" : "inputInvalid")}`}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {formData.password && (
              <span className={`inputIndicator ${validPwd ? "indicatorValid" : "indicatorInvalid"}`}>
                {validPwd ? "✓" : "✗"}
              </span>
            )}
          </div>
          {pwdFocus && formData.password && !validPwd && (
            <p className="inputHint">Password must be at least 6 characters.</p>
          )}
        </div>

        {isRegistering && (
          <div className="inputGroup">
            <div className="inputWrapper">
              <input
                className={`loginInput ${formData.confirmPassword && (validMatch ? "inputValid" : "inputInvalid")}`}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              {formData.confirmPassword && (
                <span className={`inputIndicator ${validMatch ? "indicatorValid" : "indicatorInvalid"}`}>
                  {validMatch ? "✓" : "✗"}
                </span>
              )}
            </div>
            {matchFocus && formData.confirmPassword && !validMatch && (
              <p className="inputHint">Passwords do not match.</p>
            )}
          </div>
        )}

        {error && <p className="loginError" aria-live="assertive">{error}</p>}

        <button className="loginSubmit" onClick={handleSubmit}>
          {isRegistering ? "Create Account" : "Login"}
        </button>
      </div>
    </div>
  );
}



  export default Login; 
