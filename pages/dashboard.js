import React from "react";
import Audio from "../components/Audio";
import Footer from "../components/Footer";
import HeadeerforDashboard from "../components/DashboardHeader"

const dashboard = () => {
  return (
    <div>
      <HeadeerforDashboard/>
      <Audio />
      <Footer />
    </div>
  );
};

export default dashboard;
