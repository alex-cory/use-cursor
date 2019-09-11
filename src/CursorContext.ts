import { createContext } from 'react'
import { CursorPart } from './useCursor'

export type CursorParts = {
  mouse: CursorPart
  [k: string]: CursorPart
}

export const CursorContext = createContext<CursorParts>({
  mouse: {
    isActive: false,
    x: 0, // useRef
    y: 0, // useRef
    ref: {}, // useRef
    ease: 1,
    move() {},
  }
  // ,
  // follower: {
  //   isActive: false,
  //   x: 0, // useRef
  //   y: 0, // useRef
  //   ref: {}, // useRef
  //   ease: 0.1,
  //   move() {},
  // }
})
