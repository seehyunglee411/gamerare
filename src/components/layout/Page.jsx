import { cn } from "../../lib/cn.js";

export function Page({
  background = "pageBg",
  padded = true,
  className,
  contentClassName,
  children,
}) {
  return (
    <main
      className={cn(
        "w-full",
        background === "pageBg" && "bg-pageBg",
        background === "white" && "bg-white",
        padded && "pb-10 md:pb-12",
        "px-[max(16px,calc((100%-1200px)/2))]",
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-content", contentClassName)}>
        {children}
      </div>
    </main>
  );
}
