import { useEffect, useCallback, FunctionComponent } from 'react'
import { CursorContext, CursorParts } from './CursorContext'
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  a[href], input[type='submit'], input[type='image'], label[for], select, button, .pointer {
    cursor: none;
  }
`

const Outer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: grid;
  cursor: none;
`
import { Cursor, CursorPart } from './useCursor'

type CursorComponent = {
  component: FunctionComponent,
  ref: HTMLElement | undefined
}

type Cool = {
  components: { [K in keyof Cursor]: CursorComponent }
  theCursor: { [K in keyof Cursor]: Omit<CursorPart, 'component'|'move'> }
  moves: (() => void)[]
}

type Test = {
  [K in keyof Cursor]: CursorPart
}
// BUGFIX: when scrolling, the mouse doesn't scroll down
// like it should
export const CursorProvider = ({ cursor, children }) => {
  if (!cursor) throw Error('Must have a cursor passed into the <CursorProvider cursor={cursor} />')
  if (!cursor.mouse) throw Error("'mouse' is required as a key in the 'cursor' object")
  const { components, theCursor, moves } = Object.entries<Cursor>(cursor).reduce(
    (acc, [key /* i.e. 'mouse' and 'follower' */, cursorPart]): Cool => {
      const { component, move, ...rest } = cursorPart
      acc.components[key] = {
        component,
        ref: rest.ref
      } as CursorComponent
      if (key !== 'mouse') acc.moves.push(move)
      acc.theCursor[key] = rest as Omit<CursorPart, 'component'|'move'>
      return acc
    },
    {
      components: {},
      theCursor: {},
      moves: []
    }
  )
  // console.log('THE CURSOR: ', theCursor)
  // console.log('COMPS: ', components)
  const { mouse } = cursor

  const handleMouseMove = (e: MouseEvent) => {
    mouse.x.current = e.pageX
    mouse.y.current = e.pageY
  }

  const moveMouse = useCallback(() => {
    if (!(mouse.ref && mouse.ref.current)) return
    if (mouse.isMoving.current) {
      const { width, height } = mouse.ref.current.getBoundingClientRect()
      const x = mouse.x.current - width * .5
      const y = mouse.y.current - height * .5
      mouse.ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    requestAnimationFrame(moveMouse)
  }, [mouse])

  useEffect(() => {
    moveMouse()
    for (var move of moves) move()
  }, [moves, moveMouse])

  return (
    <CursorContext.Provider value={theCursor}>
      <Outer onMouseMove={handleMouseMove}>
        <GlobalStyle />
        {Object.entries(components).map(([key, { ref, component: Comp }]) => (
          <Comp key={key} ref={ref} />
        ))}
        {/* <Mouse ref={mouse.ref} />
        <Follower ref={follower.ref} /> */}
        {children}
      </Outer>
    </CursorContext.Provider>
  )
}
