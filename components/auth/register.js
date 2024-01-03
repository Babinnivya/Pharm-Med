import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function registerUser() {
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        };

        axios.post('https://medicalstore.mashupstack.com/api/register', user)
            .then(response => {
                setErrorMessage('');
                navigate('/login');
            })
            .catch(error => {
                if (error.response.data.errors) {
                    setErrorMessage(Object.values(error.response.data.errors).join(' '));
                } else {
                    setErrorMessage('Failed to connect to api');
                }
            });
    }

    return (
        <div className="bg-success">
             <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
             <div className="card col-8">
        <div className="card-body">
          <h1 className="card-title">Register</h1>
                        
                        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onInput={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onInput={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onInput={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={passwordConf}
                                onInput={(event) => setPasswordConf(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success float-right" onClick={registerUser}>Submit</button>
                        </div>
                        <div className="form-group">
                            <p>Already have an account? <button className="btn btn-link" onClick={() => navigate('/login')}>Login</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;
