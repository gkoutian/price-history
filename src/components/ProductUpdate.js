import React from 'react';
import config from '../config';
import { Link } from 'react-router-dom';
import './ProductUpdate.css';

export default class UpdateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            producto: '',
            precio: '',
            lugar: ''
        }
    }

    componentWillMount() {
        fetch(config.apiUrl + 'products/' + this.props.productId, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(product => {
                this.setState({
                    producto: product
                })
            })
    }

    createHandler = (property) => {
        return (e) => {
            let aux = {};
            aux[property] = e.target.value;
            this.setState (aux);
        }
    };

    create = () => {
        if (this.state.precio == '' || this.state.lugar == '') {
            alert('Debe ingresar los datos')
        } else {
            let d = new Date();
            let nowDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
            let envio = this.state.producto;
            envio.historial.push({ 
                precio: this.state.precio,
                lugar: this.state.lugar,
                fecha: nowDate
            })
            fetch(config.apiUrl + 'products/' + this.props.productId, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                },
                body: JSON.stringify(envio),
                method: 'PUT'
            })
            .then(r => {
                if (r.status === 201) {
                    alert('Actualizad con exito')
                    window.location.href = process.env.PUBLIC_URL + '/producto/' + this.props.productId;
                } else {
                    alert('No se pudo actualizar')
                }})
        }
    }

    render () {
        return (
            <div className="update">
                <div className="partearriba">
                    <div className="producto">
                        <Link to={process.env.PUBLIC_URL + '/producto/' + this.props.productId}>
                            <img src={this.state.producto.imagen} alt={"imagen de " + this.state.producto.name}/>
                        </Link>
                        <div className="datosInd">
                            <h2 className="nombreDatos">{this.state.producto.nombre}</h2>
                            <h3 className="marcaDatos">{this.state.producto.marca}</h3>
                        </div>
                    </div>
                </div>
                <div className="update-product">
                    <h4>Ingrese el nuevo precio del producto</h4>
                    <div className="product-data">
                    <div className="product-place">
                            <h5>Lugar</h5>
                            <input type="text" onChange={this.createHandler('lugar')}  placeholder="Ingrese lugar"/><br/>
                        </div>
                        <div className="product-price">
                            <h5>Precio</h5>
                            <input type="number" onChange={this.createHandler('precio')} placeholder="Ingrese precio"/><br/>
                        </div>
                    </div>
                    <button onClick={this.create} className="create__button">Crear</button><br/>
                </div>
            </div>
        )
    }
}