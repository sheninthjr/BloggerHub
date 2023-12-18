import React from "react";

const ProfileCard = () => {
  return (
    <>
      <div className="bg-base-100">
        <div className="card w-72 flex justify-center items-start p-6 h-20 bg-base-100 shadow-xl border border-slate-400">
          <div className="flex justify-center items-center">
            <div className="avatar">
              <div className="w-8 rounded-full mr-2 ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold">Sheninth Jr</div>
              <div className="badge">
                <button>Add Friend +</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
