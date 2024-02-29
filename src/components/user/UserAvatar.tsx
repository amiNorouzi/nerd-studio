import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn, getFirstLetter } from "@/lib/utils";

interface IProps {
  imageSrc: string;
  name: string;
  onClick?: () => void;
  className?: string;
  fallbackClassname?: string;
}

/**
 * UserAvatar component show image with first later of firstname and lastname fallback
 * @param imageSrc - image source
 * @param className - extra class name
 * @param onClick - click event of avatar
 * @param lastname - user lastname
 * @param firstname user firstname
 * @param fallbackClassname extra class for fallback
 *
 * @constructor
 */
export function UserAvatar({
  imageSrc,
  className,
  onClick,
  name = "Nerd Studio",
  fallbackClassname,
}: IProps) {
  const [firstname, lastname] = name.split(" ");

  return (
    <Avatar onClick={onClick} className={cn("h-9 w-9", className)}>
      <AvatarImage src={imageSrc} />
      <AvatarFallback className={cn("bg-primary/30", fallbackClassname)}>
        {`${getFirstLetter(firstname)}${getFirstLetter(lastname)}`}
      </AvatarFallback>
    </Avatar>
  );
}
