const HeroSection = () => {
    return (
      <div className="flex h-screen w-full   flex-col items-center  justify-start md:justify-around gap-5 bg-yellow-400 px-4 pt-[6rem] md:flex-row-reverse md:px-[10%] ">
        <div className="flex items-center w-auto h-auto  justify-center rounded-xl  border border-dashed md:h-2/3 md:w-2/4 ">
          <img
            src="/images/image20.svg"
            className=" translate-x-6 translate-y-3 md:h-full md:translate-x-16 "
            alt=""
          />
        </div>
        <div className="w-full space-y-5 text-center md:w-1/4 md:text-start">
          <h1 className=" text-4xl font-bold text-[48px]">About Us</h1>
          <p className="text-base md:text-2xl font-normal text-[#747474]">
            Any question or remarks? Just write us a message!
          </p>
          <button className="w-full rounded-md bg-white py-4 text-base text-yellow-400 md:w-fit md:px-16 md:py-3">
            Button
          </button>
        </div>
      </div>
    );
}
 
export default HeroSection;