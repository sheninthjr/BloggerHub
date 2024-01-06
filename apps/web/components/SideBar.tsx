
import LoginSession from "./LoginSession";
const SideBar = ({ children }: any) => {
  return (
    <>
      <div className="flex ml-10 h-screen">
        <div className="h-screen ml-96 w-64 bg-gray-900 fixed">
          <div className="flex flex-col h-screen justify-end items-center">
            <div className="pt-28 space-y-10">
              <div className="font-bold text-white text-lg hover:scale-105 hover:text-3xl transition duration-300">
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
            </div>
            <div className="flex-1"></div>
            <div className="pb-4 flex flex-col space-y-3 justify-center items-center">
              <LoginSession />
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="flex justify-center">{children}</div>
        </main>
      </div>
    </>
  );
};

export default SideBar;
