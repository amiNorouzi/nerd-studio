import Image from "next/image";

//about panel in user panel dialog

export default function About() {
  return (
    <div className="col">
      <div className="row gap-3">
        <Image
          src="/images/logo.png"
          alt="nerd studio logo"
          width={90}
          height={80}
        />
        <div className="col gap-1">
          <p className="text-xl font-bold">Nerd Studio</p>
          <p className="text-muted-foreground">Version 0.1.1</p>
        </div>
      </div>
    </div>
  );
}
