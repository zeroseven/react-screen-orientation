react-screen-orientation
========================

Installation
------------

`npm insall react-screen-orientation --save`

Usage
-----

Webpack with `sass-loader` and `babel-loader` required before proper build script exists.

```scss
@import "~react-screen-orientation/src/index";
```

```javascript
import React, {Component} from 'react'

import DeviceOrientation, { Orientation } from 'babel?presets[]=react,presets[]=es2015!react-screen-orientation/src/index'

class Example extends Component {

  render () {
    return (
      <DeviceOrientation lockOrientation={'landscape'}>
        <Orientation type='landscape'>
          <div>
            <p>Only visible in landscape</p>
          </div>
        </Orientation>
        <Orientation type='portrait'>
          <div>
            <p>Please rotate your device</p>
          </div>
        </Orientation>
      </DeviceOrientation>
    )
  }
}
```

Documentation
-------------

*TODO*
