import React from "react";
import PageTitle from "@/components/Typography/PageTitle";
import { ArrowLeft2, ArrowLeft } from "iconsax-react";
import SampleImg from "./../../public/assets/img.jpg";
import SampleLogo from "./../../public/icon-192x192.png";
import { Star } from "iconsax-react";

function VendorDetails() {
  const tabs = ["Dashboard", "Order", "Feedback"];

  return (
    <div>
      <div className="flex items-center justify-between my-6 bg-white shadow-sm w-full h-[3rem] rounded-xl p-4">
        <div className="flex items-center h-full">
          <ArrowLeft className="mr-2 font-bold" />{" "}
          <span className="font-bold">Back</span>
        </div>
        <div className="flex items-center h-full font-bold">Vendor Details</div>
      </div>
      <div className="w-full my-2 flex items-center gap-3">
        {tabs.map((e) => (
          <button className="btn btn-sm rounded-xl bg-orange-400 text-white border-none">
            {e}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[100%] lg:grid-cols-[60%,40%]">
        <div className="w-full flex flex-col items-center bg-white pb-4 rounded-xl overflow-hidden h-[50rem]">
          <div className="h-[15rem] w-full">
            <div className="h-[70%] relative w-full">
              <img
                src={SampleImg}
                className="w-full object-cover h-full rounded-xl"
              />
              <img
                src={SampleLogo}
                className="w-[6rem] h-[6rem] absolute -bottom-[3.5rem] bg-white
              left-[1.5rem] border-emerald-500 border-[2px] rounded-lg object-cover"
              />
              <label className="py-2 absolute bottom-0 font-bold left-[8.5rem] text-white">
                Aiko mart, Area 8, Abuja
              </label>
              <span className="flex items-center absolute left-[8.5rem] py-2">
                4.3 <Star className="ml-1" />
              </span>
              <div className="absolute right-[1.5rem] py-2">
                <button className="btn btn-sm border-none text-white bg-emerald-500">
                  Active ...
                </button>
              </div>
            </div>
          </div>
          <div className="py-2 px-[1.5rem] w-full items-start">
            <span className="font-bold text-black">
              Joined: <span className="font-normal">May, 2023</span>
            </span>
            <div className="flex gap-4 justify-between mt-3">
              <div
                className="btn-ghost border-gray-600 border-[1px] flex flex-col items-center
                p-3 rounded-[1rem] hover:bg-transparent hover:border-[1px] hover:border-gray-600 w-full"
              >
                <span className="font-bold text-emerald-500">Completed</span>
                <span>400+</span>
              </div>
              <div
                className="btn-ghost border-gray-600 border-[1px] flex flex-col items-center
                p-3 rounded-[1rem] w-full hover:bg-transparent hover:border-[1px] hover:border-gray-600"
              >
                <span className="font-bold text-blue-500">Pending</span>
                <span>400+</span>
              </div>
              <div
                className="btn-ghost border-gray-600 border-[1px] flex flex-col items-center
                p-3 rounded-[1rem] w-full hover:bg-transparent hover:border-[1px] hover:border-gray-600"
              >
                <span className="font-bold text-pink-500">Canceled</span>
                <span>400+</span>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default VendorDetails;
