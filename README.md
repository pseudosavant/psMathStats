# psMathStats
## PseudoSavant Math and Statistics Library
### Version 2.0
by [Paul Ellis](http://pseudosavant.com)

## What does psMathStats do?
It is a library for performing some basic math and statistics
calculations such as the standard deviation of an array of numbers, the
product of a set of numbers, or a pseudo random number generator that
generates normally distributed numbers.

## Array Methods
* `Array.sample(samples)`: Returns a Array with `samples` number of random samples from the source Array. It can be used before other Array methods (e.g. `myHugeArray.sample(20000).stdDev()`) to significantly improve performance while sacrificing some accuracy.
* `Array.sum()`: Sums all values in a Array
* `Array.mean()`: Returns the arithmetic mean of the source Array
* `Array.median()`: Returns the the median value of the Array
* `Array.percentile()`: Returns the value at the given percentile for the Array
* `Array.variance()`: Returns the Variance of the source Array
* `Array.stdDev()`: Returns the Standard Deviation of the source Array
* `Array.max()`: Returns the highest numeric value of a Array
* `Array.min()`: Returns the lowest numeric value of a Array
* `Array.sortNumber(invert)`: Returns the Array sorted ascendingly, or decendingly if `invert = true`
* `Array.histogram()`: Returns an object where the key equals the item and the value equals the count of the times that item occured in the Array
* `Array.countByType()`: Returns an object that shows the total count of each type in a Array

### Note
psMathStats extends the native `Array.prototype`. Be careful if you try to loop over an array using `for (var i in arr)`

## Math Functions
* `ps.math.even(n)`: Returns true if `n` is an even number
* `ps.math.odd(n)`: Returns true if `n` is an odd number
* `ps.math.fact(n)`: Calculates the factorial for any given integer `n`
* `ps.math.product(n, n, n...)`: Returns the product of all of the arguments
* `ps.math.randomBetween(floor, ceiling, digits)`: Generates a random number between two numbers, defaulting to integers (`digits = 0`)
* `ps.math.randomNormal(mean, stdDev)`: Generates normally distributed random numbers for the given mean and stardard deviation. Defaults to `mean = 0`, `stdDev = 1`.

## Stats Functions
* `ps.stats.normsinv(p)`: returns the inverse of the standard normal
cumulative distribution for a given `p` percentile

## License
BSD
