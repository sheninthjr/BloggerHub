import BlogPost from "@/components/BlogPost";
import UserCard from "@/components/UserCard";

export default function Home() {
  return (
    <>
      <div className="flex pt-16">
        <div className="text-white flex">
          <div className="flex-1 rounded-2xl mr-4">
            <BlogPost />
          </div>
          <div className="pr-10 space-y-5 bg-gray-900 pl-10 rounded-2xl h-fit pb-10">
            <div className="flex justify-center items-center space-x-2">
              <div className="font-extrabold text-white mt-2">
                People You May Know
              </div>
            </div>
            <div style={{ marginLeft: 4 }}>
              <UserCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
