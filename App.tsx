import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile"
import Messenger from "./pages/Messenger";
import Reels from "./pages/Reels";
import Explorer from "./pages/Explorer";
import { CreatePost } from "./pages/Create/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/home" element={ 
          <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>      
<Route path="/settings" element={
  <ProtectedRoute>
    <Settings />
  </ProtectedRoute>
}
/> 

<Route path="/profile/:uid" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
}
/> 

<Route path="/Messenger" element={
  <ProtectedRoute>
    <Messenger/>
  </ProtectedRoute>
}
/>

<Route path="/Reels" element={
  <ProtectedRoute>
    <Reels/>
  </ProtectedRoute>
}
/>

<Route path="/Explorer" element={
  <ProtectedRoute>
    <Explorer/>
  </ProtectedRoute>
}
/>
<Route path="/create" element={
<ProtectedRoute>
<CreatePost />
</ProtectedRoute> }/>


   </Routes>
    </BrowserRouter>
  );
}


export default App;