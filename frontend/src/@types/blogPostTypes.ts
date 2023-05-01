export interface IBlogPost {
  title: string;
  slug: string;
  content: string;
  author: string;
  categories: string;
  tags: string[];
  comments: string;
  blogImage: string;
  createdAt: Date;
  updatedAt: Date;
}
