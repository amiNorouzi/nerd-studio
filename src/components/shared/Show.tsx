//@ts-nocheck
import { Children, JSX } from "react";
import { ChildrenProps } from "@/services/types";

export function Show(props: ChildrenProps) {
  let when: JSX.Element | null = null;
  let otherwise: JSX.Element | null = null;

  Children.forEach(props.children, child => {
    if (child.props.isTrue === undefined) {
      otherwise = child;
    } else if (!when && child.props.isTrue === true) {
      when = child;
    }
  });

  return when || otherwise;
}

Show.When = ({
  isTrue,
  children,
}: {
  isTrue: boolean;
  children: JSX.Element;
}) => isTrue && children;

Show.Else = ({ render, children }: { render?: any; children: JSX.Element }) =>
  render || children;
