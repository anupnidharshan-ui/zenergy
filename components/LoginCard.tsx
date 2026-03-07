import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {  signInWithPopup,  setPersistence, browserSessionPersistence, inMemoryPersistence } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber,signInWithEmailAndPassword,
  sendEmailVerification, ConfirmationResult, } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {db} from"../firebase";
import { addDoc, collection } from "firebase/firestore";

interface LoginCardProps {
  onToggle: () => void;
  onVerifyTrigger: (target: string) => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  
  onToggle,
  onVerifyTrigger,
}) => {
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [otp, setOtp] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] =
  useState<ConfirmationResult | null>(null);

  const createSession = async (userId: string) => {
  try {
    const deviceType = /Mobi|Android/i.test(navigator.userAgent)
      ? "smartphone"
      : "desktop";

    await addDoc(collection(db, "sessions"), {
      userId: userId,
      device: navigator.platform,
      browser: navigator.userAgent,
      location: "India",
      type: deviceType,
      isActive: true,
      createdAt: new Date()
    });
  } catch (err) {
    console.log("Session error:", err);
  }
};

  const setupRecaptcha = () => {
  if (!(window as any).recaptchaVerifier) {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }
};


const handleSendOTP = async () => {
  if (!inputValue) {
    alert("Enter phone number");
    return;
  }

  try {
    setupRecaptcha();

    const appVerifier = (window as any).recaptchaVerifier;

    const result = await signInWithPhoneNumber(
      auth,
      inputValue,
      appVerifier
    );

    setConfirmationResult(result);
    alert("OTP sent ");
  } catch (error: any) {
    alert(error.message);
  }
};

const handleVerifyOTP = async () => {
  if (!otp || !confirmationResult) {
    alert("Enter OTP");
    return;
  }

  try {
    const result = await confirmationResult.confirm(otp);

await createSession(result.user.uid);

navigate("/home");
  } catch (error: any) {
    alert("Invalid OTP");
  }
};

  const navigate = useNavigate();


  /* EMAIL LOGIN */
  const handleEmailLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    setLoading(true);

        await setPersistence(auth, browserSessionPersistence);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await createSession(user.uid);

    const userDocRef = doc(db, "users", user.uid);
const snap = await getDoc(userDocRef);

