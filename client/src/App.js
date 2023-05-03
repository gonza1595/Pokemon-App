import "./App.css";
import Home from "./Vistas/Home";
import { Route, BrowserRouter } from "react-router-dom";
import Detail from "./Components/Detail/Detail";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Form from "./Components/Form/Form";
import axios from "axios";
axios.defaults.baseURL = "https://pokemon-app-production-f6c7.up.railway.app/";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/pokemons/:id" component={Detail} />
        <Route path="/create" component={Form} />
      </div>
    </BrowserRouter>
  );
}

export default App;
