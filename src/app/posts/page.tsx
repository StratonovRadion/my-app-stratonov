"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PostsPage = () => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateDate = () => setDate(new Date().toISOString());
    
    updateDate();

    window.addEventListener("pageshow", updateDate);
    
    return () => {
      window.removeEventListener("pageshow", updateDate);
    };
  }, []);

  if (!date) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Посты</h1>
      <span style={{ display: 'block', marginBottom: '1rem' }}>{date}</span>
      <Link href="/posts/create">
        <button>Create Post</button>
      </Link>
    </div>
  );
};

export default PostsPage;