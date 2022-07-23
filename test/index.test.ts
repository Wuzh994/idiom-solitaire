import { describe, expect, it } from 'vitest'
import { start } from '../src/kiana'

describe('start game', () => {
  it('expect a idiom start with 金', () => {
    const game = start('一字千金').play()
    expect(game.data.value).toMatch(/^金/)
  })
})
