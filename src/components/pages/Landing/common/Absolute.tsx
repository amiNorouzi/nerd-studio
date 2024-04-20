import React from "react";
interface AbsoluteType {
  children?: any;
  className: string;
}

/**
 *  this component for absolute Elements
 * @param children
 * @param className
 * @constructor
 */
const Absolute = ({ children, className }: AbsoluteType) => {
  return <div className={className}>{children}</div>;
};

export default Absolute;
