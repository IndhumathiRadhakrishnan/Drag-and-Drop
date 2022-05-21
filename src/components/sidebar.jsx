import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import "./styles.css";
// import ListItem from "./ListItem";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const Sidebar = () => {

  const [open, setOpen] = useState(false);
  const elements = [
    { id: "one", content: "one" },
    { id: "two", content: "two" },
    { id: "three", content: "three" },
    { id: "four", content: "four" }
  ];
  const Menus = [
    { title: "users", icon: "person-circle-outline", url: "#" },
    { title: "events", icon: "calendar-clear-outline", url: "#" },
    { title: "meetings", icon: "videocam-outline", url: "#" },
    { title: "Cancellation Requests ", icon: "ban-outline", url: "#" },
    { title: "Transactions", icon: "swap-horizontal-outline", url: "#" },
    { title: "Reported Users", icon: "people-circle-outline", url: "#" },
    { title: "Feedbacks ", icon: "pricetags-outline", url: "#" },
  ];
  const style = {
    navLink: `flex rounded-lg rounded-r-none p-2 py-3 cursor-pointer hover:text-black text-BeeMG-dark-gray text-sm items-center gap-x-4 hover:bg-gradient-to-r from-BeeMG-yellow/50 border-BeeMG-yellow font-semibold ${!open && 'justify-center'} `,
    // active: `flex rounded-lg rounded-r-none p-2 py-3 cursor-pointer hover:text-black text-BeeMG-dark-gray text-sm items-center gap-x-4 bg-gradient-to-r from-BeeMG-yellow/50 border-r-4 border-BeeMG-yellow text-black font-bold ${!open && 'justify-center'} `,

  }
  // ion-icon {
  //     color: blue;
  //   }
  const [items, setItems] = useState(elements);

  const onDragEnd = (result) => {
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };


  return (
    <>
      
      <div className='flex flex-col h-screen w-full'>
        
        <div className="flex">
          <div className={` ${open ? "lg:w-72 md:w-52" : "lg:w-20 md:w-16 w-16"} bg-sky-900 h-screen pt-6 relative duration-300 shadow-md `}>
            <div className={`absolute cursor-pointer -right-3 inset-y-1/2 h-6 w-6  flex items-center justify-center bg-white hover:bg-BeeMG-yellow hover:text-black rounded-full  ${!open && "rotate-180"} shadow-md`}
              onClick={() => setOpen(!open)}>
              <ion-icon name="chevron-back-outline" class="text-black" ></ion-icon>
            </div>
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
                    <span className={`${!open && "hidden"} origin-left duration-200 capitalize truncate`}>
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