import Layout from './Components/Layout/Layout'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { AuthenticationProvider } from './Context/AuthenticationContext';
import { ApplicationProvider } from './Context/ApplicationContext';
import {createStore} from 'redux';
import { Reducer } from './Store/Reducer';
import {Provider} from 'react-redux';
import { lazy, Suspense } from 'react';
import Loading from './Components/UI/Loading/Loading';
import routes from '../src/Tools/routes';

const loadingStore = createStore(Reducer);

function App() {
  return (
    <AuthenticationProvider>
      <ApplicationProvider>
        <Router>
          <Provider store={loadingStore}>
            <Layout>
              <Switch>
                <Suspense fallback={<Loading/>}>
                  {routes.map(t=> <Route key={t.path} path={t.path} component={t.component}/>)}
                  <Route exact path="/" component={lazy(() => import('./Container/Login/Login'))}/>
                </Suspense>
              </Switch>
            </Layout>
          </Provider>
        </Router>
      </ApplicationProvider>
    </AuthenticationProvider>
  );
}

export default App;
