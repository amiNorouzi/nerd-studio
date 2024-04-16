"use client";

interface T {
  title?: string;
  titlePrimary?: string;
  subTitle?: string;
  br?: boolean;
  classNames?: string;
  customTrue?: boolean;
  customize?: JSX.Element;
}

const TitleSection = ({
  customTrue,
  customize,
  title,
  titlePrimary,
  subTitle,
  br,
  classNames,
}: T) => {
  if (!customTrue) {
    return (
      <div className={`mb-6 flex flex-col xl:mb-12 ${classNames}`}>
        <h2 className="text-title mb-6 text-center font-medium leading-normal">
          {title}
          {br && <br />}
          <span className="text-primary"> {titlePrimary}</span>
        </h2>
        <div className=" text-center">
          <span className=" sub-title sub-color-title">{subTitle}</span>
        </div>
      </div>
    );
  } else {
    return <>{customize}</>;
  }
};

export default TitleSection;
