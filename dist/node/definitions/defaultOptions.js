'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaults = getDefaults;
exports.extend = extend;
/**
 *
 * @param env
 * @returns {{queryOptions: QueryOptions, scoringOptions: ScoringOptions, filterOptions: FilterOptions, matchOptions: MatchOptions, wrapOptions: WrapOptions}}
 */

function getDefaults(env) {

    var defaultPathSeparator = env.defaultPathSeparator;

    /**
     * @typedef {Object} QueryOptions
     * @property {string} pathSeparator - If candidate are path, indicate path separator used (usually '/' or '\\').
     * @property {RegExp} optCharRegEx - Regex that identify character that does not have to match exactly, for example <whitespace>.
     *
     */

    /**
     * @type {QueryOptions}
     */
    var queryOptions = {
        pathSeparator: defaultPathSeparator,
        optCharRegEx: null
    };

    /**
     * @typedef {Object} ScoringOptions
     * @extends QueryOptions
     *
     * @property {boolean} strictUpperCase - With this on, uppercase must be matched by another uppercase.
     *                                       With this off, same case is preferred but not mandatory.
     * @property {boolean} allowErrors - Should we allow candidates that does not have all characters of query ?
     * @property {boolean} usePathScoring - Should we try to interpret candidates as path
     * @property {boolean} useExtensionBonus - Should we try to interpret extension from query
     *                                         and prefer files that match that extension (needs usePathScoring)
     * @property {Query} preparedQuery - If you have a precomputed query object set it here.
     */

    /**
     * @type {ScoringOptions}
     */
    var scoringOptions = extend(queryOptions, {
        strictUpperCase: false,
        allowErrors: false,
        usePathScoring: true,
        useExtensionBonus: false,
        preparedQuery: null
    });

    /**
     * @typedef {Object} FilterOptions
     * @extends ScoringOptions
     *
     * @property {string|function|null} key - Name of the property that contain string ot be scored
     *                                   or function that input candidate and output string to be scored.
     *
     * @property {number|null} maxResults - Output the top `maxResults` best results at most.
     * @property {bool} outputScore - If true output is an array of {candidate,score} else output is an array of candidates
     *
     */

    /**
     * @type {FilterOptions}
     */
    var filterOptions = extend(scoringOptions, {
        key: null,
        maxResults: null,
        outputScore: false
    });

    /**
     * @typedef {Object} MatchOptions
     * @extends ScoringOptions
     *
     */

    /**
     * @type {MatchOptions}
     */
    var matchOptions = extend(scoringOptions, {});

    /**
     * @typedef {Object} WrapOptions
     * @extends MatchOptions
     *
     * @property {string} tagOpen - string to place before a match default to `<strong class="highlight">`
     * @property {string} tagClose - string to place after a match default to `</strong>`
     * @property {string} tagClass - change the class of the default open tag (tagOpen must be unset)
     *
     */

    /**
     * @type {WrapOptions}
     */
    var wrapOptions = extend(matchOptions, {
        tagOpen: '<strong class="{tagClass}">',
        tagClose: '</strong>',
        tagClass: 'highlight'
    });

    return {
        queryOptions: queryOptions,
        scoringOptions: scoringOptions,
        filterOptions: filterOptions,
        matchOptions: matchOptions,
        wrapOptions: wrapOptions
    };
}

function extend(reference, target) {

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    for (var key in reference) {
        if (hasOwnProperty.call(reference, key) && !hasOwnProperty.call(target, key)) {
            target[key] = reference[key];
        }
    }

    return target;
}

exports.default = {
    getDefaults: getDefaults,
    extend: extend
};