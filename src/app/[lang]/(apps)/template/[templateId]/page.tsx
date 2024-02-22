import { ParamsType } from "@/services/types";

export async function generateStaticParams() {
  return [
    { templateId: "1" },
    { templateId: "12" },
    { templateId: "13" },
    { templateId: "14" },
    { templateId: "15" },
    { templateId: "16" },
  ];
}

interface IProps {
  params: ParamsType;
}
export default function Page({ params }: IProps) {
  return (
    <div>
      template:{params.templateId} and lang:{params.lang}
    </div>
  );
}
