"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
    router.push("/");
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[80rem] h-[40rem] flex  items-center flex-col border bg-neutral-950 border-dashed border-neutral-500 rounded-3xl p-10 overflow-auto scrollbar-hide">
          <h3 className="text-center mb-5 mt-10 font-bold text-3xl">
            Create Content
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/2">
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-4 rounded-2xl bg-neutral-800"
              type="text"
              placeholder="masukkan judul"
            />
            <input
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-4 rounded-2xl bg-neutral-800"
              type="text"
              placeholder="masukkan konten"
            />
            <button
              disabled={isLoading}
              className="p-4 rounded-2xl bg-white text-neutral-900 font-semibold"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
