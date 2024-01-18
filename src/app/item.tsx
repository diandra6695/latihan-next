"use client";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  post: Post;
}

const Item = ({ post }: Props) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await fetch("/api/post?id=" + id, {
      method: "DELETE",
    });
    router.refresh();
  };
  return (
    <div className="container mx-auto border p-3 rounded-xl border-dashed border-neutral-500 bg-neutral-800">
      <div className="">{post.id}</div>
      <div className="">{post.title}</div>
      <div className="">{post.content}</div>
      <div className="flex mt-3 gap-4 text-sm">
        <button
          className="p-2"
          onClick={() => router.push(`/update/${post.id}`)}
        >
          Update
        </button>
        <button
          className="text-xs text-red-500 hover:text-red-400 font-bold"
          onClick={() => handleDelete(post.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