if (!snap.exists()) {
  await setDoc(userDocRef, {
    id: user.uid,
username: user.displayName?.toLowerCase().replace(/\s+/g, "") || "",
    email: user.email || "",
    bio: "",
    vibe: "",
    avatarUrl: "",
    createdAt: new Date(),
  });
}

    if (!user.emailVerified) {
      navigate("/verify");
      return;
    }

    navigate("/home");
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  /* GOOGLE LOGIN */
 const handleGoogleLogin = async () => {
  try {
        await setPersistence(auth, browserSessionPersistence);

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await createSession(user.uid);

    const userDocRef = doc(db, "users", user.uid);
    const snap = await getDoc(userDocRef);

    if (!snap.exists()) {
      await setDoc(userDocRef, {
        id: user.uid,
username: user.displayName?.toLowerCase().replace(/\s+/g, "") || "",
        email: user.email || "",
        bio: "",
        vibe: "",
        avatarUrl: user.photoURL || "",
        createdAt: new Date(),
      });
    }

    navigate("/home");

  } catch (error: any) {
    alert(error.message);
  }
};


 return (
    <div className="bg-white/10 backdrop-blur-3xl rounded-[40px] p-10 shadow-2xl flex flex-col gap-6 w-full h-full overflow-hidden transition-all duration-500">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-3 text-white">
          {isPhoneLogin ? 'Quick Access' : 'Welcome Back'}
        </h1>
        <p className="text-white/40 font-medium">
          {isPhoneLogin ? 'Verify your identity via mobile.' : 'Enter the flow to continue your journey.'}
        </p>
      </div>

   <form
  className="space-y-5"
onSubmit={async (e) => {
  e.preventDefault();

  if (isPhoneLogin) {
    if (!confirmationResult) {
      await handleSendOTP();
    } else {
      await handleVerifyOTP();
    }
    return;
  }

  await handleEmailLogin();
}}
>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">
            {isPhoneLogin ? 'Phone Number' : 'Email Address'}
          </label>
          <div className="flex items-center bg-black/40 border border-white/10 rounded-2xl transition-all focus-within:border-[#00d4ff]/50">
            <span className="material-symbols-outlined ml-4 text-[#00d4ff]">
              {isPhoneLogin ? 'smartphone' : 'mail'}
            </span>
            <input 
  type={isPhoneLogin ? 'tel' : 'email'} 
  value={isPhoneLogin ? inputValue : email}
  onChange={(e) =>
    isPhoneLogin
      ? setInputValue(e.target.value)
      : setEmail(e.target.value)
  }
  className="w-full bg-transparent border-none text-white/80 placeholder:text-white/20 h-14 focus:ring-0 text-base px-3 outline-none" 
  placeholder={isPhoneLogin ? '+1 (555) 000-0000' : 'name@energy.com'} 
/>

          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              {isPhoneLogin ? 'One-Time Password (OTP)' : 'Password'}
            </label>
            {!isPhoneLogin && (
              <button type="button" className="text-[10px] font-bold text-[#00d4ff] hover:brightness-125 uppercase tracking-wider transition-all">
                Forgot?
              </button>
            )}
            {isPhoneLogin && (
              <button type="button" className="text-[10px] font-bold text-[#00d4ff] hover:brightness-125 uppercase tracking-wider transition-all">
                Resend
              </button>
            )}
          </div>
          <div className="flex items-center bg-black/40 border border-white/10 rounded-2xl transition-all focus-within:border-[#00d4ff]/50">
            <span className="material-symbols-outlined ml-4 text-white/30">
              {isPhoneLogin ? 'dialpad' : 'lock'}
            </span>
            <input 
  type={isPhoneLogin ? "text" : (showPassword ? "text" : "password")}
  value={isPhoneLogin ? otp : password}
  onChange={(e) =>
    isPhoneLogin
      ? setOtp(e.target.value)
      : setPassword(e.target.value)
  }
  className="w-full bg-transparent border-none text-white/80 placeholder:text-white/20 h-14 focus:ring-0 text-base px-3 outline-none" 
  placeholder={isPhoneLogin ? '• • • • • •' : '••••••••'}
  maxLength={isPhoneLogin ? 6 : undefined}
/>
            {!isPhoneLogin && (
              <button
  type="button"
  onClick={() => setShowPassword((p) => !p)}
  className="mr-4 text-white/30 hover:text-white transition-colors"
>
  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
</button>

            )}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#52d6ff] hover:bg-[#70e0ff] text-[#0a0a0c] font-black h-16 rounded-3xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(82,214,255,0.4)] text-lg uppercase tracking-widest"
        >
{loading
  ? "PROCESSING..."
  : isPhoneLogin
    ? confirmationResult
      ? "VERIFY OTP"
      : "SEND OTP"
    : "SIGN IN"}
        </button>
      </form>
   {/* Switch Method */}
      <div className="flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-white/10"></div>
        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Switch method</span>
        <div className="h-[1px] flex-1 bg-white/10"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
  type="button"
  onClick={(e) => handleGoogleLogin()}
        className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 h-14 rounded-2xl transition-all group">
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
          <span className="text-sm font-bold text-white/80">Google</span>
        </button>
        <button 
          type="button"
          onClick={() => setIsPhoneLogin(!isPhoneLogin)}
          className={`flex items-center justify-center gap-3 bg-white/5 border rounded-2xl transition-all group h-14 ${isPhoneLogin ? 'border-[#00d4ff]/50 bg-[#00d4ff]/5' : 'border-white/10 hover:bg-white/10'}`}
        >
          <span className={`material-symbols-outlined transition-colors ${isPhoneLogin ? 'text-[#00d4ff]' : 'text-white/60 group-hover:text-[#00d4ff]'}`}>
            {isPhoneLogin ? 'mail' : 'smartphone'}
          </span>
          <span className="text-sm font-bold text-white/80">
            {isPhoneLogin ? 'Email' : 'Phone'}
          </span>
        </button>
      </div>
      <div id="recaptcha-container"></div>

      <div className="text-center pt-2">
        <p className="text-white/40 text-sm font-medium">
          New here? 
          <button 
            type="button"
            onClick={onToggle}
            className="text-[#00d4ff] hover:underline font-bold ml-1 transition-all"
          >
            Create an account
          </button>
        </p>
      </div>

    </div>
  );
};
