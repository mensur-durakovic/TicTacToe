import React from 'react';
import Game from './components/game/game';
import UserInput from '../src/components/landingPage/userInput/userInput';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
        <Route path="/game" component={Game} />
        <Route path="/" exact component={UserInput} />
    </Switch>
    
  );
}

export default App;
