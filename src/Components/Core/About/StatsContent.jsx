const stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

const StatsContent =()=>{
    return (
        
        <section className="bg-richblack-700">
            <div className="w-11/12 flex flex-col gap-10 justify-between max-w-maxContent text-white mx-auto">
                <div className="grid grid-cols-4 text-center">
                    {
                        stats.map((item,index)=>(
                            <div
                            key={index}
                            className="flex flex-col py-10"
                            >
                                <h1 className="text-[30px] font-bold text-richblack-5">{item.count}</h1>
                                <h1 className="text-[16px] font-semibold text-richblack-500">{item.label}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsContent;