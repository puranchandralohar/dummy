
import React, {useState, useEffect } from "react";
import { useRouter } from 'next/router';
import SignupPage from "./SignupPage";
import Loader from "@/components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const googleUser = localStorage.getItem('googleUser');
    const googleToken = localStorage.getItem('googleToken');
    
    if (googleUser && googleToken) {
      router.push('/Audio'); 
    }
    else{
      setLoading(false)
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <SignupPage />
    </div>
  );
};

export default Home;



