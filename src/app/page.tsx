import Link from "next/link";
import Item from "./item";

const getPost = async () => {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(baseUrl + "/api", { next: { revalidate: 0 } });
  const json = await res.json();

  return json;
};

const Home = async () => {
  const posts = await getPost();

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[80rem] h-[40rem] border bg-neutral-950 border-dashed border-neutral-500 rounded-3xl p-10 overflow-auto scrollbar-hide">
          <Link
            href={"/create"}
            className="py-2 px-3 mb text-start text-sm mb-10 bg-white text-neutral-950 rounded-xl"
          >
            Create
          </Link>
          <div className="flex mt-5 flex-col gap-5">
            {posts?.posts?.map((post: any, i: number) => (
              <Item key={i} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
