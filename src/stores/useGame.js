import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const useGame = create(
  subscribeWithSelector((set) => ({
    startTime: 0,
    endTime: 0,
    phase: 'ready',
    start: () =>
      set((state) => {
        if (state.phase === 'ready') return { phase: 'playing', startTime: Date.now() }
        return {}
      }),
    restart: () =>
      set((state) => {
        if (state.phase === 'playing' || state.phase === 'ended') {
          return { phase: 'ready' }
        }
        return {}
      }),
    end: () =>
      set((state) => {
        if (state.phase === 'playing') {
          return { phase: 'ended', endTime: Date.now() }
        }
        return {}
      })
  }))
)

export { useGame }
