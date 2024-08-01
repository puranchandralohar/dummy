import React from "react";
import Audio from "../components/Audio";
import Footer from "../components/Footer";
import AudioHeader from "../components/AudioHeader"
import withAuth from '../components/WithAuth';
import ReactAudio from '../components/ReactAudio';
import AAudio from '../components/AAudio'

const dashboard = () => {
  return (
    <div>
      <AudioHeader/>
      {/* <Audio /> */}
      <AAudio/>
      {/* <ReactAudio/> */}
      {/* <Footer /> */}
    </div>
  );
};

export default withAuth(dashboard);
