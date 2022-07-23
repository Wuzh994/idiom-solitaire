import { getIdiomsList } from './utils'

export interface IUnit {
  value: string
  left: string
  right: string
  hit: boolean
}

class Unit implements IUnit {
  value: string
  left: string
  right: string
  hit: boolean
  constructor(idiom: string) {
    this.value = idiom
    this.left = idiom.charAt(0) || ''
    this.right = idiom.slice(-1) || ''
    this.hit = false
  }
}

export const GAME_OVER = new Unit('>_<')

function initPool() {
  const idiomsList = getIdiomsList()
  const map = new Map<string, Unit[]>()
  const unitPool = idiomsList.map(i => new Unit(i))
  const keys = [...new Set(unitPool.map(i => i.left))]
  keys.forEach((key) => {
    map.set(key, unitPool.filter(i => i.left === key))
  })
  return map
}

class Node {
  data: Unit
  next: null | Node
  constructor(unit: Unit) {
    this.data = unit
    this.next = null
  }

  play(input?: string): Node {
    const curUnit = input ? new Unit(input) : this.data
    if (input && curUnit.left !== this.data.right) {
      this.next = new Node(GAME_OVER)
      return this
    }
    const key = curUnit.right
    const hasFind = Node._UNIT_POOL_.has(key)
    if (hasFind) {
      const nextUnit = Node._UNIT_POOL_.get(key)?.find(i => i.hit === false)
      if (nextUnit) {
        nextUnit.hit = true
        this.data = nextUnit
        return this
      }
    }
    this.next = new Node(GAME_OVER)
    return this
  }

  static _UNIT_POOL_: Map<string, Unit[]>
  static _initPool() {
    Node._UNIT_POOL_ = initPool()
  }
}

export function start(idiom: string) {
  Node._initPool()
  const unit = new Unit(idiom)
  const KIANA = new Node(unit)
  return KIANA
}
