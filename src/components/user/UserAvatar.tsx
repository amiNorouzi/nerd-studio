import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getFirstLetter } from "@/lib/utils";

interface IProps {
  imageSrc: string;
  firstname: string;
  lastname: string;
  onClick?: () => void;
  className?: string;
}

/**
 * UserAvatar component show image with first later of firstname and lastname fallback
 * @param imageSrc - image source
 * @param className - extra class name
 * @param onClick - click event of avatar
 * @param lastname - user lastname
 * @param firstname user firstname
 * @constructor
 */
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
