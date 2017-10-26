import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App/App';
import ProductDetail from './ProductDetail/ProductDetail';

export default class Rutas extends React.Component {
    render() {
        return(
            <div className="rutas">
                <Router>
                    <div>
                        <Route path={'/'} exact={true} component={App}/>
                        <Route
                            path={'/producto/:productId'}
                            exact={true}
                            render={({match}) => {
                                return <ProductDetail productId={match.params.productId}/>
                            }}
                        />
                    </div>
                </Router>
            </div>
        )
    }
}