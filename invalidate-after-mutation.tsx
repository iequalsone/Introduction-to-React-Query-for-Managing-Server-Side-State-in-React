import { useMutation, useQueryClient } from "react-query";

// Define the type for the new post data
type NewPost = {
  title: string;
};

// Assuming `newPost` is an object of type `NewPost`
const mutation = useMutation((newPost: NewPost) => {
  // Some async function to create a new post
  return fetch("https://api.example.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
});

const queryClient = useQueryClient();

mutation.mutate(newPost, {
  onSuccess: () => {
    queryClient.invalidateQueries("posts"); // Invalidate and refetch 'posts' after the new post is created
  },
});
