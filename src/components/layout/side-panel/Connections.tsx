import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const connection = [
  {
    id: "1",
    title: "Google",
    description:
      "After connecting Google, you can login to Nerd Studio with Google",
    Icon: FcGoogle,
  },
];

export function Connections() {
  return (
    <ul className="col gap-2 pt-4">
      {connection.map(({ Icon, id, description, title }) => (
        <li key={id} className="row gap-4">
          <div className="centered-col rounded-full border p-1.5">
            <Icon size="1.5rem" />
          </div>
          <div className="col gap-1.5">
            <h4>{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <Button className="ms-auto">Disconnect</Button>
        </li>
      ))}
    </ul>
  );
}
