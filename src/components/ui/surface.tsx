//extends React.ComponentPropsWithoutRef<"div">

import { cn } from "@/lib/utils";

type SurfaceProps = {
  className?: string;
} & React.ComponentProps<"div">;

function Surface({ className, children, ...props }: SurfaceProps) {
  return (
    <div className={cn("bg-background p-5 rounded-xl", className)} {...props}>
      {children}
    </div>
  );
}

export default Surface;
