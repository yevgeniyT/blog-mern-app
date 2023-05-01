import React from 'react';
import { useAppSelector } from '../../app/hooks';

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Chip,
  Avatar,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const Posts: React.FC = () => {
  const { blogPosts } = useAppSelector(state => state.blogPostsR);
  const navigate = useNavigate();

  const goToArticlePage = (postId: string) => {
    navigate(`/article/${postId}`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        All Posts
      </Typography>
      <Grid container spacing={4}>
        {blogPosts.map(post => (
          <Grid key={post._id} item xs={12} sm={6} md={4}>
            <Card>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.blogImage}
                  alt={post.title}
                />
                {/* check if categoty exist */}
                {post.category && (
                  <Chip
                    label={post.category}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '16px',
                    }}
                  />
                )}
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content ? post.content.substring(0, 100) + '...' : ''}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Button
                    variant="text"
                    onClick={() => goToArticlePage(post._id)}
                    sx={{
                      textTransform: 'none',
                      textDecoration: 'underline',
                    }}
                  >
                    Read More
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {post.blogImage ? (
                      <Avatar
                        src={post.blogImage}
                        alt={post.author}
                        sx={{ marginRight: 1 }}
                      />
                    ) : post.author ? (
                      <Avatar sx={{ marginRight: 1 }}>
                        {post.author.charAt(0)}
                      </Avatar>
                    ) : (
                      <Avatar sx={{ marginRight: 1 }}></Avatar>
                    )}
                    <Box>
                      <Typography variant="subtitle2">{post.author}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
