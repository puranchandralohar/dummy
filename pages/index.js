// Home.js
import React, { useState } from "react";
import AudioUpload from "../components/AudioUpload";
import SignupPage from "./SignupPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { GoogleOAuthProvider } from '@react-oauth/google';



const Home = () => {
  const [authenticate, setAuthenticate] = useState(false);
  
  return (
    <div>
      <Header />
      {authenticate ? <AudioUpload /> : <SignupPage />}
      <Footer />
    </div>
  );
};

export default Home;


