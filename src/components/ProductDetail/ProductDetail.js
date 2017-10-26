import React from  'react';
import Banner from '../Banner/Banner'
import './ProductDetail.css';

export default class ProductDeatil extends React.Component {
    constructor() {
        super();
        this.state = {
            producto: ""
        }
    }

    ultimoprecio = (hist) => {
        if (hist != undefined) {
            return <span>{' $ ' + hist[hist.length - 1].precio}</span>
        }
      }

    crearlista = () => {
        if (this.state.producto.historial != undefined) {
            return this.state.producto.historial.reverse().map(dato => {
                return (
                    <div className="lista-item">
                        <h5 className="lista-item-fecha">{dato.fecha}</h5>
                        <h5 className="lista-item-lugar">{dato.lugar}</h5>
                        <h5 className="lista-item-precio">$ {dato.precio}</h5>
                    </div>
                )
            })
        }
    }

    componentWillMount() {
        fetch('https://server-price-history.herokuapp.com/productos/' + this.props.productId)
            .then(res => res.json())
            .then(product => {
                this.setState({
                    producto: product
                })
            })
    }

    render() {
        return(
            <div className="pagina">
                <Banner dondeestoy={this.state.producto._id}/>
                <div className="partearriba">
                    <div className="producto">
                        <img src={this.state.producto.imagen} alt={"imagen de " + this.state.producto.name}/>
                        <div className="datosInd">
                            <h2 className="nombreDatos">{this.state.producto.nombre}</h2>
                            <h3 className="marcaDatos">{this.state.producto.marca}</h3>
                            <h4 className="precioDatos">ultimo precio: 
                            {this.ultimoprecio(this.state.producto.historial)}    
                            </h4>
                        </div>
                    </div>
                </div>
                
                <div className="lista">
                    <button className="nuevo-historial">Agregar Nuevo precio</button>
                    <div className="lista-item-titulo">
                        <h5 className="lista-item-fecha">Fecha</h5>
                        <h5 className="lista-item-lugar">Lugar</h5>
                        <h5 className="lista-item-precio">Precio</h5>
                    </div>
                    {this.crearlista()}
                </div>
            </div>
        )
    }
}