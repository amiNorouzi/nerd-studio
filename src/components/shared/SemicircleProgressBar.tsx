export function SemicircleProgressBar({ value }: { value: number }) {
  return (
    <div className="relative float-left m-2 text-center">
      <div className="relative -mb-10 h-20 w-40 overflow-hidden">
        <div
          style={{ transform: "rotate(" + (45 + value * 1.8) + "deg)" }}
          className="absolute left-0 top-0 box-border h-40 w-40 rounded-full border-[16px]
          border-primary-light border-b-primary border-e-primary"
        />
      </div>
      <span className="text-3xl">{value}%</span>
    </div>
  );
}
