import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';
import newProduct from './components/newProduct';
import Productdetail from './components/Productdetail';
import ProductUpdate from './components/ProductUpdate';
import './App.css';


export default class App extends React.Component {
    constructor () {
        super();
        let login = localStorage.getItem('token');
        this.state = {
          login: login
        }
    }

    borrarToken = () => {
        localStorage.clear();
        window.location = process.env.PUBLIC_URL + '/';
    }

    render() {
        return(
            <div className="App">
                <header className="App-Header">
                    <div className="App-header-container">
                        <h1 className="App-Header__h1"><a href={process.env.PUBLIC_URL + '/'}>Price History</a></h1>
                        {this.state.login ?
                         <button onClick={this.borrarToken}>Salir</button>
                         :
                         null
                        }
                    </div>
                </header>
                <div className="App-Intro">
                {
                    this.state.login ?
                        <Router>
                            <div className="contenedor">
                                <Route basename="/price-history"/>
                                <Route path={process.env.PUBLIC_URL + '/'} exact={true} component={Search}/>
                                <Route path={process.env.PUBLIC_URL + '/nuevo-producto'} exact={true} component={newProduct}/>
                                <Route 
                                    path={process.env.PUBLIC_URL + '/producto/:productId'}
                                    exact={true}
                                    render={({match}) => <Productdetail productId={match.params.productId}/>}
                                />
                                <Route 
                                    path={process.env.PUBLIC_URL + '/actualizar/:productId'}
                                    exact={true}
                                    render={({match}) => <ProductUpdate productId={match.params.productId}/>}
                            />
                            </div>
                        </Router>
                        :
                        <Router>
                            <div>
                                <Route path={process.env.PUBLIC_URL + '/'} exact={true} component={Login} />
                                <Route path={process.env.PUBLIC_URL + '/register'} exact={true} component={Register} />
                            </div>
                        </Router>
                }
                </div>
            </div>
        )
    }
}