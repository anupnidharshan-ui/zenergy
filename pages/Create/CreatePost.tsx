import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState } from "react";
import { Image as ImageIcon, Video, Send, X } from "lucide-react";
import { VIBES } from "../../constants";
import { VibeCard } from "./VibeCard";
import { uploadToCloudinary } from "../../services/cloudinaryService";
import{auth} from "../../firebase";
import  Sidebar  from "../../components/Sidebar"; 
import { User } from "firebase/auth";

export const CreatePost: React.FC = () => {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedVibe) {
      alert("Please select a vibe before posting.");
      return;
    }

    if (!content && !imageFile && !videoFile) {
      alert("Please add text or media before posting.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl: string | null = null;
      let videoUrl: string | null = null;

      // Upload media to Cloudinary
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      if (videoFile) {
        videoUrl = await uploadToCloudinary(videoFile);
      }

      const currentUser = auth.currentUser as User | null;

if (!currentUser) {
  alert("User not authenticated");
  return;
}

      // Prepare Firestore payload
      const postPayload = {
        text: content,
        vibeId: selectedVibe,
        imageUrl,
        videoUrl,
      uid: currentUser.uid,
username: currentUser.displayName,
avatarUrl: currentUser.photoURL,  
        createdAt: serverTimestamp(),
        likes: [],
          comments: [],                   
        commentsCount: 0,
      };

      // Save to Firestore
      await addDoc(collection(db, "posts"), postPayload);

      alert("Post created successfully!");

      // Reset form
      setSelectedVibe(null);
      setContent("");
      setImageFile(null);
      setVideoFile(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="bg-[#0b0f1a] h-screen text-white overflow-hidden">

    {/* Sidebar */}
    <Sidebar onOpenCreate={() => {}} />

    {/* Main Scrollable Content */}
    <main className="ml-64 h-screen overflow-y-auto px-8 py-14 flex justify-center">
      <div className="w-full max-w-[950px]">

        <header className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Create Your Energy
          </h2>
          <p className="text-white/40 text-lg mt-2">
            Share your vibe with the universe.
          </p>
        </header>
      <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 space-y-8">

        {/* Vibe Selection */}
        <div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 px-1">
            Select Vibe
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
         {Object.entries(VIBES).map(([key, vibe]) => (
  <VibeCard
    key={key}
    vibe={{ ...vibe, id: key }}
    isSelected={selectedVibe === key}
    onClick={() => setSelectedVibe(key)}
  />
))}
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">
            Share the Spark
          </label>
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-6 py-6 rounded-2xl bg-white/[0.02] border border-white/10 text-lg text-white font-medium resize-none h-40 focus:ring-1 focus:ring-cyan-400/40 focus:border-cyan-400/40 outline-none transition-all"
              placeholder="What energy are you sharing today?"
              maxLength={500}
            />
            <div className="absolute bottom-4 right-4">
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                {content.length} / 500
              </span>
            </div>
          </div>
        </div>

        {/* Upload Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-[20px] border-2 border-dashed border-white/20 hover:bg-white/5 transition-all group cursor-pointer">
            <ImageIcon
              className="text-white/40 group-hover:text-cyan-400 transition-colors"
              size={32}
            />
            <span className="text-sm font-semibold text-white/60">
              Upload Image
            </span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                  setVideoFile(null);
                }
              }}
            />
          </label>

          <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-[20px] border-2 border-dashed border-white/20 hover:bg-white/5 transition-all group cursor-pointer">
            <Video
              className="text-white/40 group-hover:text-cyan-400 transition-colors"
              size={32}
            />
            <span className="text-sm font-semibold text-white/60">
              Upload Video
            </span>
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setVideoFile(e.target.files[0]);
                  setImageFile(null);
                }
              }}
            />
          </label>
        </div>

        {/* Media Preview */}
        {imageFile && (
          <div className="relative mt-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="rounded-2xl max-h-64 object-cover"
            />
            <button
              onClick={() => setImageFile(null)}
              className="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-red-500 transition"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        )}

        {videoFile && (
          <div className="relative mt-4">
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="rounded-2xl max-h-64"
            />
            <button
              onClick={() => setVideoFile(null)}
              className="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-red-500 transition"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={
              loading ||
              !selectedVibe ||
              (!content && !imageFile && !videoFile)
            }
            className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${loading ||
              !selectedVibe ||
              (!content && !imageFile && !videoFile)
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-br from-cyan-400 to-cyan-600 text-[#0b0f1a] shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] active:scale-[0.98]"
              }`}
          >
            {loading ? "Posting..." : (
              <>
                <Send size={20} className="fill-current" />
                Radiate Energy
              </>
            )}
          </button>
        </div>
      </div>
      </div>
      </main>
    </div>
    
  );
};