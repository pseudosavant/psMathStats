/*global ps:true, describe:true, it:true, expect:true, beforeEach:true, window:true*/

var psArrayMethods = [
        "sum",
        "sample",
        "mean",
        "variance",
        "stdDev",
        "max",
        "min",
        "sortNumber",
        "median",
        "percentile",
        "histogram",
        "countByType"
];

var run = function (fn) {
    var start = +new Date(),
        result = fn(),
        duration = +new Date() - start;
    return {
        result: result,
        duration: duration
    };
};


describe("Math Functions", function () {
    it("ps.math.even: Should say that 4 is even, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.even(4);
        });

        expect(response.result).toEqual(true);
        expect(response.duration).toBeLessThan(5);
    });

    it("ps.math.even: Should say that 3 isn't even, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.even(3);
        });

        expect(response.result).toEqual(false);
        expect(response.duration).toBeLessThan(5);
    });
    it("ps.math.odd: Should say that 3 is odd, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.odd(3);
        });

        expect(response.result).toEqual(true);
        expect(response.duration).toBeLessThan(5);
    });

    it("ps.math.odd: Should say that 4 isn't odd, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.odd(4);
        });

        expect(response.result).toEqual(false);
        expect(response.duration).toBeLessThan(5);
    });
    it("ps.math.fact: Factorial of 6 should be 720, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.fact(6);
        });

        expect(response.result).toEqual(720);
        expect(response.duration).toBeLessThan(5);
    });
    it("ps.math.fact: Factorial of 10 should be 3628800, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.fact(10);
        });

        expect(response.result).toEqual(3628800);
        expect(response.duration).toBeLessThan(5);
    });
    it("ps.math.product: product of 1,2,3 should be 6, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.product(1, 2, 3);
        });

        expect(response.result).toEqual(6);
        expect(response.duration).toBeLessThan(5);
    });
    it("ps.math.product: product of 5, 10, 15, 20, 25 should be 375000, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.product(5, 10, 15, 20, 25);
        });

        expect(response.result).toEqual(375000);
        expect(response.duration).toBeLessThan(5);
    });

    it("ps.math.randomBetween, less than 5 ms", function () {
        var response = run(function () {
            return ps.math.randomBetween(99900, 100000);
        });

        expect(response.result).toBeGreaterThan(99900 - Number.MIN_VALUE);
        expect(response.result).toBeLessThan(100000 + Number.MIN_VALUE);
        expect(response.duration).toBeLessThan(5);
    });

    it("ps.math.randomNormal, less than 500 ms", function () {
        var response = run(function () {
            var a = [];
            for (var i = 0; i < 100000; i++) {
                a.push(ps.math.randomNormal());
            }

            return a;
        }),
        a = response.result;

        expect(a.min()).toBeGreaterThan(-8);
        expect(a.min()).toBeLessThan(-3);

        expect(a.max()).toBeGreaterThan(3);
        expect(a.max()).toBeLessThan(8);

        expect(a.mean()).toBeGreaterThan(-0.05);
        expect(a.mean()).toBeLessThan(0.05);

        expect(a.stdDev()).toBeGreaterThan(0.95);
        expect(a.stdDev()).toBeLessThan(1.05);

        expect(response.duration).toBeLessThan(500);
    });
});

describe("Statistics Functions", function () {
    it("ps.stats.normsinv: p=.65 should equal z=.385, less than 5 ms", function () {
        var response = run(function () {
            return +ps.stats.normsinv(0.65).toFixed(3);
        });

        expect(response.result).toEqual(0.385);
        expect(response.duration).toBeLessThan(5);
    });
});

