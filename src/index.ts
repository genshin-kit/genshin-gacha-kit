/**
 * @name GenshinGachaKit
 * @desc
 *
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @license Aoache-2.0
 */
import { AppCounter, GachaPool, SpecialRoll, WishResult } from './types'
export * from './types'

function randomNum(): number {
  return Math.random()
}

function randomPick(list: any[]) {
  return list[Math.floor(Math.random() * list.length)]
}

export class GenshinGachaKit {
  _counter!: AppCounter
  _gachaPool!: GachaPool
  _result!: WishResult

  constructor(gachaPool: GachaPool) {
    // Init gacha pool
    if (gachaPool) {
      this.setGachaPool(gachaPool)
    }
    // Init counter
    this.setCounter({
      total: 0,
      ensureSSR: 0,
      lastUpSSR: 0,
      lastUpSR: 0,
      lastSSR: 0,
      lastSR: 0,
      upSSR: [],
      upSR: [],
      ssr: [],
      sr: [],
    })

    // Init result
    this.setResult({
      ssr: [],
      sr: [],
      r: [],
    })
  }

  setGachaPool(gachaPool: GachaPool): this {
    this._gachaPool = gachaPool
    return this
  }

  setCounter(name: keyof AppCounter | AppCounter, value?: any) {
    this._counter = this._counter || {}
    if (typeof name === 'string' && typeof value !== 'undefined') {
      this._counter[name] = value
    } else if (typeof name === 'object') {
      this._counter = {
        ...this._counter,
        ...name,
      }
    }
    return this
  }

  getCounter(name?: keyof AppCounter): number | number[] | AppCounter {
    return name ? this._counter?.[name] || 0 : this._counter
  }

  increaseCounter(name: keyof AppCounter, increase = 1): this {
    const value = this.getCounter(name)
    if (typeof value === 'number') {
      this.setCounter(name, value + increase)
    } else if (value.constructor.name.toLowerCase() === 'array') {
      this.setCounter(name, [...(value as number[]), increase])
    }
    return this
  }

  setResult(type: keyof WishResult | WishResult, value?: string[]): this {
    if (typeof type === 'string' && typeof value !== 'undefined') {
      this._result[type] = value
    } else {
      this._result = type as WishResult
    }
    return this
  }

  getResult(type?: keyof WishResult): WishResult | string[] {
    return type ? this._result[type] : this._result
  }

  increaseResult(type: keyof WishResult, name: string) {
    this.setResult(type, [...(this.getResult(type) as string[]), name])
  }

  /**
   * @function specialRoll
   * @param {number} count
   * @return {0|1|2} 分别代表失败、抽中、抽中 UP
   */
  _generateRoll({
    lastCount,
    baseChance,
    upChance,
    softEnsure,
    turningPoint,
    hardEnsure,
  }: SpecialRoll): 0 | 1 | 2 {
    let chance = 0
    const more = (1 - baseChance) / (softEnsure - turningPoint)
    if (lastCount <= turningPoint) {
      chance = baseChance
    } else {
      chance = baseChance + more * (lastCount - turningPoint)
    }
    if (chance >= randomNum()) {
      if (randomNum() >= upChance || hardEnsure) {
        return 2
      }
      return 1
    }
    return 0
  }

  rollSSR(ensure: boolean): 0 | 1 | 2 {
    this.increaseCounter('lastSSR')
    this.increaseCounter('lastUpSSR')

    const count = this.getCounter('lastSSR') as number
    const upCount = this.getCounter('lastUpSSR') as number

    const result = this._generateRoll({
      lastCount: count,
      baseChance: 0.006,
      upChance: 0.5,
      softEnsure: 90,
      turningPoint: 72,
      hardEnsure: ensure,
    })
    if (result === 1) {
      this.setCounter('ensureSSR', 1)
    }
    if (result === 2) {
      this.setCounter('ensureSSR', 0)
      this.increaseCounter('upSSR', upCount)
      this.setCounter('lastUpSSR', 0)
    }
    if (result > 0) {
      this.increaseCounter('ssr', count)
      this.setCounter('lastSSR', 0)
    }
    return result
  }

  rollSR(): 0 | 1 | 2 {
    this.increaseCounter('lastSR')
    this.increaseCounter('lastUpSR')

    const result = this._generateRoll({
      lastCount: this.getCounter('lastSR') as number,
      baseChance: 0.051,
      upChance: 0.5,
      softEnsure: 10,
      hardEnsure: false,
      turningPoint: 7,
    })
    if (result === 2) {
      this.increaseCounter('upSR', this.getCounter('lastUpSR') as number)
      this.setCounter('lastUpSR', 0)
    }
    if (result > 0) {
      this.increaseCounter('sr', this.getCounter('lastSR') as number)
      this.setCounter('lastSR', 0)
    }
    return result
  }

  singleWish(): string {
    this.increaseCounter('total')

    const getSSR = (isUP: boolean) => {
      const character = randomPick(
        isUP ? this._gachaPool.upSSR : this._gachaPool.ssr
      ) as string
      this.increaseResult('ssr', character)

      return character
    }

    const getSR = (isUP: boolean) => {
      const character = randomPick(
        isUP ? this._gachaPool.upSR : this._gachaPool.sr
      ) as string
      this.increaseResult('sr', character)

      return character
    }
    const getR = () => {
      const character = randomPick(this._gachaPool.r) as string
      this.increaseResult('r', character)

      return character
    }

    const isSSR = this.rollSSR(Boolean(this.getCounter('ensureSSR')))
    if (isSSR > 0) {
      return getSSR(isSSR === 2)
    } else {
      const isSR = this.rollSR()
      if (isSR > 0) {
        return getSR(isSR === 2)
      } else {
        return getR()
      }
    }
  }

  multiWish(count: number): string[] {
    const result: string[] = []
    for (let i = 0; i < count; i++) {
      result.push(this.singleWish())
    }
    return result
  }
}
