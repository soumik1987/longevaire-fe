/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
  export type RegisterOptions = {
    onNeedRefresh?: (arg?: any) => void
    onOfflineReady?: (arg?: any) => void
    immediate?: boolean
  }

  export function registerSW(options?: RegisterOptions): (() => Promise<void>) | undefined
}
