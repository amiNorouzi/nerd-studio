const Information = ({ data }: any) => {
  
  return (
    <>
      <div className="flex-1 space-y-10 px-3 pt-16">
        <div className="">
          <h1 className="pb-2 text-4xl font-medium text-[#333333]">
            about {data?.name} {data?.family}
          </h1>
          <p className=" text-lg font-normal text-[#747474]">{data?.about}</p>
        </div>
        <div className="">
          <h1 className="pb-2 text-4xl font-medium text-[#333333]">
            {data?.name} {data?.family} Review
          </h1>
          <p className=" text-lg font-normal text-[#747474]">{data?.review}</p>
        </div>
        <div className="">
          <h1 className=" pb-2 text-4xl font-medium text-[#333333]">
            Services
          </h1>
          <ul className="pace-y-1 list-inside list-disc text-gray-500">
            <li className="text-lg font-normal text-[#747474]">test</li>
          </ul>
        </div>
        <div className="">
          <h1 className=" pb-2 text-4xl font-medium text-[#333333]">
            A few of my favourite things
          </h1>
          <ul className="pace-y-1 list-inside list-disc text-gray-500">
            <li className="text-lg font-normal text-[#747474] ">
              {data?.favorites}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Information;
