import Link from "next/link";

const PostsPage = () => {
  const date = new Date().toISOString();
  return (
    <div>
      <span>{date}</span>
      <Link href="/posts/create">Create Post</Link>
    </div>
  );
};

export default PostsPage;