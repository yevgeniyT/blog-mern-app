import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  //   Chip,
  Box,
} from '@mui/material';
import { addNewBlogPost } from '../../features/blogPosts/blogPostsThunks';
import Loading from '../Loading';

// This component handles creating a new blog post and submitting the data to the backend.
const CreatePostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  // Declare state variables to store the form inputs.

  const { loading, error, message } = useAppSelector(state => state.blogPostsR);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  //   const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  // Function to reset the form input fields
  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setImage(null);
  };
  // Function to handle image change.
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Function to handle form submission.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBlogPostFormData = new FormData();
      // title is a key, title is value from state
      newBlogPostFormData.append('title', title);
      newBlogPostFormData.append('content', content);
      newBlogPostFormData.append('category', category);
      if (image) {
        newBlogPostFormData.append('blogImage', image);
      }
      dispatch(addNewBlogPost(newBlogPostFormData));
      resetForm();
    } catch (error) {
      //To avoid TypeScript error in catch block and to access the message property of the error, first check if the error is an instance of Error.
      if (error instanceof Error) {
        console.log('Error while creating form-data - ', error.message);
      } else {
        console.log('An unknown error occurred while creating form-data.');
      }
    }
  };

  // Render the form with input fields and a submit button.
  return (
    <Container maxWidth="md">
      {/* Show a loading page when the request is being processed */}
      {loading && <Loading />}

      {/* Show an error message if there's an error */}
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">{message}</Alert>
        </Box>
      )}

      {/* Show a success message if there's no error and a message is present */}
      {!error && message && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="success">{message}</Alert>
        </Box>
      )}
      <Typography variant="h4">Create a New Blog Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Content"
          multiline
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={e => setCategory(e.target.value as string)}
          >
            {/* TODO: Replace the items with your category options */}
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            {/* Add more category options here */}
          </Select>
        </FormControl>
        {/* <FormControl fullWidth margin="normal">
          <InputLabel id="tags-select-label">Tags</InputLabel>
          <Select
            labelId="tags-select-label"
            multiple
            value={tags}
            onChange={e => setTags(e.target.value as string[])}
            renderValue={selected => (
              <div>
                {(selected as string[]).map(value => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            <MenuItem value="Gadgets">Gadgets</MenuItem>
            <MenuItem value="Productivity">Productivity</MenuItem> */}
        {/* Add more tag options here */}
        {/* </Select>
        </FormControl> */}

        <Box mt={2} mb={2} display="flex" alignItems="center">
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleImageChange}
            hidden
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {image && (
            <Typography variant="subtitle1" style={{ marginLeft: 16 }}>
              {image.name}
            </Typography>
          )}
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </form>
    </Container>
  );
};

export default CreatePostForm;
