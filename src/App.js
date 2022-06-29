import React from "react";
import {useEffect} from 'react'
import {Switch, Link, Route } from "react-router-dom";
import Home from './Home'
import PizzaForm from './PizzaForm'
import styled from 'styled-components'
import Confirmation from './Confirmation'


const Header = styled.div`
  display: flex;
  justify-content:space-between;
  padding: 2vw;
  background: rgba(220, 65, 65, 0.8);
`


const Options = styled.div`
  margin-left:20px;
`

const BodyContainer = styled.div`
  background: rgba(8, 130, 33, 0.8)

`

const App = () => {

  return (
      <div>
        <Header>
            Lambda Eats
          <Options>
            <Link to='/'>
              Home
            </Link>
          </Options>
        </Header>

        <BodyContainer>
          <Switch>
            <Route exact path ='/'>
              <Home/>
            </Route>

            <Route path ='/pizza'>
              <PizzaForm/>
            </Route>

            <Route exact path='/confirmation'>
              <Confirmation/>
            </Route>
            
          </Switch>
          </BodyContainer>
      </div>

  );
}



export default App;
