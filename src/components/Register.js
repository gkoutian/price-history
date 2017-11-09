import React from 'react';
import config from '../config';
import './register.css';

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: ''
        }
    }

    createHandler = (property) => {
        return (e) => {
            let aux = {};
            aux[property] = e.target.value;
            this.setState (aux);
        }
    };

    save = () => {
        fetch(config.apiUrl + 'register', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
            method: 'POST'
        })
            .then(r => {
                if (r.status === 201) {
                    alert('Registrado con exito')
                    window.location.href = process.env.PUBLIC_URL + '/';
                } else {
                    alert('No se pudo registrar')
                }})
    }

    render() {
        return (
            <div className="register">
                <h2>Registrate</h2>
                <h5>Usuario</h5>
                <input type="text" onChange={this.createHandler('user')}  placeholder="Ingrese user"/><br/>
                <h5>Password</h5>
                <input type="password" onChange={this.createHandler('password')}  placeholder="Ingrese Password"/><br/>
                <button onClick={this.save} className="register__button">Registrar!</button>
            </div>
        )
    }
}