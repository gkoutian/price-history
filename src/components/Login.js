import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import config from '../config';
import './login.css';

export default class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            user: '',
            password: ''
        }
    }

    login = () => {
        fetch(config.apiUrl + 'login', {
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(this.state),
            method: 'POST'
        })
            .then(r => {
                if (r.status === 200) {
                    return r.json()
                } else {
                    return null
                }
            })
            .then(r => {
                if (r) {
                    localStorage.setItem('token', r.token);
                    window.location = process.env.PUBLIC_URL + '/'
                } else {
                    alert ('No te pudiste loguear')
                }
            })
    }

    handleUser = (e) => {
        this.setState({
            user: e.target.value
        })
    }

    handlePassword = (e) => {   
        this.setState({
            password: e.target.value
        })
    }


    render() {
        return (
            <div className="login">
                <h2>Para poder ver los precios de los productos te tenes que loguear</h2>
                <h5>Usuario</h5>
                <input type="text" onChange={this.handleUser} placeholder="Ingrese user"/><br/>
                <h5>Password</h5>
                <input type="password"onChange={this.handlePassword} placeholder="Ingrese password"/><br/>
                <button onClick={this.login} className="login__button">Ingresar</button><br/>
                <p>No tenes user? <a href={process.env.PUBLIC_URL + '/register'}>Registrate</a></p>
            </div>
        )
    }
}