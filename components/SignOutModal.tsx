
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SignOutModal: React.FC<SignOutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

const handleSignOut = async () => {
  try {
    await signOut(auth);
    navigate("/login", { replace: true });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-md rounded-[32px] p-8 shadow-2xl transform animate-in slide-in-from-bottom-12 duration-500">
        <div className="size-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-red-500/20">
          <span className="material-symbols-outlined text-red-500 text-3xl">logout</span>
        </div>
        <h3 className="text-2xl font-bold text-center mb-3">Sign Out?</h3>
        <p className="text-white/40 text-center text-sm mb-8">
          Are you sure you want to log out of your ZENERGY account? You will need to sign back in to access your vibes.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onClose}
            className="py-4 px-6 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
  onClick={handleSignOut} 
            className="py-4 px-6 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
