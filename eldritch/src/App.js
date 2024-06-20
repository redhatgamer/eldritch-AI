import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Quiz from './Components/Quiz';
import Results from './Components/Results';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/quiz" component={Quiz} />
                <Route path="/results" component={Results} />
            </Switch>
        </Router>
    );
};

export default App;
