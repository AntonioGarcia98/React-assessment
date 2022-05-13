import "./App.css";
import Locations from "./components/Locations";
import AirDetails from "./components/AirDetails";
import {Route,Switch} from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Locations {...props} />}
      ></Route>
      <Route
        exact
        path="/:locationId"
        render={(props) => <AirDetails {...props} />}
      ></Route>
    </Switch>
  );
}

export default App;