
const HeroSectionPerson = ({data}:any) => {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-start gap-3 md:gap-16 bg-yellow-400 pt-[5rem] text-center md:flex-row md:items-center md:justify-center">
        <div className=" relative">
          <img
            src="/images/pattern.svg"
            className="absolute left-0  top-0 h-16 w-16 md:h-32  md:w-32"
            alt=""
          />
          <img
            className="h-44 w-44 rounded-full border-[25px] border-[#9373EE] md:h-96 md:w-96"
            src={data?.avatar}
            alt=""
          />
          <img
            src="/images/pattern.svg"
            className="absolute bottom-0  right-0 h-16 w-16 md:h-32  md:w-32"
            alt=""
          />
        </div>
        <div className="w-full space-y-5 md:space-y-4 md:w-1/4 md:text-left">
          <h1 className=" mt-3 text-3xl font-medium text-black">
            {data?.name} {data?.family}
          </h1>
          <p className="text-lg font-normal text-[#5729DA]">
            {data?.role.title}
          </p>
          <p className="text-base font-normal text-[#747474]">{data?.about}</p>
          <div className="w-full px-5 md:px-0">
            <button className=" w-full md:w-fit md:px-12 md:py-2 rounded-md bg-white py-3  text-yellow-400">
              click
            </button>
          </div>
        </div>
      </div>
    );
}
 
export default HeroSectionPerson;