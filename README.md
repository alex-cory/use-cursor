<!-- <a href="https://github.com/alex-cory/use-cursor">
    <img src="https://github.com/alex-cory/use-cursor/raw/master/public/dog.png" />
</a> -->

<br/>

<p align="center">
    <h1 align="center">useCursor</h1>
</p>

<br />

<p align="center">
    <a href="https://github.com/alex-cory/use-cursor/pulls">
      <img src="https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" />
    </a>
    <a href="https://circleci.com/gh/alex-cory/use-cursor">
      <img src="https://img.shields.io/circleci/project/github/alex-cory/use-cursor/master.svg" />
    </a>
    <a href="https://www.npmjs.com/package/use-cursor">
      <img src="https://img.shields.io/npm/dm/use-cursor.svg" />
    </a>
    <a href="https://lgtm.com/projects/g/alex-cory/use-cursor/context:javascript">
      <img alt="undefined" src="https://img.shields.io/lgtm/grade/javascript/g/alex-cory/use-cursor.svg?logo=lgtm&logoWidth=18"/>
    </a>
    <a href="https://spectrum.chat/use-cursor">
        <img src="https://withspectrum.github.io/badge/badge.svg" />
    </a>
<!-- [![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/next-js) -->
<!--     <a href="https://bundlephobia.com/result?p=use-cursor">
      <img alt="undefined" src="https://img.shields.io/bundlephobia/minzip/use-cursor.svg">
    </a> -->
<!--     <a href="https://snyk.io/test/github/alex-cory/use-cursor?targetFile=package.json">
      <img src="https://snyk.io/test/github/alex-cory/use-cursor/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/alex-cory/use-cursor?targetFile=package.json" style="max-width:100%;">
    </a> -->
<!--     <a href="https://www.npmjs.com/package/use-cursor">
      <img src="https://img.shields.io/npm/v/use-cursor.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/alex-cory/use-cursor?targetFile=package.json" style="max-width:100%;">
    </a> -->
<!--     <a href="https://github.com/alex-cory/use-cursor/blob/master/license.md">
      <img alt="undefined" src="https://img.shields.io/github/license/alex-cory/use-cursor.svg">
    </a> -->
<!--     <a href="https://greenkeeper.io/">
      <img alt="undefined" src="https://badges.greenkeeper.io/alex-cory/use-cursor.svg">
    </a> -->
</p>

<div align="center">
  <sup>
    🐭 React hook for customizing the mouse
  </sup>
  <br/>
  ⚠️This package is currently WIP and not even published to npm⚠️
</div>

<br/>
<br/>


<div align="center">
  <pre>npm i use-cursor</pre>
</div>

<br/>
<br/>

Features
---------

- SSR (server side rendering) support
<!-- - TypeScript support -->
<!-- - 1 dependency ([use-ssr](https://github.com/alex-cory/use-ssr)) -->
- make custom trendy mouses

Examples
--------
- [Basic Usage](https://codesandbox.io/s/usecursor-oey2r)

Usage
-----

<!-- <details><summary><b>⚠️ Examples <sup>click me</sup></b></summary>
  <ul>
    <li><a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/usefetch-in-nextjs-nn9fm'>useFetch + Next.js</a></li>
    <li><a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/embed/km04k9k9x5'>useFetch + create-react-app</a></li>
    <li><a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/useget-with-provider-c78w2'>useGet + < Provider /></a></li>
  </ul>
</details> -->

<details open><summary><b>Basic Usage <code>useCursor</code></b></summary>

```js
import { CursorProvider } from 'use-cursor'

const Mouse = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgb(137,183,44);
  z-index: 2;
  pointer-events: none;
`

const Follower = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  opacity: 0.6;
  pointer-events: none;
  box-sizing: border-box;
  z-index: 3;
  border: 4px solid rgb(137,183,44);
`

function App() {
  const cursor = {
    mouse: {
      isActive: false,
      setActive() {},
      x: useRef(0),
      y: useRef(0),
      ref: useRef(),
      ease: 1,
      isMoving: useRef(true),
      component: Mouse,
    },
    follower: {
      isActive: false,
      setActive() {},
      x: useRef(0),
      y: useRef(0),
      ref: useRef(),
      ease: 0.1,
      isMoving: useRef(true),
      component: Follower,
    }
  }

  const { mouse, follower } = cursor
  const moveFollower = useCallback(() => {
    if (!(follower.ref && follower.ref.current)) return
    if (follower.isMoving.current) {
      const {left, top, width, height} = follower.ref.current.getBoundingClientRect()
      const dX = mouse.x.current - (left + width / 2)
      const dY = mouse.y.current - (top + window.scrollY + height / 2)
      follower.x.current += dX * follower.ease
      follower.y.current += dY * follower.ease
      follower.ref.current.style.transform = `translate3d(${follower.x.current}px, ${follower.y.current}px, 0)`
    }
    requestAnimationFrame(moveFollower)
  }, [follower.ease, follower.isMoving, follower.ref, follower.x, follower.y, mouse.x, mouse.y])
  cursor.follower.move = moveFollower

  return (
    <CursorProvider cursor={cursor}>
      <Logo />
    </CursorProvider>
  )
}

const Logo = () => {
  const cursor = useCursor({
    onCursorEnter(e, { follower }) {
      follower.isMoving.current = false
      const hoveredEl = e.currentTarget
      const { top, left, width, height } = hoveredEl.getBoundingClientRect()
      const increase = 400
      const followerRadius = increase / 2
      const x = left - (followerRadius - width / 2)
      const y = top - (followerRadius - (height / 2) - window.scrollY - 10)
      follower.ref.current.style = `
        width: ${increase}px;
        height: ${increase}px;
        border-color: rgb(137,183,44);
        mix-blend-mode: inherit;
        transition: width .55s, height .55s;
        transform: translate3d(${x}px, ${y}px, 0)
      `
    },
    onCursorLeave(e, { follower }) {
      follower.isMoving.current = true
      follower.ref.current.style = `
        transition: width .55s, height .55s;
        width: 60px;
        height: 60px;
      `
    }
  })

  return (
    <img
      onMouseEnter={cursor.onCursorEnter}
      onMouseLeave={cursor.onCursorLeave}
      src='https://picsum.photos/400'
    />
  )
}

```
</details>

Overview
--------

<details><summary><b>Hooks</b></summary>

| Hook                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `useCursor` | The base hook |
    
</details>

Todos
------
 - [ ] tests
 - [ ] codesandbox examples
  - [example 1 todo](http://www.andreadlabarile.it/works/molino)
  - [example 2 todo](https://phoenix.cool)
  - [example 3 todo](https://codepen.io/tamm/pen/LIFam)
  - [example 4 todo](https://github.com/tholman/cursor-effects)
  - [ideas](https://medium.com/@dailyfire/cursor-trails-3-simple-css-tricks-to-add-to-any-website-part-1-64750798583c)
  - [canvas idea](https://codepen.io/InsideDown/pen/rjPEdM)
  - [canvas 2](https://codepen.io/ninivert/pen/ZpEQBR)
  
 - [ ] ssr testing
 - [ ] typescript support

