export interface INews {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];            
  creator: string[];              
  description: string;
  content: string;
  pubDate: string;                
  pubDateTZ: string;    
  image_url: string | null;
  video_url: string | null;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  source_icon: string;
  language: string;               
  coin: string[];                
  sentiment: 'positive' | 'neutral' | 'negative';
  sentiment_stats: {
    positive: number;
    neutral: number;
    negative: number;
  };
  ai_tag: string[];               
  duplicate: boolean;
}
