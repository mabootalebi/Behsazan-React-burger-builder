import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Container/burderBuilder/BurgerBuilder'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import OrderList from './Container/OrderList/OrderList';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/OrderList" component={OrderList}></Route>
          <Route path="/" component={BurgerBuilder}></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
