Node.js: fs-extra
=================

[![build status](https://secure.travis-ci.org/jprichardson/node-fs-extra.svg)](http://travis-ci.org/jprichardson/node-fs-extra)
[![downloads per month](http://img.shields.io/npm/dm/fs-extra.svg)](https://www.npmjs.org/package/fs-extra)

This module adds a few extra file system methods that aren't included in the native `fs` module. It is a drop in replacement for `fs`.



Why?
----

I got tired of including `mkdirp`, `rimraf`, and `cp -r` in most of my projects. 




Installation
------------

    npm install --save fs-extra



Usage
-----

`fs-extra` is a drop in replacement for native `fs`. All methods in `fs` are unmodified and attached to `fs-extra`.

You don't ever need to include the original `fs` module again:

```javascript
var fs = require('fs') //this is no longer necessary
```

you can now do this:

```javascript
var fs = require('fs-extra'); //var fs = require('fs')
```

or if you prefer to make it clear that you're using `fs-extra` and not `fs`, you may want 
to do this:

```javascript
//var fs = require('fs')
var fse = require('fs-extra')
```

you can also keep both, but it's redundant:

```javascript
var fs = require('fs')
var fse = require('fs-extra')
```



Roadmap
--------

This contains items that I'm considering doing. I'd love community feedback.

* File system walker. I really like this one: https://github.com/daaku/nodejs-walker ... this might be adding too much. Thoughts?
* File/directory tree watcher. There are quite a few. ... this also might be adding too much. I like this one: https://github.com/paulmillr/chokidar, thoughts?




Naming
------

I put a lot of thought into the naming of these functions. Inspired by @coolaj86's request. So he deserves much of the credit for raising the issue. See discussion(s) here:

* https://github.com/jprichardson/node-fs-extra/issues/2
* https://github.com/flatiron/utile/issues/11
* https://github.com/ryanmcgrath/wrench-js/issues/29
* https://github.com/substack/node-mkdirp/issues/17

First, I believe that in as many cases as possible, the [Node.js naming schemes](http://nodejs.org/api/fs.html) should be chosen. However, there are problems with the Node.js own naming schemes.

For example, `fs.readFile()` and `fs.readdir()`: the **F** is capitalized in *File* and the **d** is not capitalized in *dir*. Perhaps a bit pedantic, but they should still be consistent. Also, Node.js has chosen a lot of POSIX naming schemes, which I believe is great. See: `fs.mkdir()`, `fs.rmdir()`, `fs.chown()`, etc.

We have a dilemma though. How do you consistently name methods that perform the following POSIX commands: `cp`, `cp -r`, `mkdir -p`, and `rm -rf`?

My perspective: when in doubt, err on the side of simplicity. A directory is just a hierarchical grouping of directories and files. Consider that for a moment. So when you want to copy it or remove it, in most cases you'll want to copy or remove all of its contents. When you want to create a directory, if the directory that it's suppose to be contained in does not exist, then in most cases you'll want to create that too. 

So, if you want to remove a file or a directory regardless of whether it has contents, just call `fs.remove(path)` or its alias `fs.delete(path)`. If you want to copy a file or a directory whether it has contents, just call `fs.copy(source, destination)`. If you want to create a directory regardless of whether its parent directories exist, just call `fs.mkdirs(path)` or `fs.mkdirp(path)`. 


Credit
------

`fs-extra` wouldn't be possible without using the modules from the following authors:

- [Isaac Shlueter](https://github.com/isaacs)
- [Charlie McConnel](https://github.com/avianflu)
- [James Halliday](https://github.com/substack)
- [Andrew Kelley](https://github.com/andrewrk)


Contributions
-------------

If you want to contribute, please add a test. Also, don't change the version in `package.json`.


### Contributors

- [*] [JP Richardson](https://github.com/jprichardson)
- [*] [Mike McNeil](https://github.com/mikermcneil)
- [*] [Ian Crowther](https://github.com/iancrowther)
- [*] [Stephen Mathieson](https://github.com/stephenmathieson)
- [*] [Srirangan](https://github.com/Srirangan)
- [*] [Uli Köhler](https://github.com/ulikoehler)
- [1] [Jim Higson](https://github.com/jimhigson)
- [1] [PatrickJS](https://github.com/gdi2290)
- [1] [Michael Tiller](https://github.com/xogeny)
- `<your name here>`




License
-------


Licensed under MIT

Copyright (c) 2011-2014 JP Richardson

[1]: http://nodejs.org/docs/latest/api/fs.html 


[jsonfile]: https://github.com/jprichardson/node-jsonfile