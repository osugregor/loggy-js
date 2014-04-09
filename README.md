loggy-js
========

A simple JavaScript library for logging.

## Installation
Load the loggy.js file before your JS code.
```
<script type="text/javascript" src="loggy.js"></script>
```

## How to use

Instantiate a new logger like so:

```
var LOGGER = new Loggy.init(Loggy.DEBUG);
```

passing in the log level (DEBUG,INFO,ERROR) to indicate what to print to console

Use the newly created variable to print to console:

```
LOGGER.debug("Message to debug");
```
