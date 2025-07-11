
import { EtheralShadow } from "@/components/ui/etheral-shadow";

interface EtheralBackgroundProps {
  children: React.ReactNode;
}

export function EtheralBackground({ children }: EtheralBackgroundProps) {
  return (
    <EtheralShadow
      color="rgba(79, 70, 229, 0.3)"
      animation={{ scale: 80, speed: 60 }}
      noise={{ opacity: 0.8, scale: 1.2 }}
      sizing="fill"
      className="min-h-screen w-full"
    >
      {children}
    </EtheralShadow>
  );
}
