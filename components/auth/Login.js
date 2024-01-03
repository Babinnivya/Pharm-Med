import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function attemptLogin() {
    axios.post('https://medicalstore.mashupstack.com/api/login', {
      email: email,
      password: password
    })
    .then(response => {
      console.log(response.data);  // Log the entire response to check for the token
      setErrorMessage('')
      var user = {
        email: email,
        token: response.data.token
      };
      dispatch(setUser(user));
      navigate('/blog/posts');
    })
    .catch(error => {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(' '));
        } else if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to login user. Please contact admin');
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    });
  }

  return (
    <div className="bg-success">
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card col-8">
        <div className="card-body">
          <h1 className="card-title">Login</h1>
          {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-success" onClick={attemptLogin}>Login</button>
          </div>
          <div className="form-group">
            <p>New User? Click to signup <button className="btn btn-link" onClick={() => navigate('/')}>Register</button></p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
