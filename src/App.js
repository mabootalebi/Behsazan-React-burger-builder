import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Container/burderBuilder/BurgerBuilder'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import OrderList from './Container/OrderList/OrderList';
import SignUp from './Container/SignUp/SignUp';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/OrderList" component={OrderList}></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/" component={BurgerBuilder}></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
