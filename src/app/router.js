import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainContainer, SearchContainer } from 'app/containers';
import { NotFound } from 'app/components';

export default function AppRouter () {
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' component={MainContainer} />
        <Route exact path='/search' component={SearchContainer} />
        <Route exact path='/404' component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </div>
  );
}
