export interface SocialDashboard {
  totalAccounts: number;
  totalPosts: number;
  postStatusBreakdown: { status: string; _count: number }[];
  recentPosts: SocialPost[];
}

export interface SocialAccount {
  id: string;
  projectId: string;
  platform: string;
  accountName: string;
  accountId: string | null;
  followers: number | null;
  isActive: boolean;
  project: {
    id: string;
    name: string;
    client: { id: string; name: string };
  };
  _count?: { posts: number };
  posts?: SocialPost[];
  createdAt: string;
}

export interface SocialPost {
  id: string;
  accountId: string;
  calendarId: string | null;
  content: string;
  mediaUrl: string | null;
  caption: string | null;
  scheduledAt: string | null;
  publishedAt: string | null;
  status: string;
  platformPostId: string | null;
  likes: number;
  comments: number;
  shares: number;
  impressions: number | null;
  clicks: number | null;
  notes: string | null;
  account?: { id: string; platform: string; accountName: string; project?: { id: string; name: string; client: { id: string; name: string } } };
  calendar?: { id: string; month: number; year: number } | null;
  createdAt: string;
}

export interface SocialCalendar {
  id: string;
  projectId: string;
  month: number;
  year: number;
  notes: string | null;
  project: { id: string; name: string; client: { id: string; name: string } };
  _count?: { posts: number };
  posts?: SocialPost[];
  createdAt: string;
}
