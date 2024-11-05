import React from "react";

export type HeaderProps = React.ComponentPropsWithoutRef<"header"> & {};

const InternalHeader: React.ForwardRefRenderFunction<
  HTMLHeadElement,
  HeaderProps
> = (props, ref) => {
  return <header ref={ref} {...props} />;
};

const Header = React.forwardRef(InternalHeader);

export default Header;
