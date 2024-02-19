import { WritePage } from "@/components/pages/write";
import type { SearchParamsType } from "@/services/types";

interface IProps {
  searchParams: SearchParamsType;
}
export default function Write({ searchParams }: IProps) {
  return <WritePage searchParamsAppSTab={searchParams} />;
}
