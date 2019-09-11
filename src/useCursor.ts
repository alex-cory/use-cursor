import { useContext } from 'react'
import { CursorContext } from './cursorContext'

export type CursorPart = {
  x: number
  y: number
  ref: HTMLElement | {}
  ease: number
  isActive?: boolean
  move: () => void
}

export type Cursor = {
  mouse: CursorPart
  follower?: CursorPart
}

type UseCursor = {
  onCursorMove?: (event: MouseEvent, cursor: Cursor) => void
  onCursorLeave?: (event: MouseEvent, cursor: Cursor) => void
  onCursorEnter?: (event: MouseEvent, cursor: Cursor) => void
}

export const useCursor = ({ onCursorMove, onCursorLeave, onCursorEnter }: UseCursor  = {}) => {
  const cursor = useContext(CursorContext)

  const onMove = (e: MouseEvent) => {
    if (onCursorMove) {
      onCursorMove(e, cursor)
    }
  }

  const onMouseEnter = (e: MouseEvent) => {
    onCursorEnter && onCursorEnter(e, cursor)
  }

  const onMouseLeave = (e: MouseEvent) => {
    onCursorLeave && onCursorLeave(e, cursor)
  }

  return {
    onCursorMove: onMove,
    onCursorEnter: onMouseEnter,
    onCursorLeave: onMouseLeave,
  }
}