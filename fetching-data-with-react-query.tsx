import { useQuery } from "react-query";

// Define the type for the Post data
type Post = {
  id: number;
  title: string;
};

// Fetching function
const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://api.example.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function BlogPosts() {
  // Using React Query's useQuery to fetch data
  const { data, error, isLoading } = useQuery<Post[]>("posts", fetchPosts);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
