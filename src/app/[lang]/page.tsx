import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Header } from "@/app/[lang]/header";

import { getDictionary } from "@/lib/dictionary";
import { i18n, Locale } from "../../../i18n.config";
import { TableDemo } from "@/app/[lang]/test-table";
import { DataTableDemo } from "@/app/[lang]/data-table-test";
import Link from "next/link";
import { TestClient } from "@/app/[lang]/test-client";

interface IProps {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params: { lang } }: IProps) {
  const { page } = await getDictionary(lang);

  return (
    <div>
      <Header />
      <Link href={`/${lang}/test`}>test</Link>
      <Button className={"pr-2"}>{page.home.title}</Button>
      <TestClient />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{page.home["edit profile"]}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className={"sm:text-start"}>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TableDemo />
      <DataTableDemo />
    </div>
  );
}
