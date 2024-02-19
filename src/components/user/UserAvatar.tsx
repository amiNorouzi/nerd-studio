import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getFirstLetter } from "@/lib/utils";

interface IProps {
  imageSrc: string;
  firstname: string;
  lastname: string;
  onClick?: () => void;
  className?: string;
}

export function UserAvatar({
  imageSrc,
  className,
  onClick,
  lastname,
  firstname,
}: IProps) {
  return (
    <Avatar onClick={onClick} className={cn("h-9 w-9", className)}>
      {/*<AvatarImage src={userInfo.image} />*/}
      <AvatarFallback className="bg-primary/30">
        {`${getFirstLetter(firstname)}${getFirstLetter(lastname)}`}
      </AvatarFallback>
    </Avatar>
  );
}
