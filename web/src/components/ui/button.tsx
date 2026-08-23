import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2864ff] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-[#111] text-white hover:bg-[#2864ff]", outline: "border border-black/10 bg-white text-[#151515] hover:bg-black/5", ghost: "text-[#151515] hover:bg-black/5", secondary: "bg-[#eef2ff] text-[#14306d] hover:bg-[#dfe7ff]" }, size: { default: "h-11 px-5", sm: "h-9 px-4 text-xs", lg: "h-13 px-7", icon: "size-11" } }, defaultVariants: { variant: "default", size: "default" } });
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild=false, ...props }, ref) => { const Comp = asChild ? Slot : "button"; return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />; });
Button.displayName="Button";
export { Button, buttonVariants };
