import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";

// Fix these two paths to point to your Components folder
import Create from "../Components/Create/Create"; 
import View from "../Components/View/View"; 

// Your new Footer pages
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Help from "../Pages/Help";
import Sitemap from "../Pages/Sitemap";
import LegalPrivacy from "../Pages/LegalPrivacy";

function MainRoutes() {
  return (
    <Router>
      <Route exact path="/"><Home /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/create"><Create /></Route>
      <Route path="/view"><View /></Route>

      {/* Footer Routes */}
      <Route path="/about"><AboutUs /></Route>
      <Route path="/contact"><ContactUs /></Route>
      <Route path="/help"><Help /></Route>
      <Route path="/sitemap"><Sitemap /></Route>
      <Route path="/legal"><LegalPrivacy /></Route>
    </Router>
  );
}

export default MainRoutes;