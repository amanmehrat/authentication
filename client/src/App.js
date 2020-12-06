import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Register from './components/Register'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
