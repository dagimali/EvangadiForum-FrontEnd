/** @format */

import React from "react";
import EvangadiFooterLogo from "../../commonResource/Images/evangadi-logo-footer.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Instagram, YouTube } from "@mui/icons-material";
const Footer = () => {
  return (
    <div className="text-white bg-[#3b4659] flex justify-between h-48 pt-10 pageWidth w-full">
      <div className="object-center  space-y-5">
        <img src={EvangadiFooterLogo} alt="" />
        <div className="space-x-10">
          <FacebookOutlinedIcon />
          <Instagram />
          <YouTube />
        </div>
      </div>
      <div className="text-white hidden md:block">
        <h1 className="text-xl">Usefull Link</h1>
        <ul className="text-gray-400">
          <li>How it works</li>
          <li>Terms of use</li>
          <li>Privacy policy</li>
        </ul>
      </div>
      <div>
        <h1 className="text-xl">Contact Info</h1>
        <ul className="text-gray-400">
          <li>Evangadi Networks</li>
          <li>support@evangadi.com</li>
          <li>+1-202-386-2702</li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
