import { CrossPlatformHandler } from '../common.js'
import { BrowserConsoleHandler } from './browser.js'

export class ConsoleHandler extends CrossPlatformHandler {
  protected loadForBrowser() {
    return new BrowserConsoleHandler()
  }
  protected async loadForNode() {
    const { NodeConsoleHandler } = await import('./node.js')
    return new NodeConsoleHandler()
  }
}
