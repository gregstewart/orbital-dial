# [Orbital Dial](https://github.com/gregstewart/orbital-dial)

Orbital dial is a jQuery based dial/knob, and tested on following browsers Chrome 23, Opera 12.11, Safari 6.0.2, Firefox 17, IE6+

## Quick start

Choose one of the following options:

1. Download the latest stable release from
   [https://github.com/gregstewart/orbital-dial](https://github.com/gregstewart/orbital-dial).
2. Clone the git repo — `git clone
   https://github.com/gregstewart/orbital-dial.git` - and checkout the tagged
   release you'd like to use.

## Usage
1. include the orbital-dial.min.js in your page
2. create a set of containers for the dial background image and then one or more orbiting sliders:
    <div id="OrbitalDial" data-height="288" data-width="288">
        <div id="Slider" data-start-angle="300" data-height="49" data-width="49" data-ratio="0.3333"></div>
        <div id="OuterSlider" data-start-angle="300" data-height="49" data-width="49" data-ratio="0.95"></div>
    </div>

    Each slider represents an element that will orbite around the dial as you interact with it.
3. Invoke the dial:
    <script>
        $(document).ready(function () {
            var orbitalDial = new OrbitalDial({outerSelector: '#OuterSlider',
                                    onMoveCallBack: function() { console.log('moving!'); },
                                    onMoveEndCallBack: function() { console.log('Done moving the dial');}
                                });
        });
    </script>
4. customise the images for the dial by updating the CSS
5. you can configure the the dial, by either attaching attributes to the nodes, or by passing in options when you invoke the dial


## Features

* Pure JavaScript solution
* Works using images and as a result gracefully degrades down to IE6+
* Supports touch interactions as well as mouse events.
* Supports onMove and onMoveEnd callbacks
* 2.4K minified
