This is the TypeScript framework for working with Leap Motion.

Leap Motion is a motion-control software and hardware company developing the world's most powerful and sensitive 3D motion-control and motion-sensing technology.

[leapmotion.com](http://www.leapmotion.com)

TypeScript is a free and open source programming language developed by Microsoft. TypeScript adds optional types, classes, interfaces and modules to JavaScript. TypeScript supports tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

[typescriptlang.org](http://www.typescriptlang.org)

Quick start
-----------

Clone the repo, `git clone git://github.com/logotype/LeapMotionTS.git`.

Import the library and create an instance of the Controller class. What you'll get from the `LEAPMOTION_FRAME` handler is a `Frame` instance,
with strongly typed properties such as `Hands`, `Pointables`, `Direction`, `Gestures` and more:

Optionally, you can simply call `controller.frame()` e.g. in your main loop, or implement the `Listener` interface for callbacks.

Authors
-------

**Victor Norgren**

+ http://twitter.com/logotype
+ http://github.com/logotype
+ https://logotype.se

Copyright and license
---------------------

Copyright © 2014 logotype

Author: Victor Norgren

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:  The above copyright
notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 
