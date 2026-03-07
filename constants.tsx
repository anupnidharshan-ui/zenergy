
import { UserProfile1, VibeType } from './types';
import { UserProfile, Highlight, Post } from './types';
import { Contact, Chat } from './types';
import { Reel, NavItem, VibeItem } from './types';
import { Vibe} from './types';


export interface VibeConfig {
  label: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  accentClass: string;
  glowClass: string;
}

export const VIBES: Record<VibeType, VibeConfig> = {
  Study: {
    label: 'Study',
    icon: 'menu_book',
    description: 'Focus & Lo-Fi Beats',
    color: '#a855f7',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    accentClass: 'text-purple-400',
    glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
  },
  Gym: {
    label: 'Gym',
    icon: 'fitness_center',
    description: 'Energy & Fitness Fuel',
    color: '#ef4444',
    gradient: 'from-red-500/20 to-orange-500/20',
    accentClass: 'text-red-400',
    glowClass: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
  },
  Chill: {
    label: 'Chill',
    icon: 'beach_access',
    description: 'Relax & Ambient Music',
    color: '#14b8a6',
    gradient: 'from-teal-500/20 to-cyan-500/20',
    accentClass: 'text-teal-400',
    glowClass: 'shadow-[0_0_20px_rgba(20,184,166,0.3)]',
  },
  Creative: {
    label: 'Creative',
    icon: 'palette',
    description: 'Art, Design & Ideas',
    color: '#ec4899',
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentClass: 'text-pink-400',
    glowClass: 'shadow-[0_0_20px_rgba(236,72,153,0.3)]',
  },
  Bored: {
    label: 'Bored',
    icon: 'explore',
    description: 'Random Discovery',
    color: '#22c55e',
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentClass: 'text-green-400',
    glowClass: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
  },
  Funny: {
    label: 'Funny',
    icon: 'mood',
    description: 'Memes & Comedy',
    color: '#facc15',
    gradient: 'from-yellow-400/20 to-orange-400/20',
    accentClass: 'text-yellow-400',
    glowClass: 'shadow-[0_0_20px_rgba(250,204,21,0.3)]',
  },
};

export const INITIAL_PROFILE: UserProfile1 = {
  username: 'alex_rivera',
  name: 'Alex Rivera',
  avatarUrl: 'https://picsum.photos/seed/alex/400/400',
  postsCount: 128,
  followersCount:'12k',
  followingCount: 850,
  bio: 'Architecting digital dreams & lofi aesthetics. 🌙\nVibe Curator | Creative Developer | Tokyo Based',
  vibe: 'chill',
  link: 'bento.me/alex-rivera',
};


export const HIGHLIGHTS: Highlight[] = [
  { id: '1', label: 'Travels', imageUrl: 'https://picsum.photos/seed/travel/200/200' },
  { id: '2', label: 'Music', imageUrl: 'https://picsum.photos/seed/music/200/200' },
  { id: '3', label: 'Setup', imageUrl: 'https://picsum.photos/seed/setup/200/200' },
  { id: '4', label: 'Art', imageUrl: 'https://picsum.photos/seed/art/200/200' },
];

export const POSTS: Post[] = [
  { id: 'p1', imageUrl: 'https://picsum.photos/seed/post1/600/600', likes: '2.4k', comments: 15 },
  { id: 'p2', imageUrl: 'https://picsum.photos/seed/post2/600/600', likes: '842', comments: 42 },
  { id: 'p3', imageUrl: 'https://picsum.photos/seed/post3/600/600', likes: '1.2k', comments: 89 },
  { id: 'p4', imageUrl: 'https://picsum.photos/seed/post4/600/600', likes: '3.1k', comments: 210 },
  { id: 'p5', imageUrl: 'https://picsum.photos/seed/post5/600/600', likes: '521', comments: 12 },
  { id: 'p6', imageUrl: 'https://picsum.photos/seed/post6/600/600', likes: '920', comments: 35 },
];




export const INITIAL_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Chill_Wave',
    handle: '@chill_wav_tokyo',
    avatar: 'https://picsum.photos/seed/chill/200',
    status: 'online',
    isAi: true
  },
  {
    id: '2',
    name: 'NeonDream',
    handle: '@neon_dreamer',
    avatar: 'https://picsum.photos/seed/neon/200',
    status: 'offline',
    lastSeen: '1h'
  },
  {
    id: '3',
    name: 'PixelPusher',
    handle: '@ppusher_fx',
    avatar: 'https://picsum.photos/seed/pixel/200',
    status: 'offline',
    lastSeen: '4h'
  },
  {
    id: '4',
    name: 'SynthLord',
    handle: '@synth_master',
    avatar: 'https://picsum.photos/seed/synth/200',
    status: 'offline',
    lastSeen: 'Yesterday'
  },
  {
    id: '5',
    name: 'CyberQueen',
    handle: '@c_queen',
    avatar: 'https://picsum.photos/seed/cyber/200',
    status: 'online'
  },
  {
    id: '6',
    name: 'UrbanExplorer',
    handle: '@urban_x',
    avatar: 'https://picsum.photos/seed/urban/200',
    status: 'online'
  }
];

