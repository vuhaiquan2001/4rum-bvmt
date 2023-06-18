import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { React, Fragment, useState} from "react";
import { publicRoutes } from "./router";
import DefaultLayout from "./Layouts/defaultLayout";
import ScrollToTopBtn from "./components/ScrollButton";

function App() {
  
  const [yoffset, SetYOffSet] = useState(0)

  window.onscroll = () => {
      SetYOffSet(window.scrollY.toFixed(0))
  }
 
  
  return (
    <Router>
      <div className="App"> 
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
        {yoffset>500&&<ScrollToTopBtn/>}
      </div>
    </Router>
  );
}

export default App;
