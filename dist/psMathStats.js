/*
PseudoSavant JavaScript Math and Statistics Library

@version    2.0
@author     Paul Ellis
@url        http://pseudosavant.com
@copyright  Copyright 2013, Paul Ellis
@license    BSD
*/

(function (global) {
    'use strict';
    var undefined = void 0;
    var ps = global.ps = global.ps || {};

    // Array functions. This exends the Array.prototype.
    var array = Array.prototype;

    /**
    * Sums all values in a Array
    *
    * @return {number} The sum of all of the values in the Array
    * @this {array} the Array the method is being called on
    */
    array.sum = function () {
        var s = 0,
            a = this,
            l = a.length;
        for (var i = 0; i < l; i++) {
            s += +a[i];
        }
        return s;
    };


    /**
    * Returns a Array of random samples from the source Array
    *
    * @param {number} samples The number of samples to return from the source Array
    * @return {array} The sum of all of the values in the Array
    * @this {array} the Array the method is being called on
    */
    array.sample = function (samples) {
        var s = samples,
            a = this,
            l = a.length,
            doSampling = (typeof s === 'number' && s < l),
            sampledArray = [],
            i;

        if (doSampling) {
            var count = Math.floor(s / 10) + 1; // Do array pushes in batches of 10 for speed, slice the tail off at the end
            var randomIndex = function () {
                return a[Math.floor(Math.random() * l)];
            };

            for (i = 0; i < count; i++) {
                sampledArray.push(
                    randomIndex(), randomIndex(),
                    randomIndex(), randomIndex(),
                    randomIndex(), randomIndex(),
                    randomIndex(), randomIndex(),
                    randomIndex(), randomIndex()
                );
            }

            return sampledArray.slice(0, s); // Slice the tail off the sampled array, to return the correct number of samples
        } else {
            return this; // Return the source array if not sampled
        }
    };


    /**
    * Returns the arithmetic mean of the source Array
    *
    * @return {number} The arithmetic mean of all of the values in the Array
    * @this {array} the Array the method is being called on
    */
    array.mean = function () {
        var a = this;
        return a.sum() / a.length;
    };

    /**
    * Returns the Variance of the source Array
    *
    * @this {array} the Array the method is being called on
    * @return {number} The statistical variance of all of the values in the Array
    */
    array.variance = function () {
        var a = this,
            l = a.length,
            m = a.mean(),
            sumOfSquares = 0,
            i = 0;

        for (i = 0; i < l; i++) {
            sumOfSquares += Math.pow(a[i] - m, 2);
        }

        return sumOfSquares / l;
    };

    /**
    * Returns the Standard Deviation of the source Array
    *
    * @return {number} The standard deviation of all of the values in the Array
    * @this {array} the Array the method is being called on
    */
    array.stdDev = function () {
        return Math.sqrt(this.variance());
    };

    /**
    * Returns the largest or smallest value in an Array. Only used
    * internally by other methods (Array.min and Array.max)
    *
    * @param {string} type The type of value to find, the 'max' value or the 'min' value
    * @param {array} arr The array to find the min or max of
    * @return {number} The largest or smallest value in the Array
    * @this {function} anonymous function module scope
    * @see array.min
    * @see array.max
    */
    var minMax = function (type) {
        var a = this,
            l = a.length,
            t = (type === 'max' ? 'max' : 'min'),
            fn = Math[t], // Specify if this should get the min or the max
            i = 0;

        // Slice array into batches and find min/max of each batch, then find min/max of those values
        var batchSize = 100000, // Chrome has a limit of ~100k args for .apply
            batch = [],
            passes = Math.floor(l / batchSize) + 1;

        for (i = 0; i < passes; i++) {
            var start = i * batchSize,
                end = start + batchSize;

            var value = fn.apply(
                    Math, a.slice(start, end)
                );
            batch.push(value);
        }

        return fn.apply(Math, batch);
    };

    /**
    * Returns the highest numeric value of a Array
    *
    * @return {number} The highest/'max' value in the Array
    * @this {array} the Array the method is being called on
    */
    array.max = function () {
        return minMax.call(this, 'max');
    };

    /**
    * Returns the lowest numeric value of a Array
    *
    * @return {number} The highest/'min' value in the Array
    * @this {array} the Array the method is being called on
    */
    array.min = function () {
        return minMax.call(this, 'min');
    };

    /**
    * Returns the Array sorted ascendingly, or decendingly if sortNumber(true).
    *
    * @param {boolean} invert Determines whether the array should be sorted
    *   ascending (default, false) or decending (true)
    * @return {array} The Array sorted in the desired direction
    * @this {array} the Array the method is being called on
    */
    array.sortNumber = function (invert) {
        if (!!invert) { // Decending
            return this.sort(function (a, b) { return a - b; }).reverse(); // Using reverse() is faster than b - a, for some reason.
        } else { // Ascending, default
            return this.sort(function (a, b) { return a - b; });
        }
    };

    /**
    * Returns the the median of the Array.
    *
    * @return {number} The median of the Array
    * @this {array} the Array the method is being called on
    */
    array.median = function () {
        var a = this,
            l = a.length,
            isOdd = (l % 2 === 1),
            middleIndex = Math.floor((l - 1) / 2),
            sorted = a.sortNumber(),
            median;

        if (isOdd) {
            median = sorted[middleIndex];
        } else {
            median = (sorted[middleIndex] + sorted[middleIndex + 1]) / 2;
        }
        return median;
    };

    /**
    * Returns the value at the given percentile for the sorted Array
    *
    * @param {number} percent The percentile being requested.
    * @return {number} the value at the given percentile for the Array
    * @this {array} the Array the method is being called on
    */
    array.percentile = function (percent) {
        var a = this,
            index = Math.floor(percent * a.length);
        return a.sortNumber()[index];
    };

    /**
    * Returns an object where the key equals the item and the value equals the
    * count of the times that item occured in the array
    *
    * @return {object} An object where the key is the item and the value is the
    *   count of times it occured in the Array
    * @this {array} the Array the method is being called on
    */
    array.histogram = function () {
        var a = this,
            l = a.length,
            o = {},
            i = 0,
            val;

        for (i = 0; i < l; i++) {
            val = a[i];
            if (typeof o[val] === 'number') {
                o[val]++;
            } else {
                o[val] = 1;
            }
        }

        return o;
    };

    /**
    * Returns an object that shows the total count of each type in a Array
    *
    * @return {object} An object where the key:value represents type:count in the Array
    * @this {array} the Array the method is being called on
    */
    array.countByType = function () {
        var a = this,
            l = a.length,
            o = {},
            i = 0,
            realTypeOf = function (obj) {
                return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
            };

        for (i = 0; i < l; i++) {
            var type = realTypeOf(a[i]);
            if (o[type] !== undefined) {
                o[type]++;
            } else {
                o[type] = 1;
            }
        }

        return o;
    };

    // Math functions
    var math = ps.math = {}; // Initialize local module variable, and namespace

    // Returns true/false if n is an even number
    math.even = function (n) {
        return (typeof n === 'number' && n % 2 === 0);
    };

    // Returns true/false if n is an odd number
    math.odd = function (n) {
        return (typeof n === 'number' && n % 2 === 1);
    };

    // Calculates the factorial for any given integer
    math.fact = function (n) {
        var f = 1;
        if (typeof n !== 'number' || (n % 1) !== 0) {
            f = null;
        }
        else if (n > 1) {
            for (var i = 2; i <= n; i++) {
                f = f * i;
            }
        }
        return f;
    };

    // Returns the product of all of the arguments
    math.product = function () {
        var a = arguments,
            l = a.length,
            p = 1;
        for (var i = 0; i < l; i++) {
            p = p * a[i];
        }
        return p;
    };

    // Generates a random number between two numbers, defaulting to integers
    math.randomBetween = function (low, high, digits) {
        var d = (typeof digits === 'number' && digits > 0 ? digits : 0),
        floor = +low, // + is used to coerce type to number
        range = +(high - low), // + is used to coerce type to number
        random = Math.random() * range + floor;

        return random.toFixed(d);
    };

    // Generates normally distributed random numbers for the given mean and
    // stardard deviation. Defaults to mean = 0, stdDev = 1.
    math.randomNormal = function (mean, stdDev) {
        var u, v, s;
        mean = mean || 0;
        stdDev = stdDev || 1;

        do {
            u = Math.random() * 2 - 1;
            v = Math.random() * 2 - 1;
            s = u * u + v * v;
        } while (s >= 1 || s === 0);
        return mean + stdDev * u * Math.sqrt(-2 * Math.log(s) / s);
    };


    // Stats functions
    var stats = ps.stats = {}; // Initialize local module variable, and namespace

    // Lower tail quantile for standard normal distribution function.
    // Written by Alankar Misra (alankar@digitalsutras.com), algorithm by Peter John Acklam (pjacklam@online.no, http://home.online.no/~pjacklam)
    stats.normsinv = function (p) {
        // Coefficients in rational approximations
        var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00],
            b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01],
            c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00],
            d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

        // Define break-points.
        var plow = 0.02425,
            phigh = 1 - plow;

        var q, z, r,
            s = Math.sqrt, l = Math.log;

        // Rational approximation for lower region:
        if (p < plow) {
            q = s(-2 * l(p));
            z = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
        }
        else if (phigh < p) { // Rational approximation for upper region:
            q = s(-2 * l(1 - p));
            z = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
        }
        else { // Rational approximation for central region:
            q = p - 0.5;
            r = q * q;
            z = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
        }
        return +z;
    };

})(this);