export const INITIAL_CHATS: Chat[] = [
  {
    id: 'chat-1',
    participants: [INITIAL_CONTACTS[0]],
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: '1', text: 'Yo Alex! Did you catch the livestream last night? The visuals were insane.', timestamp: new Date(), isAi: true },
      { id: 'm2', senderId: 'user', text: 'Hey! Yeah, I saw it. Those 3D shaders they used for the background were something else.', timestamp: new Date() },
      { id: 'm3', senderId: '1', text: 'I think it\'s a mix of Bloom and custom Post-Processing stacks. By the way, that new synth track is absolute fire! 🔥', timestamp: new Date(), isAi: true },
    ]
  },
  {
    id: 'chat-2',
    participants: [INITIAL_CONTACTS[1]],
    unreadCount: 0,
    messages: [
      { id: 'm4', senderId: '2', text: 'Are we still meeting at the arcade?', timestamp: new Date() }
    ]
  },
  {
    id: 'chat-3',
    participants: [INITIAL_CONTACTS[2]],
    unreadCount: 1,
    messages: [
      { id: 'm5', senderId: '3', text: 'Sent a new design draft. Check it out.', timestamp: new Date() }
    ]
  }
];



export const REELS: Reel[] = [
  {
    id: '1',
    creator: {
      id: 'c1',
      name: 'CyberQueen',
      username: 'cyber_vibe_official',
      avatarUrl: 'https://picsum.photos/seed/cyberqueen/100/100'
    },
    videoUrl: '',
    imageUrl: 'https://picsum.photos/seed/neoncity/1080/1920',
    description: 'Midnight coding sessions in the heart of the neon district. This is where the magic happens. 🌙✨',
    hashtags: ['#cyberpunk', '#coding', '#vibe', '#neoncity'],
    vibe: 'Synth Vibe',
    vibeIcon: 'auto_awesome',
    likes: '12.4k',
    comments: '842',
    isLive: true,
    audioSource: 'https://picsum.photos/seed/audio1/100/100'
  },
  {
    id: '2',
    creator: {
      id: 'c2',
      name: 'Neo_Ghost',
      username: 'neoghost_visuals',
      avatarUrl: 'https://picsum.photos/seed/neoghost/100/100'
    },
    videoUrl: '',
    imageUrl: 'https://picsum.photos/seed/future/1080/1920',
    description: 'Lost in the textures of the future. The glassmorphism here is hitting different today. 🧊💎',
    hashtags: ['#visuals', '#3dart', '#zen', '#texture'],
    vibe: 'Chill Vibe',
    vibeIcon: 'waves',
    likes: '28.1k',
    comments: '1.2k',
    audioSource: 'https://picsum.photos/seed/audio2/100/100'
  },
  {
    id: '3',
    creator: {
      id: 'c3',
      name: 'TechnoMancer',
      username: 'tmancer_beats',
      avatarUrl: 'https://picsum.photos/seed/techno/100/100'
    },
    videoUrl: '',
    imageUrl: 'https://picsum.photos/seed/beats/1080/1920',
    description: 'Dropping the latest glitch-hop track. Turn up the bass! 🎧🔥',
    hashtags: ['#music', '#glitch', '#beats', '#electronic'],
    vibe: 'Bass Vibe',
    vibeIcon: 'graphic_eq',
    likes: '5.2k',
    comments: '112',
    audioSource: 'https://picsum.photos/seed/audio3/100/100'
  }
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'explore', label: 'Explore', icon: 'explore' },
  { id: 'reels', label: 'Reels', icon: 'movie', isActive: true },
  { id: 'messages', label: 'Messages', icon: 'chat_bubble' },
  { id: 'activity', label: 'Activity', icon: 'notifications' },
  { id: 'create', label: 'Create', icon: 'add_box' },
];

export const UP_NEXT: VibeItem[] = [
  {
    id: 'v1',
    name: 'PixelPusher',
    avatarUrl: 'https://picsum.photos/seed/pixel/100/100',
    description: 'Exploring digital realms through pixels...'
  },
  {
    id: 'v2',
    name: 'SynthLord',
    avatarUrl: 'https://picsum.photos/seed/synth/100/100',
    description: 'New hardware synth jam session tonight'
  }
];
