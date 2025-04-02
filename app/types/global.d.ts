interface Window {
  deferredPrompt: {
    prompt: () => void;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  } | null;
}

declare module 'lucide-react' {
  export const Download: React.FC<React.SVGProps<SVGSVGElement>>;
  export const WifiOff: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module 'react' {
  export function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  export function useState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>];
} 