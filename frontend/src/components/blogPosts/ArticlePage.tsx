// src/pages/ArticlePage.tsx
import React from 'react';
import { Container, Typography, Box, Chip, Avatar } from '@mui/material';

// Replace this with the actual post data fetched from your API
const post = {
  id: '1',
  title: 'Sample Post',
  content: 'This is a sample post with some sample content.',
  createdAt: new Date().toISOString(),
  author: {
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://via.placeholder.com/150',
  },
  category: 'Technology',
  tags: ['Gadgets', 'Productivity'],
  imageUrl: 'https://via.placeholder.com/900x300',
};

const ArticlePage: React.FC = () => {
  const { title, content, createdAt, author, category, tags, imageUrl } = post;

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={6}>
        <img
          src={imageUrl}
          alt={title}
          style={{ width: '100%', borderRadius: 8 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {new Date(createdAt).toLocaleDateString()} - {category}
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={author.avatar} alt={author.firstName} />
          <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
            {author.firstName} {author.lastName}
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <Box mt={2}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ArticlePage;
