'use strict'

var fs = require('fs')
var path = require('path')

//----------------------
//  Export
//-------------------

module.exports = function (env_file, options) {
    options = options || {}

    if (typeof options.verbose === 'undefined') {
        options.verbose = module.exports.verbose
    }

    if (typeof options.overwrite === 'undefined') {
        options.overwrite = module.exports.overwrite
    }

    if (typeof options.raise === 'undefined') {
        options.raise = module.exports.raise
    }

    module.exports.logger = options.logger || module.exports.logger

    if (typeof env_file !== 'string') {
        if (options.raise) {
            throw new TypeError("Environment file argument is not a valid `String`: " + env_file)
        } else {
            if (options.verbose && module.exports.logger) {
                module.exports.logger.error('[ENV]: ERROR Environment file argument is not a valid `String`:', process.env.ENV_FILE)
            }
            return {}
        }
    }

    try {
        env_file = process.env.ENV_FILE = path.resolve(env_file) || process.env.ENV_FILE
    } catch (err) {
        if (options.raise) {
            throw new TypeError("Environment file path could not be resolved: " + err)
        } else {
            if (options.verbose && module.exports.logger) {
                module.exports.logger.error('[ENV]: ERROR Environment file path could not be resolved:', process.env.ENV_FILE)
            }
            return {}
        }
    }

    module.exports.data = module.exports.data || {}
    module.exports.data[env_file] = {}

    if (options.verbose && module.exports.logger) {
        module.exports.logger.info('[ENV]: Loading environment:', env_file)
    }

    if (fs.existsSync(env_file)) {
        var lines

        try {
            lines = (fs.readFileSync(env_file, 'utf8') || '')
                .split(/\r?\n|\r/)
                .filter(function (line) {
                    return /\s*=\s*/i.test(line)
                })
                .map(function (line) {
                    return line.replace('exports ', '')
                })

        } catch (err) {
            if (options.raise) {
                throw new TypeError("Environment file could not be read: " + err)
            } else {
                if (options.verbose && module.exports.logger) {
                    module.exports.logger.error('[ENV]: ERROR Environment file could not be read:', env_file)
                }
                return {}
            }
        }

        module.exports.lines = module.exports
        module.exports.lines.comments = []
        module.exports.lines.variables = []

        var is_comment

        lines.forEach(function(line) {
            is_comment = /^\s*\#/i.test(line) // ignore comment lines (starting with #).

            if (is_comment) {
                module.exports.lines.comments.push(line)

                if (options.verbose && module.exports.logger) {
                    module.exports.logger.info('[ENV]: Ignored line:', line)
                }

            } else {
                module.exports.lines.variables.push(line)

                var key_value = line.match(/^([^=]+)\s*=\s*(.*)$/)

                var env_key = key_value[1]

                // remove ' and " characters if right side of = is quoted
                var env_value = key_value[2].match(/^(['"]?)([^\n]*)\1$/m)[2]

                // overwrite already defined `process.env.*` values?
                if (!!options.overwrite) {
                    module.exports.data[env_file][env_key] = env_value

                    if (options.verbose && module.exports.logger && module.exports.data[env_file][env_key] !== env_value) {
                        module.exports.logger.info('[ENV]: Overwritten ', module.exports.data[env_file][env_key], ' => ', env_value)
                    }

                } else {
                    module.exports.data[env_file][env_key] = process.env[env_key] || env_value
                }

                process.env[env_key] = module.exports.data[env_file][env_key]

                if (options.verbose && module.exports.logger) {
                    module.exports.logger.info('[ENV]:', module.exports.data[env_file])
                }
            }
        })
    }
    else {
        if (options.raise) {
            throw new TypeError("Environment file doesn't exist: " + env_file)

        } else {
            if (options.verbose && module.exports.logger) {
                module.exports.logger.error('[ENV]: ERROR Environment file path could not be resolved:', env_file)
            }
            return {}
        }
    }

    return module.exports.data[env_file]
}

module.exports.log = false
module.exports.logger = console
module.exports.overwrite = false
module.exports.raise = true
module.exports.data = {}

module.exports.sync = module.exports

// TODO: module.exports.async = module.exports.async
