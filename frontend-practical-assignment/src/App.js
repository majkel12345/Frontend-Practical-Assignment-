import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Fav from "./Fav";
import List from "./List";

function App() {
  return (
    <div className="App">
      <div className="App">
        <Router>
          <Switch>
            <Route path="/fav">
              <Fav />
            </Route>
            <Route path="/">
              <List />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
