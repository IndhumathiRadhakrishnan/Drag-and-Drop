import React, { useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import aperture from '../Assets/Icons/aperture-outline.svg'
import search from '../Assets/Icons/search-outline.svg'
import gift from '../Assets/Icons/gift-outline.svg'
import bag from '../Assets/Icons/bag-add-outline.svg'
import chevron from '../Assets/Icons/chevron-down-outline.svg'
import menu from '../Assets/Icons/menu-outline.svg'
import filter from '../Assets/Icons/filter-outline.svg'
import cloud from '../Assets/Icons/cloud-upload-outline.svg'
import star from '../Assets/Icons/star-outline.svg'
import ellipsis from '../Assets/Icons/ellipsis-vertical-outline.svg'

function DashBoard() {
    const [searchName, setSearchName] = React.useState('');
    const [round, setRound] = React.useState({
        "open": {
            "title": "Open",
            "color": "red",
            "items": []
        },
        "contacted": {
            "title": "Contacted",
            "color": "green",
            "items": []
        },
        "written": {
            "title": "Written",
            "color": "blue",
            "items": []
        },
        "selecetd": {
            "title": "Selected",
            "color": "yellow",
            "items": []
        },
    });
    useEffect(() => {
        fetch("https://randomuser.me/api/?results=10")
            .then(res => res.json())
            .then(res => {
                setRound(prev => {
                    prev = { ...prev }
                    prev.open.items = res.results
                    return prev;
                })
            })
        fetch("https://randomuser.me/api/?results=5")
            .then(res => res.json())
            .then(res => {
                setRound(prev => {
                    prev = { ...prev }
                    prev.contacted.items = res.results
                    return prev;
                })
            })
        fetch("https://randomuser.me/api/?results=5")
            .then(res => res.json())
            .then(res => {
                setRound(prev => {
                    prev = { ...prev }
                    prev.written.items = res.results
                    return prev;
                })
            })
    }, [])
    const handleDragEnd = ({destination, source}) => {
        if(!destination) return;
        if(destination.index === source.index && destination.droppableId === source.droppableId) return;
        const itemCopy = {...round[source.droppableId].items[source.index]};
        setRound(prev => {
            prev = {...prev};
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);
            prev[source.droppableId].items.splice(source.index, 1);
            return prev;
        })
    }
    return (
        <div className='flex flex-col h-screen '>
            <div className="w-full h-16 bg-white px-5 flex flex-row items-center justify-between">
                <div className="flex gap-x-2 items-center ">
                    <img src={aperture} className="w-8 h-8" alt="aperture" />
                    <div className=" ">iamneo.ai </div>
                    <div className="text-lg font-semibold ">Talent Center</div>
                </div>
                <div className="">
                    <div className="flex text-lg font-semibold gap-x-2">
                        <div className="gap-x-2 flex items-center">               
                            <img src={search} className="w-8 h-8" alt="aperture" />
                            <input type="search" className="focus:outline-none border-b border-gray-200" name="" id="" placeholder='Search by Name' onChange={(e)=>{
                                setSearchName(e.target.value)
                            }} />
                        </div>
                        <button className='p-1 px-2 bg-indigo-900 text-white capitalize rounded-md text-sm flex items-center'><ion-icon name="add-outline" ></ion-icon> Add New</button>
                        <span class="relative inline-block">
                            <img src={gift} className="w-8 h-8  hover:bg-gray-100/20 rounded-full fill-current p-2" alt="aperture" />
                            <span class="absolute top-2 right-1 inline-flex  px-1.5 py-1 text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 text-white bg-red-600 rounded-full">2</span>
                        </span>
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">S</div>
                    </div>
                </div>
            </div>
            <div className="w-full h-16 bg-gray-300/80 px-5 flex flex-row items-center justify-between">
                <div className="flex gap-x-2 items-center ">
                    <img src={bag} className="w-8 h-8" alt="aperture" />
                    <div className=" ">Jobs</div>
                    <img src={chevron} className="w-8 h-8" alt="aperture" />
                    <div className='font-semibold text-lg'>Full-Stack Engineer</div>
                    <div className="border border-gray-200 rounded px-2 bg-white ">View Job Details</div>
                </div>
                <div className="flex gap-x-2 items-center ">
                    <select className="border" name="Add Candidates" id="">
                        <option value="">Add Candidates</option>
                        <option value="">Add Candidates</option>
                        <option value="">Add Candidates</option>
                    </select>
                    <button className='p-1 px-2 bg-indigo-900 text-white capitalize rounded-md text-sm flex items-center'>
                        Published<img src={chevron} className="w-8 h-8" alt="chevron" /> 
                    </button>
                </div>
            </div>
            <div className="w-full h-16 px-5 flex flex-row items-center justify-between">
                <div className="flex gap-0.5">All Candidates -  Active (48) <img src={chevron} className=" w-6 h-6" alt="chevron" /></div>
                <div className="flex gap-0.5">Sort By - Last Updated <img src={chevron} className=" w-6 h-6" alt="chevron" /></div>
                <div className="flex gap-x-2">
                    <img src={menu} className="w-8 h-8" alt="menu" />
                    <img src={filter} className="w-8 h-8" alt="menu" />
                    <img src={cloud} className="w-8 h-8" alt="menu" />
                </div>
            </div>
            <div className="h-full px-4 ml-2 flex overflow-auto ">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {
                        _.map(round, (data, key) => {
                            return (
                                <div className="" key={key}>
                                    <div className='h-12 w-80 bg-white ml-2 flex items-center px-2 border-l-4 rounded' style={{borderColor: data.color}}>
                                        {data.title} - {data.items.length}
                                    </div>
                                    <Droppable droppableId={key}>
                                        {(provided, _snapshot) => {
                                            return (
                                                <div className="w-full bg-blue-100 p-2 m-2 h-fit min-h-[10rem]" ref={provided.innerRef} {...provided.droppableProps}>
                                                    {
                                                        data.items.filter((val) =>
                                                        {
                                                            if(searchName === '' || val.name.first.toLowerCase().includes(searchName.toLowerCase())) return val;
                                                            return null;
                                                        }).map((element, index) => {

                                                            return (
                                                                <Draggable key={element.login.uuid} draggableId={element.login.uuid} index={index}>
                                                                    {(providednext, _snapshotnext) => {
                                                                        return (
                                                                            <div className=' flex flex-col justify-between h-32 w-80 bg-white rounded mt-5'ref={providednext.innerRef} {...providednext.draggableProps}{...providednext.dragHandleProps}>
                                                                                <div className="p-2">
                                                                                    <div className="font-semibold text-blue-900">{element.name.first}</div>
                                                                                    <div className="truncate">{element.email}</div>
                                                                                </div>
                                                                                <div className="bg-gray-100 h-10 flex items-center px-1 justify-between">
                                                                                    <div className="flex gap-0.5">
                                                                                        <img src={star} className="w-6 h-6" alt="star" />
                                                                                        <img src={star} className="w-6 h-6" alt="star" />
                                                                                        <img src={star} className="w-6 h-6" alt="star" />
                                                                                        <img src={star} className="w-6 h-6" alt="star" />
                                                                                    </div>
                                                                                    <div className="flex flex-row items-center gap-x-1">
                                                                                        <img className="rounded-full h-6 w-6" src={element.picture.medium} alt='' />
                                                                                        <img src={ellipsis} className="w-6 h-6" alt="star" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }}
                                                                </Draggable>
                                                            )
                                                        })
                                                    }
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            )
                        })
                    }
                </DragDropContext> 
            </div>
        </div>
    )
}

export default DashBoard