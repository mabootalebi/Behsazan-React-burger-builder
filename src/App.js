import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Container/burderBuilder/BurgerBuilder'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={BurgerBuilder}></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
