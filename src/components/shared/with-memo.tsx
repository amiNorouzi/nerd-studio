"use client";
import React, { memo } from "react";

export function withMemo<T>(WrapComponent: React.ComponentType<T>) {
  const Component = memo(
    WrapComponent,
    // TODO:write it with better comprehensive
    // Perform deep prop comparison here
    // You can customize this logic based on your needs
    // const arePropsEqual =
    //   JSON.stringify(prevProps) === JSON.stringify(nextProps);
    // return arePropsEqual;
  );

  Component.displayName = `withMemo(${
    WrapComponent.displayName || WrapComponent.name || "component"
  })`;
  return Component;
}
