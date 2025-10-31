export type WebsiteCategory = '노래' | '아이돌' | '사진' | '운동';

export interface IWebsite {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  category: WebsiteCategory;
}
