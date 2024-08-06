import React from "react";
import AudioHeader from "../components/AudioHeader"
import withAuth from '../components/WithAuth';
import Audio from '../components/Audio'

const dashboard = () => {
  return (
    <div>
      <AudioHeader/>
      <Audio/>
    </div>
  );
};

export default withAuth(dashboard);
