import type { ExtensionContext } from 'vscode'
import { commands, window } from 'vscode'
import { GAME_OVER, start } from './kiana'
import { showInputBox, showQuickPick } from './input'

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand('idiom-solitaire.startUp', async () => {
    const idiom = await showQuickPick()
    if (idiom === undefined)
      return window.showInformationMessage('[K423]: 为世界上所有的美好而战！')

    const game = start(idiom).play()
    let answer = game.next
    let input
    while (answer?.data.value !== GAME_OVER.value) {
      input = await showInputBox(game.data)
      if (input === undefined)
        break
      answer = game.play(input).next
    }

    const msg = `[K423]: ${input ? 'YOU WIN!' : 'GAME OVER!'}【${input || game.data.value}】`
    window[`show${input ? 'Information' : 'Error'}Message`](msg)
  })
  context.subscriptions.push(disposable)
}

export function deactivate() {

}
