export interface AppCounter {
  total: number
  ensureSSR: 0 | 1
  lastUpSSR: number
  lastUpSR: number
  lastSSR: number
  lastSR: number
  upSSR: number[]
  upSR: number[]
  ssr: number[]
  sr: number[]
}

export interface WishResult {
  ssr: string[]
  sr: string[]
  r: string[]
}

export interface GachaPool {
  name: string
  type: 'character' | 'weapon' | 'newcomers'
  upSSR: string[]
  upSR: string[]
  ssr: string[]
  sr: string[]
  r: string[]
}

export interface SpecialRoll {
  lastCount: number
  baseChance: number
  upChance: number
  softEnsure: number
  turningPoint: number
  hardEnsure: boolean
}
