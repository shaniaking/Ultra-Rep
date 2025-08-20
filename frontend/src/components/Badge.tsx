import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const baseBadgeStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "1rem",
  border: "1px solid",
  padding: "0.125rem 0.5rem",
  fontSize: "0.75rem",
  fontWeight: 500,
  width: "fit-content",
  height: "1.5rem",
  whiteSpace: "nowrap",
  flexShrink: 0,
  gap: "0.25rem",
  overflow: "hidden",
  transition: "color 0.2s, box-shadow 0.2s",
};

const variantStyles: Record<string, React.CSSProperties> = {
  time: {
    borderColor: "transparent",
    backgroundColor: "#1677FF1A",
    color: "#1677FF",
    outline: "1px solid #1677FF",
  },
  goodQuestion: {
    borderColor: "transparent",
    backgroundColor: "#1677FF1A",
    color: "#1677FF",
    outline: "1px solid #1677FF",
  },
  missedObjection: {
    borderColor: "transparent",
    backgroundColor: "#FF98001A",
    color: "#FF9800",
    outline: "1px solid #FF9800",
  },
  tooFast: {
    borderColor: "transparent",
    backgroundColor: "#F9371A33",
    color: "#F9371A",
    outline: "1px solid #F9371A",
  },
  strongRapport: {
    borderColor: "transparent",
    backgroundColor: "#00FF4D1A",
    color: "#00FF4D",
    outline: "1px solid #00FF4D",
  },
};

const variantText: Record<string, string> = {
  time: "00:35",
  goodQuestion: "Good Question",
  missedObjection: "Missed Objection",
  tooFast: "Too Fast",
  strongRapport: "Strong Rapport",
};

function Badge<T extends React.ElementType = "span">({
  className,
  variant = "time",
  asChild = false,
  style,
  children,
  ...props
}: React.ComponentProps<T> & {
  variant?: keyof typeof variantStyles;
  asChild?: boolean;
}) {
  const Comp: React.ElementType = asChild ? Slot : "span";

  const combinedStyles = { ...baseBadgeStyles, ...variantStyles[variant], ...style };

  const content = children ?? variantText[variant];

  return (
    <Comp style={combinedStyles} {...props}>
      {content}
    </Comp>
  );
}

export { Badge };