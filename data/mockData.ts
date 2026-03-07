
import { Postexplorer } from '../types';


export const MOCK_POSTS: Postexplorer[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=1000&auto=format&fit=crop',
    creator: {
      id: 'c1',
      name: 'Neon_Traveler',
      avatar: 'https://i.pravatar.cc/150?u=c1',
      isVerified: true,
      isFollowing: true
    },
    likes: 12482,
    commentsCount: 84,
    caption: 'Late night neon dreaming. The energy here is unmatched. ⚡️',
    location: 'Shibuya, Tokyo',
    tags: ['CHILL VIBE'],
    date: 'OCTOBER 24, 2024',
    comments: [
      {
        id: 'cm1',
        user: { name: 'CyberQueen', avatar: 'https://i.pravatar.cc/150?u=cq' },
        text: 'These colors are absolutely electric!',
        timestamp: '1h',
        likes: 12
      }
    ]
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    creator: { id: 'c2', name: 'TechSoul', avatar: 'https://i.pravatar.cc/150?u=c2', isVerified: false, isFollowing: false },
    likes: 5800,
    commentsCount: 241,
    caption: 'Retro vibes in a modern world.',
    tags: ['TECH', 'VIBE'],
    date: 'OCTOBER 23, 2024',
    isTall: true,
    isVideo: true,
    comments: []
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop',
    creator: { id: 'c3', name: 'ArtMinimalist', avatar: 'https://i.pravatar.cc/150?u=c3', isVerified: true, isFollowing: true },
    likes: 842,
    commentsCount: 32,
    caption: 'Simplicity is the ultimate sophistication.',
    tags: ['MINIMAL'],
    date: 'OCTOBER 22, 2024',
    comments: []
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1000&auto=format&fit=crop',
    creator: { id: 'c4', name: 'GalaxyLens', avatar: 'https://i.pravatar.cc/150?u=c4', isVerified: false, isFollowing: true },
    likes: 2100,
    commentsCount: 115,
    caption: 'Lost in the cosmic flow.',
    tags: ['STORY', 'SPACE'],
    date: 'OCTOBER 21, 2024',
    comments: []
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop',
    creator: { id: 'c5', name: 'CinemaScope', avatar: 'https://i.pravatar.cc/150?u=c5', isVerified: true, isFollowing: false },
    likes: 642,
    commentsCount: 18,
    caption: 'Cinematic mornings.',
    tags: ['VIBE'],
    date: 'OCTOBER 20, 2024',
    comments: []
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop',
    creator: { id: 'c6', name: 'AbstractFlow', avatar: 'https://i.pravatar.cc/150?u=c6', isVerified: false, isFollowing: true },
    likes: 12400,
    commentsCount: 502,
    caption: 'Surreal pathways.',
    tags: ['ABSTRACT'],
    date: 'OCTOBER 19, 2024',
    isTall: true,
    isVideo: true,
    comments: []
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    creator: { id: 'c7', name: 'ObjectMaster', avatar: 'https://i.pravatar.cc/150?u=c7', isVerified: true, isFollowing: true },
    likes: 954,
    commentsCount: 42,
    caption: 'Natural tones.',
    tags: ['LIFESTYLE'],
    date: 'OCTOBER 18, 2024',
    comments: []
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
    creator: { id: 'c8', name: 'NatureBound', avatar: 'https://i.pravatar.cc/150?u=c8', isVerified: false, isFollowing: false },
    likes: 3200,
    commentsCount: 98,
    caption: 'Vast horizons.',
    tags: ['TRAVEL'],
    date: 'OCTOBER 17, 2024',
    comments: []
  },
  {
    id: '9',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop',
    creator: { id: 'c9', name: 'ForestDeep', avatar: 'https://i.pravatar.cc/150?u=c9', isVerified: true, isFollowing: false },
    likes: 1500,
    commentsCount: 67,
    caption: 'Light through the canopy.',
    tags: ['NATURE'],
    date: 'OCTOBER 16, 2024',
    comments: []
  }
];
