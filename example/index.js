import React from 'react'
import { render } from 'react-dom'

import DeviceOrientation, { Orientation } from 'react-screen-orientation'

const Example = () => (
  <DeviceOrientation lockOrientation={'landscape'}>
    {/* Will only be in DOM in landscape */}
    <Orientation orientation='landscape' alwaysRender={false}>
      <div>
        <p>Only visible in landscape</p>
      </div>
    </Orientation>
    {/* Will stay in DOM, but is only visible in portrait */}
    <Orientation orientation='portrait'>
      <div>
        <p>Please rotate your device</p>
      </div>
    </Orientation>
  </DeviceOrientation>
)

render(<Example />, document.querySelector('main'))
