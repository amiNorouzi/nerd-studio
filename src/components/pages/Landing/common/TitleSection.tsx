"use client";
interface T {
  title: string;
  titlePrimary: string;
  subTitle: string;
}
const TitleSection = ({ title, titlePrimary, subTitle }: T) => {
  return (
    <div className="mb-6 flex flex-col xl:mb-12 ">
      <h2 className="text-title mb-6 text-center font-medium leading-normal">
        {title}
        <span className="text-primary"> {titlePrimary}</span>
      </h2>
      <div className=" text-center">
        <span className=" sub-title sub-color-title">{subTitle}</span>
      </div>
    </div>
  );
};

export default TitleSection;
