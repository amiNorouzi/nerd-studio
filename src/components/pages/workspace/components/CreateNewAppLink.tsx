import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CirclePlus from '@/components/svg-icons/CirclePlus';

interface ICreateNewAppLinkProps {
  href: string;
  className?: string;
  label: string;
}

const CreateNewAppLink = forwardRef<HTMLAnchorElement, ICreateNewAppLinkProps>(
  ({ href, className, label }, ref) => {
    const classes = cn(
      'inline-flex h-[37px] w-[134px] items-center justify-center gap-2 text-nowrap rounded-lg bg-violet-500 px-[23px] py-1.5 hover:bg-violet-800 transition duration-300',
      className
    );

    return (
      <Link href={href} className={classes} ref={ref}>
        <CirclePlus />
        <span className="font-['DM Sans'] text-center text-xs font-normal leading-[18px] text-stone-50">
          {label}
        </span>
      </Link>
    );
  }
);

CreateNewAppLink.displayName = 'CreateNewAppLink';

export default CreateNewAppLink;
