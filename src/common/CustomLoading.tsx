import { LoaderCircle } from "lucide-react";
import React from "react";

interface CustomLoadingProps {
  readonly message?: string;
}

const CustomLoading: React.FC<CustomLoadingProps> = ({
  message = "Loading...",
}) => (
  <div
    aria-live="polite"
    className="flex min-h-64 flex-col items-center justify-center gap-4"
    role="status"
  >
    <LoaderCircle
      aria-hidden="true"
      className="h-8 w-8 animate-spin text-primary"
    />
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

export default CustomLoading;
