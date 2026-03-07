
import { Post, Story, User, VibeType } from './types';

export const currentUser: User = {
  id: 'me',
  username: 'alex_rivera',
  fullName: 'Alex Rivera',
  avatar: 'https://picsum.photos/id/64/150/150',
  currentVibe: 'Chill',
};

const creators: User[] = [
  { id: '1', username: 'lofi_girl', fullName: 'Lofi Records', avatar: 'https://picsum.photos/id/101/150/150', currentVibe: 'Study' },
  { id: '2', username: 'titan_fit', fullName: 'Marcus Titan', avatar: 'https://picsum.photos/id/102/150/150', currentVibe: 'Gym' },
  { id: '3', username: 'ocean_breeze', fullName: 'Sarah Shore', avatar: 'https://picsum.photos/id/103/150/150', currentVibe: 'Chill' },
  { id: '4', username: 'pixel_art', fullName: 'Design Lab', avatar: 'https://picsum.photos/id/104/150/150', currentVibe: 'Creative' },
  { id: '5', username: 'meme_lord', fullName: 'Chuckles', avatar: 'https://picsum.photos/id/106/150/150', currentVibe: 'Funny' },
];

export const MOCK_STORIES: Story[] = creators.map((u, i) => ({
  id: `s${i}`,
  author: u,
  mediaUrl: `https://picsum.photos/id/${200 + i}/1080/1920`,
  viewed: false,
}));

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: creators[0],
    vibe: 'Study',
    timestamp: '2h ago',
    content: 'Midnight study sessions are where the magic happens. New Lo-fi playlist dropping tonight! 📚🎧',
    type: 'image',
    mediaUrl: 'https://picsum.photos/id/48/1080/1080',
    likes: 1240,
    hasLiked: false,
    hashtags: ['lofi', 'study', 'focus'],
    comments: [
      { id: 'c1', author: creators[3], text: 'The vibe is immaculate.', timestamp: '1h ago' },
      { id: 'c2', author: creators[2], text: 'Exactly what I needed for finals.', timestamp: '30m ago' },
    ],
  },
  {
    id: 'p2',
    author: creators[1],
    vibe: 'Gym',
    timestamp: '4h ago',
    content: 'No excuses. The grind never stops. Push your limits everyday. 💪🔥',
    type: 'reel',
    mediaUrl: 'https://picsum.photos/id/73/1080/1920',
    likes: 4500,
    hasLiked: true,
    hashtags: ['fitness', 'motivation', 'workout'],
    comments: [],
  },
  {
    id: 'p3',
    author: creators[3],
    vibe: 'Creative',
    timestamp: '6h ago',
    content: 'Color palettes inspired by the cyberpunk aesthetic. What do you think? 🎨✨',
    type: 'image',
    mediaUrl: 'https://picsum.photos/id/88/1080/1350',
    likes: 890,
    hasLiked: false,
    hashtags: ['design', 'art', 'creative'],
    comments: [],
  },
  {
    id: 'p4',
    author: creators[4],
    vibe: 'Funny',
    timestamp: '1h ago',
    content: 'Me trying to fix my life at 3 AM: 🤡😂',
    type: 'image',
    mediaUrl: 'https://picsum.photos/id/123/1080/1080',
    likes: 3200,
    hasLiked: false,
    hashtags: ['memes', 'relatable', 'funny'],
    comments: [],
  },
];
