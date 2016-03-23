react-screen-orientation
========================

Installation
------------

`npm insall react-screen-orientation --save`

Usage
-----

```javascript
import React, {Component} from 'react'

import DeviceOrientation, { Orientation } from 'react-screen-orientation'

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
