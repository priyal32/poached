import clsx from "clsx";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"span"> {
  className?: string;
  children?: React.ReactNode;
}

const ErrorMessage = React.forwardRef<HTMLSpanElement, Props>(({ className = "", children, ...rest }, ref) => {
  return (
    <span {...rest} className={clsx("mt-0.5 text-xs text-red-800", className)} ref={ref}>
      {children}
    </span>
  );
});

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
