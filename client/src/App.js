import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/header";
import MainPage from "./features/MainPage";
import { DataProvider } from "./GlobalState";

function App() {
  return (
    <DataProvider>
      <Router>
        <AppContainer>
          <Header />
          <MainPage />
        </AppContainer>
        <Footer />
      </Router>
    </DataProvider>
  );
}

const AppContainer = styled.div`
  max-width: 1230px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
  box-shadow: 0 0 35px #eee;
`;

export default App;
