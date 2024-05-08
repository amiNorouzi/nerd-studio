import { PlateRenderElementProps } from "@udecode/plate-core";

export const CutomePlugin = ({
                            attributes,
                            nodeProps,
                            children,
                          }: PlateRenderElementProps) => {
  return (
    <p {...attributes} {...nodeProps}>
      {/* The `children` prop must always be rendered */}

      hello
    </p>
  );
};