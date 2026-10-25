import { LogHandler } from '../../logger.js'
import { CrossPlatformHandler } from '../common.js'
import { type FileHandlerOptions } from './node.js'

export type { FileHandlerOptions }

class BrowserFileHandler extends LogHandler {
  constructor() {
    super()
    console.error('FileHandler Does not support browser environment.')
  }
}

export class FileHandler extends CrossPlatformHandler<[Partial<FileHandlerOptions>] | []> {
  protected loadForBrowser() {
    return new BrowserFileHandler()
  }
  protected async loadForNode(options?: Partial<FileHandlerOptions>) {
    const { NodeFileHandler } = await import('./node.js')
    return new NodeFileHandler(options)
  }
}
