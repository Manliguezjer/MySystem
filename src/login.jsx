import { useState } from "react";
import PropTypes from "prop-types";
import "./styles/login.css";
import Grid from "@material-ui/core/Grid";  // Add this import

function Login({ onLogin }) {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { uname, pass } = event.target.elements;
    console.log("Submitting login request...");
  
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: uname.value,
          password: pass.value,
        }),
      });
  
      const data = await response.json();
  
      console.log("Response from server:", data); // Log the server response
  
      if (response.ok) {
        console.log("Login successful!");
        setIsSubmitted(true);
        if (typeof onLogin === "function") {
          onLogin();
        }
      } else {
        console.error("Login failed:", data.error);
        setErrorMessages({ name: "login", message: data.error });
      }
    } catch (error) {
      console.error("Error during login request:", error);
      setErrorMessages({ name: "login", message: "An error occurred." });
    }
  };
  

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
    
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" value="Log In" />
          {renderErrorMessage("login")}
        </div>
      </form>
    </div>
  );

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <div className="app">
        <div className="login-form">
          <div className="title">Bus Ticketing System</div>
          {isSubmitted ? (
            <div>User is successfully logged in</div>
          ) : (
            <>
              <div className="title">Sign In</div>
              {renderForm}
            </>
          )}
        </div>
      </div>
    </Grid>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;
