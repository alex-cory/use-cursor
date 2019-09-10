import { CursorContext } from 'components/Mouse/CursorContext';

export const useCursor = ({ onCursorMove, onCursorLeave, onCursorEnter }) => {
  const cursor = useContext(CursorContext)

  const onMove = e => {
    if (onCursorMove) {
      onCursorMove(e, cursor)
    }
  }

  const onMouseEnter = e => {
    onCursorEnter(e, cursor)
  }

  const onMouseLeave = e => {
    onCursorLeave(e, cursor)
  }

  return {
    onCursorMove: onMove,
    onCursorEnter: onMouseEnter,
    onCursorLeave: onMouseLeave,
  }
}