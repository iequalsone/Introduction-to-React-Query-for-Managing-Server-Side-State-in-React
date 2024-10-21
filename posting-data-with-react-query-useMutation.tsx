import { useState } from "react";
import { useMutation } from "react-query";

// Define the type for the new post data
type NewPost = {
  title: string;
};

// Function to create a new post
const createPost = async (newPost: NewPost): Promise<NewPost> => {
  const response = await fetch("https://api.example.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export function CreatePost() {
  const [title, setTitle] = useState<string>("");

  const mutation = useMutation(createPost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Post Title"
      />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Creating..." : "Create Post"}
      </button>
      {mutation.isError && <p>Error: {mutation.error?.message}</p>}
      {mutation.isSuccess && <p>Post created!</p>}
    </form>
  );
}
