import React, { Component } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import { Switch, Route, Redirect } from 'react-router'
import Header from './Header'
import Login from './Login'
import Search from './Search'
import '../style/App.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="body_wrapper">
          <Switch>
            <Route exact path="/" render={() => <Redirect to='new/1' />} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/new/:page' component={LinkList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App