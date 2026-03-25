
export type VibeType = 'Study' | 'Gym' | 'Chill' | 'Creative' | 'Bored' | 'Funny';

export interface User {
  id: string;
  username: string;
  avatar: string;
  currentVibe: VibeType;
  fullName: string;
}

export interface Post {
  id: string
  uid: string
  username: string
  avatarUrl?: string
  text?: string
  vibeId: string
  imageUrl?: string | null
  videoUrl?: string | null
  createdAt?: any
  likes?: string[]
  comments?: any[]
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: string;
}

export interface Story {
  id: string;
  author: User;
  mediaUrl: string;
  viewed: boolean;
}


export enum SettingsTab {
  EDIT_PROFILE = 'edit_profile',
  ACCOUNT = 'account',
  PRIVACY = 'privacy',
  SECURITY = 'security',
  NOTIFICATIONS = 'notifications',
  HELP = 'help'
}

export interface UserProfile {
  id?: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  website: string;
  bio: string;
  photoUrl?: string;
}

export interface Session {
  id: string;
  device: string;
  location: string;
  browser: string;
  isActive: boolean;
  type: 'laptop' | 'smartphone' | 'desktop';
}


export interface UserProfile1 {
  username: string;
  name: string;
  avatarUrl: string;      
  postsCount: number;
  followersCount: string;
  followingCount: number; 
  bio: string;            
  vibe: string;          
  link: string;   
}

export interface Highlight {
  id: string;
  label: string;
  imageUrl: string;
}

  export interface profilePost {
    id: string;
    imageUrl: string;
    likes: number|string;
    comments: number|string;
  }

export type TabType = 'posts' | 'reels' | 'saved' | 'tagged';


export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isAi?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  status?: string;
  lastSeen?: string;
  isAi?: boolean;
}

export interface Chat {
  id: string;
  type:'primary';
  participants: Contact[];
  lastTimestamp?: string;
  unreadCount: number;
  messages: Message[];
  lastMessage?: string; 
  lastMessageAt?: any;  
}

export type TabTypeMessage = 'Primary' | 'Groups' | 'Requests';


export interface Creator {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
}

export interface Reel {
  id: string;
  creator: Creator;
  videoUrl: string;
  imageUrl: string;
  description: string;
  hashtags: string[];
  vibe: string;
  vibeIcon: string;
  likes: string;
  comments: string;
  isLive?: boolean;
  audioSource?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

export interface VibeItem {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
}


export interface Creatorexplorer {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  isFollowing: boolean;
}

export interface Commentexplorer {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likes: number;
}

export interface Postexplorer {
  id: string;
  imageUrl: string;
  creator: Creatorexplorer;
  likes: number ;
  commentsCount: number;
  comments: Commentexplorer[];
  caption: string;
  location?: string;
  tags: string[];
  date: string;
  isTall?: boolean;
  isVideo?: boolean;
}

export interface Vibe {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}
