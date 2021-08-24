import React, {Suspense} from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const SingleQuote = React.lazy(() => import('./pages/SingleQuote'))
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"))
const NotFound = React.lazy(() => import("./pages/NotFound"))

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>

        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>

        <Route path="/quotes/:quoteId">
          <SingleQuote />
        </Route>

        <Route path="/new-quote">
          <NewQuote />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
