import './App.css';
import React from 'react';
import AppSearch from './components/AppSearch';
import AppTable from "./components/AppTable";
import { AppApi } from "./api/api";
import { Container, Navbar } from "react-bootstrap";

// Because I feel more comfortable with class-based components :)
export default class App extends React.Component {
  constructor(params: any) {
    super(params);

    AppApi.setDefaults();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Navbar expand="lg"
                  variant="light"
                  sticky="top"
                  bg="light">
            <Navbar.Brand href="#">ACTUM task 01</Navbar.Brand>
          </Navbar>

          <AppSearch/>

          <hr/>

          <AppTable/>

        </Container>
      </div>
    );
  }
}
