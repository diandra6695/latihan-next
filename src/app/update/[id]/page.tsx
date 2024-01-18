"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    await fetch("/api/post", {
      method: "PUT",
      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify({
        title,
        content,
        id,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    router.push("/");
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const res = await fetch("/api/post/" + id);
    const json = await res.json();

    if (!json) {
      router.push("/404");
      return;
    }

    setTitle(json.post.title);
    setContent(json.post.content);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[80rem] h-[40rem] flex  items-center flex-col border bg-neutral-950 border-dashed border-neutral-500 rounded-3xl p-10 overflow-auto scrollbar-hide">
          <h3 className="text-center mb-5 mt-10 font-bold text-3xl">
            Update Content
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
