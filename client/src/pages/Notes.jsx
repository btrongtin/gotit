import React from "react";

const Notes = () => {
    return (
        <>
            <div className="h-[600px] p-4 bg-gradient-to-b from-[#BBF6FE] to-[#D0CDF2] flex items-center justify-center rounded-md">
                <div className="h-full w-full px-6 py-8 rounded-md bg-white/40 border border-white grid grid-cols-4 relative">
                    <div className="bg-[#F49D1A] w-36 h-36 opacity-100 p-3 rounded ">
                        <h5 className="text-md text-white">Hello world</h5>
                    </div>
                    <div className="bg-[#9ADCFF] w-36 h-36 opacity-100 p-3 rounded">
                        <h5 className="text-md text-white">Hello world</h5>
                    </div>
                    <div className="bg-[#FFF89A] w-36 h-36 opacity-100 p-3 rounded">
                        <h5 className="text-md text-white">Hello world</h5>
                    </div>
                    <div className="bg-[#B3FFAE] w-36 h-36 opacity-100 p-3 rounded">
                        <h5 className="text-md text-white">Hello world</h5>
                    </div>
                    <div className="bg-[#FF8AAE] w-36 h-36 opacity-100 p-3 rounded">
                        <h5 className="text-md text-white">Hello world</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notes;
