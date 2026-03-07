import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";


interface RegisterCardProps {
  onToggle: () => void;
}

export const RegisterCard: React.FC<RegisterCardProps> = ({ onToggle }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


 const navigate = useNavigate();

const handleRegister = async () => {
  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    // Create User
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    //  Save username in Firebase Auth profile
    await updateProfile(user, {
      displayName: username,
    });

     //  CREATE FIRESTORE USER DOCUMENT 
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      username:email.split("@")[0].toLowerCase(),
      email,
      createdAt: new Date(),
    });


    await sendEmailVerification(user);

    // Navigate to verify page with email
    navigate("/verify", { state: { email } });

  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  
  return (
  
    <div className="bg-white/10 backdrop-blur-3xl rounded-[40px] p-10 shadow-2xl flex flex-col gap-2 w-full h-full overflow-hidden">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <span className="material-symbols-outlined text-[#00d4ff] text-5xl opacity-80">account_circle</span>
        </div>
        <h2 className="text-white text-3xl font-extrabold tracking-tight">Join the Pulse</h2>
        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Create your Zenergy identity</p>
      </div>

      
{/* FORM */}
<form
  className="space-y-4"
  onSubmit={(e) => {
    e.preventDefault();
    handleRegister();
  }}
>


    {/* Username */}
    <div className="space-y-1">
      <label className="text-white/20 text-[10px] font-bold uppercase tracking-widest px-1.5">
        Username
      </label>
      <div className="bg-black/40 border border-white/10 rounded-2xl h-12 flex items-center px-3">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
  className="w-full bg-transparent border-none text-white/80 placeholder:text-white/20 h-14 focus:ring-0 text-base px-3 outline-none" 
          placeholder="@handle"
        />
      </div>
    </div>

    {/* Email */}
    <div className="space-y-1">
      <label className="text-white/20 text-[10px] font-bold uppercase tracking-widest px-1.5">
        Email
      </label>
      <div className="bg-black/40 border border-white/10 rounded-2xl h-12 flex items-center px-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
  className="w-full bg-transparent border-none text-white/80 placeholder:text-white/20 h-14 focus:ring-0 text-base px-3 outline-none" 
          placeholder="you@example.com"
        />
      </div>
    </div>

    {/* Password */}
    <div className="space-y-1">
      <label className="text-white/20 text-[10px] font-bold uppercase tracking-widest px-1.5">
        Password
      </label>
      <div className="relative bg-black/40 border border-white/10 rounded-2xl h-12 flex items-center px-3">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
  className="w-full bg-transparent border-none text-white/80 placeholder:text-white/20 h-14 focus:ring-0 text-base px-3 outline-none" 
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 text-cyan-300/80"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

   <button
  disabled={loading}
  type="submit"
  className="w-full bg-[#52d6ff] h-14 rounded-3xl font-black text-[#0a0a0c] uppercase tracking-widest"
>
  {loading ? "INITIALIZING..." : "INITIALIZE"}
</button>
</form>

        {/* FOOTER */}
        <div className="text-center">
        <p className="text-white/20 p-3 text-sm font-medium">
          Already a member? 
          <button 
            onClick={onToggle}
            className="text-[#00d4ff] font-extrabold ml-1 hover:underline underline-offset-4"
          >
            Login here
          </button>
        </p>
      </div>
      

      
           
           </div>
           );
          }
