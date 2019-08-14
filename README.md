react-screen-orientation
========================

Installation
------------

`npm install react-screen-orientation --save`

Usage
-----

Also see [the example](example).

```scss
@import "~react-screen-orientation/src/index";
```

```javascript
import React, {Component} from 'react'

import DeviceOrientation, { Orientation } from 'react-screen-orientation'

class Example extends Component {

  render () {
    return (
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
  }
}
```

Documentation
-------------

### DeviceOrientation

#### `children` &mdash; `Orientation`

**Required**. You MUST supply children of type `Orientation`. Each child will only be visible if it's `orientation` prop matches the current screen orientation.

#### `className` &mdash; `String` (`''`)

Passes CSS classes to the underlying `div`.

#### `lockOrientation` &mdash; `String` or `Array` (`undefined`)

Try to lock the device using either [The Screen Orientation API][screen-orientation] or [`screen.lockOrientation`][lockOrientation].

Valid values are: `portrait-primary`, `portrait-secondary`, `landscape-primary`, `landscape-secondary`, `portrait`, `landscape` and `default`. Multiple values are allowed.

#### `onLockOrientation` &mdash; `function (success)` (`undefined`)

Callback which will be called after trying to lock screen orientation using `lockOrientation`.

#### `onOrientationChange` &mdash; `function (orientation, type, angle)` (`undefined`)

Will be called in `componentWillMount` and when screen orientation changes are detected. Orientation changes are detected using [The Screen Orientation API][screen-orientation] or [`window.onorientationchange`][orientationchange]

`window.screen.orientation.type` is split into `orientation` and `type` parameters.

Parameters:
 * `orientation` &mdash; `portrait` or `landscape`
 * `type` &mdash; `primary` or `secondary`
 * `angle` &mdash; `0`, `90`, `180` or `270`

### Orientation

#### `alwaysRender` &mdash; `boolean` (`true`)

Set this to `false` to not render the component into the DOM if `orientation` does not match the current screen orientation. This can be helpful if you need your component to re-render when screen orientation changes.

#### `children`

Any children will be passed to the DOM.

#### `className` &mdash; `String` (`''`)

Passes CSS classes to the underlying `div`.

#### `orientation` &mdash; `String` (`undefined`)

**Required** Supply either `portrait` or `landscape` to indicate when the component should be visible.



[lockOrientation]: https://developer.mozilla.org/en-US/docs/Web/API/screen/lockOrientation
[screen-orientation]: https://www.w3.org/TR/screen-orientation/
[orientationchange]: https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange
