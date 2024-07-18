import React from "react";
import Audio from "../components/Audio";
import Footer from "../components/Footer";
import DashboardHeader from "../components/AudioHeader"
import withAuth from '../components/WithAuth';

const dashboard = () => {
  return (
    <div>
      <DashboardHeader/>
      <Audio />
      <Footer />
    </div>
  );
};

export default withAuth(dashboard);
