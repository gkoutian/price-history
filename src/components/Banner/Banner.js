import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'

export default class Banner extends React.Component {
    constructor(props){
        super(props)
    }

    definirboton = () => {
        if (this.props.dondeestoy == "inicio") {
            return <button className="banner-button">Crear nuevo producto</button>
        } else {
            return <button className="banner-button">Modificar producto</button>
        }
    }

    render() {
        return(
            <div className="banner">
                <div className="banner-component">
                    <Link to={'/'}>
                        Price-History
                    </Link>
                    {this.definirboton()}
                </div>
            </div>
        )
    }
}