describe("Array Functions", function () {
    var myArray;

    beforeEach(function () {
        myArray = window.myArray = [];
        for (var i = 0; i < 10000; i++) {
            myArray.push(Math.random() * 100000, Math.random() * 100000, Math.random() * 100000, Math.random() * 100000, Math.random() * 100000, Math.random() * 100000, Math.random() * 100000, Math.random() * 100000, Math.random() * 100000, Math.random() * 100000);
        }
    });

    it("Array should be an array with extended methods (stdDev, sum, etc)", function () {
        expect(!!myArray.length).toEqual(true);
        expect(myArray.length).toEqual(100000);
        expect(!!myArray.stdDev).toEqual(true);
        expect(!!myArray.sum).toEqual(true);
    });

    it("Array.sample: should be 337 array values, less than 5ms", function () {
        var sampleSize = 337,
            response = run(function () {
                return myArray.sample(sampleSize).length;
        });
        
        expect(response.result).toEqual(sampleSize);
        expect(response.duration).toBeLessThan(5);
    });

    
    it("Array.stdDev: less than 50ms", function () {
        var response = run(function () {
            return myArray.stdDev();
        });

        expect(response.result).toBeGreaterThan(28700);
        expect(response.result).toBeLessThan(29000);
        expect(response.duration).toBeLessThan(50);
    });

    it("Array.variance: less than 50ms", function () {
        var response = run(function () {
            return myArray.variance();
        });

        expect(response.result).toBeGreaterThan(825000000);
        expect(response.result).toBeLessThan(840000000);
        expect(response.duration).toBeLessThan(50);
    });

    it("Array.variance (1000 samples): less than 5ms", function () {
        var response = run(function () {
            return myArray.variance(10000);
        });

        expect(response.result).toBeGreaterThan(800000000);
        expect(response.result).toBeLessThan(860000000);
        expect(response.duration).toBeLessThan(50);
    });

    it("Array.sum: less than 15ms", function () {
        var response = run(function () {
            return myArray.sum();
        });

        expect(response.result).toBeGreaterThan(4950000000);
        expect(response.result).toBeLessThan(5050000000);
        expect(response.duration).toBeLessThan(15);
    });

    it("Array.mean: less than 10ms", function () {
        var response = run(function () {
            return myArray.mean();
        });

        expect(response.result).toBeGreaterThan(48000);
        expect(response.result).toBeLessThan(52000);
        expect(response.duration).toBeLessThan(10);
    });

    it("Array.max: less than 50ms", function () {
        var response = run(function () {
            return myArray.max();
        });
        var a = [];

        a = [1, 2, 3];
        expect(a.max()).toEqual(3);

        a = [-1, -2, -3];
        expect(a.max()).toEqual(-1);

        expect(response.result).toBeGreaterThan(99990);
        expect(response.result).toBeLessThan(100000);
        expect(response.duration).toBeLessThan(50);
    });

    it("Array.min: less than 25ms", function () {
        var response = run(function () {
            return myArray.min();
        });
        var a = [];

        a = [1, 2, 3];
        expect(a.min()).toEqual(1);
        
        a = [-1, 0, 1];
        expect(a.min()).toEqual(-1);

        expect(response.result).toBeGreaterThan(0);
        expect(response.result).toBeLessThan(10);
        expect(response.duration).toBeLessThan(25);
    });

    it("Array.median: less than 1200ms", function () {
        var response = run(function () {
            return myArray.median();
        });

        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(a.median()).toEqual(5.5);

        expect(response.result).toBeGreaterThan(49500);
        expect(response.result).toBeLessThan(50500);
        expect(response.duration).toBeLessThan(1200);
    });

    it("Array.percentile: less than 1200ms", function () {
        var response = run(function () {
            return myArray.percentile(0.25);
        });

        expect(response.result).toBeGreaterThan(24500);
        expect(response.result).toBeLessThan(25500);
        expect(response.duration).toBeLessThan(1200);
    });

    it("Array.sortNumber: less than 500ms", function () {
        var response = run(function () {
            var a = myArray.sortNumber(),
            result = [
                a[0],
                a[a.length - 1]
            ];

            return result;
        });


        expect(response.result[0]).toBeGreaterThan(0);
        expect(response.result[0]).toBeLessThan(10);
        expect(response.result[1]).toBeGreaterThan(99990);
        expect(response.result[1]).toBeLessThan(100000);
        expect(response.duration).toBeLessThan(500);
    });

    it("Array.histogram: less than 500ms", function () {
        var response = run(function () {
            return myArray.histogram();
        }),
        h = response.result;

        // Check that the object has 100,000 keys
        var keys = 0;
        for (var i in h) {
            if (h.hasOwnProperty(i)) {
                keys += +h[i];
            }
        }

        // Check that the count of object keys adds up to the sum of the array
        var sum = 0;
        for (var x in h) {
            if (h.hasOwnProperty(x)) {
                sum += (+x * +h[x]);
            }
        }

        expect(keys).toEqual(100000);
        expect(Math.floor(sum)).toEqual(Math.floor(myArray.sum())); // Floor the two sums to deal with slight FP rounding issues
        expect(response.duration).toBeLessThan(500);
    });

    it("Array.countByType: less than 225ms", function () {
        var response = run(function () {
            return myArray.countByType();
        });

        expect(response.result.number).toEqual(100000);
        expect(response.duration).toBeLessThan(225);
    });
});

describe("Native Array Tests", function () {
    it("Native Array object should inherit have ps.Array methods", function () {
        ps.Array(true);
        var a = [1, 2, 3];

        for (var i = 0; i < psArrayMethods.length; i++) {
            var method = psArrayMethods[i];

            expect(Array.prototype[method]).toBeDefined();
        }

        expect(a.sum()).toEqual(6);
    });
});
