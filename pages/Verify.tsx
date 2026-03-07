import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar as Header } from "../components/Navbar";
import {auth} from "../firebase";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");

  /* Read email from router */
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else if (auth.currentUser?.email) {
      setEmail(auth.currentUser.email);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  /* Check email verification status */
  const checkEmailVerified = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("You are not logged in.");
    navigate("/");
    return;
  }

  await user.reload(); 

  if (user.emailVerified) {
    navigate("/home");
  } else {
    alert("Email not verified yet. Please check your email.");
  }
};

  return (
    <div className="bg-white/10 backdrop-blur-3xl  p-10 shadow-2xl flex flex-col gap-6 w-full  overflow-hidden transition-all duration-500  min-h-screen">
      <Header />

      <main className="mesh-gradient flex-1 flex items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden">
        <div className="perspective-container w-full max-w-[520px] z-10 flex flex-col items-center gap-8">

          <h1 className="text-white text-3xl font-bold">
            Verify Your Email
          </h1>

          <p className="text-white/60 text-center">
            We’ve sent a verification link to <br />
            <span className="text-primary font-medium">{email}</span>
          </p>

          <button
            onClick={checkEmailVerified}
            className="w-full h-16 bg-primary text-white  rounded-2xl text-lg font-bold"
          >
            I Have Verified My Email
          </button>

          <p className="text-white/40 text-sm text-center">
            Please open your email, click the verification link,
            then return here and press the button.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
