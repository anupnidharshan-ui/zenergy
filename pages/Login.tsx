
import React, { useState, useCallback } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { LoginCard } from '../components/LoginCard';
import { RegisterCard } from '../components/RegisterCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';


const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isMidSwap, setIsMidSwap] = useState(false);

  const toggleView = useCallback(() => {
    if (isMidSwap) return;

    setIsMidSwap(true);

    setTimeout(() => {
      setIsRegistering((prev) => !prev);
    }, 350);

    setTimeout(() => {
      setIsMidSwap(false);
    }, 700);
  }, [isMidSwap]);

  const navigate = useNavigate();



  const loginStyles = {
    zIndex: isRegistering ? 10 : 20,
    transform: isRegistering
      ? 'translateX(32px) scale(0.92)'
      : (isMidSwap && !isRegistering ? 'translateX(-125%) scale(1)' : 'translateX(0) scale(1)'),
    opacity: isRegistering ? 0.4 : 1,
    filter: isRegistering ? 'blur(4px)' : 'none',
  };

  const registerStyles = {
    zIndex: isRegistering ? 20 : 10,
    transform: !isRegistering
      ? 'translateX(32px) scale(0.92)'
      : (isMidSwap && isRegistering ? 'translateX(-125%) scale(1)' : 'translateX(0) scale(1)'),
    opacity: !isRegistering ? 0.4 : 1,
    filter: !isRegistering ? 'blur(4px)' : 'none',
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060608] text-white overflow-hidden flex flex-col">
      <div className="absolute inset-0 mesh-gradient z-0 ambient-layer" />
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#00d4ff] neon-blob blur-[120px]" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#FF00CB] neon-blob blur-[120px]" style={{ animationDelay: '3s' }} />

      <Navbar />

      <main className="flex-1 relative z-10 flex items-center justify-center p-6">
        <div className="relative w-full max-w-[460px] h-[680px] card-floating">
          <div className="absolute inset-0 lateral-spring" style={registerStyles}>
            <div className="w-full h-full rounded-[40px] overflow-hidden">
              <RegisterCard onToggle={toggleView} />
            </div>
          </div>

          <div className="absolute inset-0 lateral-spring" style={loginStyles}>
            <div className="w-full h-full rounded-[40px] overflow-hidden">
              <LoginCard onToggle={toggleView} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
