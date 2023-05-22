import React from "react";

function Footer() {
  return (
    <div className="flex bg-[var(--primary-header-color)] justify-center w-full h-max  px-[16px] mt-[40px]">
      <div className="flex flex-col justify-center max-w-[1140px] mx-auto">
        <div className="text-xs text-slate-500 py-1 text-center">
          © 2023 Copyright: MetaTFT.com. MetaTFT isn't endorsed by Riot Games
          and doesn't reflect the views or opinions of Riot Games or anyone
          officially involved in producing or managing League of Legends. League
          of Legends™ and Riot Games are trademarks or registered trademarks of
          Riot Games, Inc.
          <div className="text-slate-600">Privacy Policy</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
