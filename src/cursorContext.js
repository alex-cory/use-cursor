import { createContext } from 'react'

export const CursorContext = createContext({
  mouse: {
    isActive: false,
    setActive() {},
    x: 0, // useRef
    y: 0, // useRef
    ref: {}, // useRef
    ease: 1,
  },
  follower: {
    isActive: false,
    setActive() {},
    x: 0, // useRef
    y: 0, // useRef
    ref: {}, // useRef
    ease: 0.1,
  }
})
