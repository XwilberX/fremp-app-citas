import React, {Fragment} from "react";
import Home from './Home';
import NavBar from './Navbar'
import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import Createcita from "./CreateCitas";
import Profile from "./Profile"
import Citas from "./Citas";
import NotFound from "./NotFound"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {check} from "../login";

function App() {
  const [login, setLogin] = React.useState(false);

  check().then(r => setLogin(r))

  // console.log(localStorage.rol)
  

  return (
    <Fragment>
      <NavBar />
      
      <Router>:
        {localStorage.rol === '20' &&
          <Switch>
            <Route path="/" exact>
                {login ? <MainPage/> : <Home/>}
            </Route>
            <Route path="/login" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
        }
        {localStorage.rol !== '20' &&
          <Switch>
            <Route path="/" exact>
                {login ? <MainPage/> : <Home/>}
            </Route>
            <Route path="/crear-cita" exact component={Createcita} />
            <Route path="/citas" exact component={Citas} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" exact component={Profile} />
            <Route component={NotFound} />
          </Switch>
        }
      </Router>
    </Fragment>
  );
}

export default App;
