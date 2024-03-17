//@ts-nocheck
import { Children, JSX } from "react";

import type { ChildrenProps } from "@/services/types";

/**
 * This is a React functional component that conditionally renders its children based on a boolean prop.
 * It iterates over its children and checks the 'isTrue' prop of each child.
 * If a child has 'isTrue' set to true and no other child with 'isTrue' set to true has been found yet, it sets that child as the 'when' child.
 * If a child does not have an 'isTrue' prop, it sets that child as the 'otherwise' child.
 * It returns the 'when' child if it exists, otherwise it returns the 'otherwise' child.
 *
 * @param {ChildrenProps} props - The props of the component, which include the children to be rendered.
 * @returns {JSX.Element | null} The child to be rendered, either the 'when' child or the 'otherwise' child.
 */
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

/**
 * This is a subcomponent of the Show component that renders its children if the 'isTrue' prop is true.
 *
 * @param {Object} props - The props of the component.
 * @param {boolean} props.isTrue - A boolean indicating whether the children should be rendered.
 * @param {JSX.Element} props.children - The children to be rendered.
 * @returns {JSX.Element | false} The children if 'isTrue' is true, otherwise false.
 */
Show.When = ({
  isTrue,
  children,
}: {
  isTrue: boolean;
  children: JSX.Element;
}) => isTrue && children;

/**
 * This is a subcomponent of the Show component that renders its children or a render prop.
 *
 * @param {Object} props - The props of the component.
 * @param {any} [props.render] - An optional render prop.
 * @param {JSX.Element} props.children - The children to be rendered.
 * @returns {JSX.Element} The children or the render prop.
 */
Show.Else = ({ render, children }: { render?: any; children: JSX.Element }) =>
  render || children;
