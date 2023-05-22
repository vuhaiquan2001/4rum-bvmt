import React from "react";
import icons from "../../assets/icons/index";

function HeaderDropDownNav() {
  return (
    <div className="z-50 absolute w-[calc(100%+2px)] h-auto py-3 bg-slate-300 top-[100%] left-[-1px] border-[1px] border-slate-500 border-t-[transparent!important] shadow-md">
      <div className="">
        <span className="ml-2 mb-1 text-slate-800">Bài viết:</span>
        <div className="flex justify-start items-center hover:bg-slate-200 px-3 py-2 text-sm">
          <img src={icons.home} alt="" className="h-6" />
          <span className="ml-3 text-slate-700">Trang chủ</span>
        </div>
        <div className="flex justify-start items-center hover:bg-slate-200 px-3 py-2 text-sm">
          <img src={icons.popular} alt="" className="h-6" />
          <span className="ml-3 text-slate-700">Được yêu thích</span>
        </div>
        <div className="flex justify-start items-center hover:bg-slate-200 px-3 py-2 text-sm">
          <img src={icons.earth} alt="" className="h-6" />
          <span className="ml-3 text-slate-700">Khám phá</span>
        </div>
      </div>

      <div className="">
        <span className="ml-2 mb-1">Yêu thích:</span>
        <div className="flex justify-start items-center hover:bg-slate-200 px-3 py-1 text-sm">
          <img src={icons.home} alt="" className="h-6" />
          <span className="ml-3">Home</span>
        </div>
      </div>

      <div className="">
        <span className="ml-2 mb-1">Chủ đề:</span>
        <div className="flex justify-start items-center hover:bg-slate-200 px-3 py-1 text-sm">
          <img src={icons.home} alt="" className="h-6" />
          <span className="ml-3">Home</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDownNav;
