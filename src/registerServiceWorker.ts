// src/registerServiceWorker.ts
import { registerSW } from 'virtual:pwa-register'

const updateServiceWorker: (() => Promise<void>) | undefined = registerSW({
  onNeedRefresh() {
    console.log('New content available — please refresh.')
  },
  onOfflineReady() {
    console.log('App is ready to work offline.')
  }
})

export default updateServiceWorker
