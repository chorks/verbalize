/**
 * verbalize <https://github.com/jonschlinkert/verbalize>
 * A lightweight logging library.
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var colors = require('chalk');



/**
 * General log
 *
 * @api public
 * @return {string}
 */

var log = function () {
  var args = Array.prototype.map.call(arguments, function (arg) {
    return colors.stripColor(arg);
  });
  args[0] = colors.bold(args[0]);
  return console.log.apply(this, args);
};


/**
 * Runner, customize with the name of your lib.
 *
 * @api public
 * @return {String}
 */

log.runner = '';


/**
 * Expose verbose logging.
 */

log.mode = {};
log.mode.verbose = false;
log.verbose = {};


/**
 * Get the current time using `.toLocaleTimeString()`.
 *
 * @api private
 * @return {String}
 */

var time = function() {
  var time = new Date().toLocaleTimeString();
  return colors.bgBlack.white(time) + ' ';
};


/**
 * Base formatting for special logging.
 *
 * @api private
 * @return {String}
 */

var format = function(color, text) {
  return colors[color]('  ' + log.runner + ' [' + text + '] ·');
};


/**
 * Timestamp
 *
 * @api public
 * @return {string}
 */

log.timestamp = function () {
  var args = arguments;
  args[0] = verb.utils.time() + colors.gray(args[0]);
  return console.log.apply(this, args);
};


/**
 * Testing some specialized logging formats.
 */

log.subhead = function () {
  var args = arguments;
  args[0] = format('bold', args[0]);
  return console.log.apply(this, args);
};

log.setup = function () {
  var args = arguments;
  args[0] = format('yellow', args[0]);
  return console.log.apply(this, args);
};

log.register = function () {
  var args = arguments;
  args[0] = format('green', args[0]);
  return console.log.apply(this, args);
};

log.run = function () {
  var args = arguments;
  args[0] = format('gray', args[0]);
  return console.log.apply(this, args);
};


/**
 * Write
 *
 * @api public
 * @return {string}
 */

log.write = function () {
  return console.log.apply(this, arguments);
};

log.writeln = function () {
  var args = arguments;
  return console.log.apply('\n' + this, args);
};


/**
 * Bold
 *
 * @api public
 * @return {string}
 */

log.bold = function () {
  var args = arguments;
  args[0] = colors.bold(args[0]);
  return console.log.apply(this, args);
};

/**
 * Info
 *
 * @api public
 * @return {string}
 */

log.info = function () {
  var args = arguments;
  args[0] = colors.cyan(args[0]);
  return console.log.apply(this, args);
};

/**
 * Success
 *
 * @api public
 * @return {string}
 */

log.success = function () {
  var args = arguments;
  args[0] = colors.green(args[0]);
  return console.log.apply(this, args);
};


/**
 * Done.
 *
 * @api public
 * @return {string}
 */

log.done = function () {
  var args = arguments;
  args[0] = (colors.green('  ' + verb.runner.name + ' [' + args[0] + ']'));
  return console.log.apply(this, args);
};


/**
 * Warn
 *
 * @api public
 * @return {string}
 */

log.warn = function () {
  var args = arguments;
  args[0] = colors.yellow(args[0]);
  return console.warn.apply(this, args);
};


/**
 * Error
 *
 * @api public
 * @return {string}
 */

log.error = function () {
  var args = arguments;
  args[0] = colors.red(args[0]);
  return console.error.apply(this, args);
};


/**
 * Fatal
 *
 * @api public
 * @return {string}
 */

log.fatal = function () {
  var args = arguments;
  args[0] = (colors.red('  ' + log.runner + ' [FAIL]:') + colors.gray(' · ') + args[0]);
  console.log();
  console.log.apply(this, args);
  process.exit(1);
};


/**
 * Expose all properties on the `log` object
 * to `verbose` mode.
 */

Object.keys(log).filter(function(key) {
  return typeof log[key] === 'function';
}).forEach(function(key) {
  log.verbose[key] = function() {
    if(log.mode.verbose !== false) {
      log[key].apply(log, arguments);
      return log.verbose;
    } else {
      return;
    }
  };
});

module.exports = log;