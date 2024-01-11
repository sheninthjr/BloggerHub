import LoginSession from "./LoginSession";
const SideBar = ({ children }: any) => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen ml-96">
        <div className="flex flex-col md:space-y-10 md:items-center h-screen bg-gray-900 text-black w-1/6 p-4 pt-16">
          <div className="font-bold pt-10 text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
            <a href="/">Home</a>
          </div>
          <div className="font-semibold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
            <a href="/profile">Profile</a>
          </div>
          <div className="font-semibold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
            <a href="/chat">Chat</a>
          </div>
          <div className="font-semibold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
            <a href="/post">Post</a>
          </div>
          <div className="font-semibold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
            <a href="/settings">Settings</a>
          </div>
          <LoginSession />
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="flex text-black ml-4">{children}</div>
        </main>
      </div>
    </>
  );
};

export default SideBar;
