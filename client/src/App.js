import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { React, Fragment } from "react";
import { publicRoutes } from "./router";
import DefaultLayout from "./Layouts/defaultLayout";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div className="App flex flex-col">
        <Header />
       <div className="mt-[56px]">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
       </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
