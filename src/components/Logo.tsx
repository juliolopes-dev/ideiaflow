import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export const Logo = ({ className, size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl", 
    xl: "text-5xl"
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Icon */}
      <div className={cn(
        "relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg",
        sizeClasses[size]
      )}>
        {/* Inner glow effect */}
        <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-sm" />
        
        {/* Main icon - flowing lines representing ideas */}
        <svg 
          className={cn("relative z-10 text-white", size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : size === "lg" ? "w-8 h-8" : "w-12 h-12")}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flowing idea lines */}
          <path 
            d="M3 12C3 12 5.5 8 12 8C18.5 8 21 12 21 12C21 12 18.5 16 12 16C5.5 16 3 12 3 12Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="animate-pulse"
          />
          <path 
            d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" 
            fill="currentColor"
          />
          {/* Flowing particles */}
          <circle cx="7" cy="9" r="1" fill="currentColor" className="animate-bounce" style={{animationDelay: "0.1s"}} />
          <circle cx="17" cy="15" r="1" fill="currentColor" className="animate-bounce" style={{animationDelay: "0.3s"}} />
          <circle cx="6" cy="15" r="0.5" fill="currentColor" className="animate-pulse" style={{animationDelay: "0.5s"}} />
          <circle cx="18" cy="9" r="0.5" fill="currentColor" className="animate-pulse" style={{animationDelay: "0.7s"}} />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight",
            textSizeClasses[size]
          )}>
            IdeiaFlow
          </h1>
          {size !== "sm" && (
            <p className={cn(
              "text-muted-foreground font-medium leading-tight",
              size === "xl" ? "text-lg" : size === "lg" ? "text-base" : "text-sm"
            )}>
              Fluxo de ideias
            </p>
          )}
        </div>
      )}
    </div>
  );
};
