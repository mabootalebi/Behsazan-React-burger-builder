import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Container/burderBuilder/BurgerBuilder'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import OrderList from './Container/OrderList/OrderList';
import SignUp from './Container/SignUp/SignUp';
import Login from './Container/Login/Login';
import { AuthenticationProvider } from './Context/AuthenticationContext';
import { ApplicationProvider } from './Context/ApplicationContext';

function App() {
  return (
    <AuthenticationProvider>
      <ApplicationProvider>
        <Router>
          <Layout>
            <Switch>
              <Route path="/OrderList" component={OrderList}></Route>
              <Route path="/SignUp" component={SignUp}></Route>
              <Route path="/BurgerBuilder" component={BurgerBuilder}></Route>
              <Route path="/Login" component={Login}></Route>
              <Redirect exact from="/" to="/Login" />
            </Switch>
          </Layout>
        </Router>
      </ApplicationProvider>
    </AuthenticationProvider>
  );
}

export default App;
