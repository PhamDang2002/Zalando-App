/* eslint-disable no-unused-vars */
import { useState, useRef, useId, forwardRef } from "react";
import {
  useFloating,
  FloatingPortal,
  arrow,
  shift,
  offset,
  flip,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// ForwardRef to ensure refs are correctly passed to the elements
const Popover = forwardRef(
  (
    {
      children,
      className,
      renderPopover,
      as: Element = "div",
      initialOpen,
      placement = "bottom-end",
    },
    ref,
  ) => {
    const [open, setOpen] = useState(initialOpen || false);

    // Correctly define the arrowRef without TypeScript
    const arrowRef = useRef(null);

    const data = useFloating({
      open,
      onOpenChange: setOpen,
      middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
      whileElementsMounted: autoUpdate,
      transform: false,
      placement,
    });

    const { refs, floatingStyles, context } = data;
    const hover = useHover(context, { handleClose: safePolygon() });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "tooltip" });
    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
    ]);

    const id = useId();

    return (
      <Element
        ref={refs.setReference} // Correctly set ref for the triggering element
        className={className}
        {...getReferenceProps()}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {open && (
              <motion.div
                ref={refs.setFloating} // Correctly set ref for the floating popover
                style={{
                  transformOrigin: `${data.middlewareData.arrow?.x}px top`,
                  ...floatingStyles,
                }}
                {...getFloatingProps()}
                initial={{ opacity: 0, transform: `scale(0)` }}
                animate={{ opacity: 1, transform: `scale(1)` }}
                exit={{ opacity: 0, transform: `scale(0)` }}
                transition={{ duration: 0.2 }}
              >
                <span
                  ref={arrowRef} // Arrow reference for positioning
                  className="absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-b-white border-t-transparent"
                  style={{
                    left: data.middlewareData.arrow?.x,
                    top: data.middlewareData.arrow?.y,
                  }}
                />
                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </Element>
    );
  },
);

// Ensure the ref is forwarded
Popover.displayName = "Popover";

export default Popover;
