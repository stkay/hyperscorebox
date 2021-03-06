import {MIDIPlayer} from "./MIDIPlayer";

export type ABCLink = {
    startChars: number[],
    pageTitle: string
}

export type ScrapboxLine = {
    text: string
}

//コードブロックの状態
export type ABCBlock = {
    titleElementID: string
    titleElement: HTMLElement
    blockHeight: number
    offsetLeft: number
    width: number
    abc: string
    isEditing: boolean
}

//楽譜表示部の状態
export type ScoreView = {
    parentElementID: string
    element: HTMLElement
    player: MIDIPlayer
}

export type ExternalABC = {
    source: string,
    abc: string
}

export type ImportABCInfo = {
    project: string,
    page: string
}
