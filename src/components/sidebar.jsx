import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";


const Sidebar = () => {

  const Menus = [
    { title: "Performance", icon: "speedometer-outline", url: "#" },
    { title: "Requests", icon: "file-tray-full-outline", url: "#" },
    { title: "Projects", icon: "bag-add-outline", url: "#" },
    { title: "Candidates", icon: "people-outline", url: "#" },
    { title: "Settings", icon: "settings-outline", url: "#" },

  ];
  const style = {
    navLink: `flex rounded-lg rounded-r-none p-2 py-3 cursor-pointer hover:text-black text-BeeMG-dark-gray text-sm items-center gap-x-4 hover:bg-gradient-to-r from-BeeMG-yellow/50 border-BeeMG-yellow font-semibold justify-center `,
  }


  return (
    <>
      
      <div className='flex flex-col h-screen w-full'>
        
        <div className="flex">
          <div className={` "lg:w-20 md:w-16 w-16"} bg-sky-900 h-screen pt-6 relative duration-300 shadow-md `}>
            <div className="flex gap-x-4 items-center justify-center">
              <div>
                <ion-icon name="aperture-outline" class="h-8 w-8 hover:bg-gray-100/20 rounded-full p-2 text-white">
                </ion-icon>
              </div>
            </div>

            <ul className="pl-2 pt-6 flex flex-col gap-1  ">
              {Menus.map((Menu, index) => (
                <NavLink to={`${Menu.url}`}
                  key={index}
                  className={ style.navLink}
                >
                  <ion-icon name={Menu.icon} class="h-6 w-6 text-white" ></ion-icon>
                  <div className="flex flex-row flex-none gap-1">
                    <span className={`hidden origin-left duration-200 capitalize truncate text-white`}>
                      {Menu.title}
                    </span>
                  </div>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="flex-1 overflow-x-hidden bg-gray-200">
            <div className="w-full h-full ">
              <Outlet />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;