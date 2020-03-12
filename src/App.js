import React, {PureComponent} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

// component
import Home from './Components/Home/home';
import Register from './Components/Register/register';
import Menu from './Components/Menu/menu';
import Contratos from './Components/Contratos/contratos';

class App extends PureComponent {

constructor() {
    super();
    this.state = {
        showMenu: true,
        isActive: true
    };
}

menu() {
  this.setState({
    showMenu: !this.state.showMenu,
    isActive: !this.state.isActive
  })
}

render() {

  return (
      <div className="App">
      <Router>
        { this.state.showMenu? <Menu/> :null }
        <div className={ this.state.isActive ? 'conte' : 'conteGen'}>
          <div className="App-header">
          <i className="fa fa-bars menu" onClick={()=> this.menu()}></i>
          </div>
          <div className="container-fluid"> 
              <Switch>
                  <Route exact path='/' component = { Home } />
                  <Route path='/home' component = { Home } />
                  <Route path='/register' component = { Register } />
                  <Route path='/contratos' component = { Contratos } />
              </Switch>
          </div>
        </div>
      </Router>
      </div>
  )
}

}

export default App;
