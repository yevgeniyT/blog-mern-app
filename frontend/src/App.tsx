import React, { useEffect } from 'react';

import { useAppDispatch } from './app/hooks';

import Index from './routers';
import { getAllBlogPosts } from './features/blogPosts/blogPostsThunks';

function App() {
  const dispatch = useAppDispatch();
  // dispatch action to get all post from DB to state
  useEffect(() => {
    dispatch(getAllBlogPosts());
  }, [dispatch]);

  return (
    <div>
      <Index />
    </div>
  );
}

export default App;
