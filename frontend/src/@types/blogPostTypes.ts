export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  comments: string;
  blogImage: string;
  createdAt: Date;
  updatedAt: Date;
}
