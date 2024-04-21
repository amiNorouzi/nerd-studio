import React from "react";
interface AbsoluteType {
  children?: React.ReactNode;
  className: string;
}

/**
 *  this component for absolute Elements
 * @param children
 * @param className
 * @constructor
 */
const Absolute: React.FC<AbsoluteType> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Absolute;
