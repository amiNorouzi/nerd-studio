export const CustumInput = ({
  type = "text",
  placeholder = "",
  labale,
  ...props
}: {
  type: string;
  placeholder: string;
  labale: string;
}) => {
  return (
    <div className=" text-[#181818 ] w-full space-y-2 font-semibold">
      <h1 className=" text-base ">{labale}</h1>
      <input
        className={
          " w-full rounded-xl bg-muted py-3 pl-3 pr-16 outline-none ring-0 focus:border-primary focus:bg-background"
        }
        {...props}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
