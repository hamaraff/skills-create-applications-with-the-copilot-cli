"use strict";

/**
 * calculator library
 * Exports functions for the basic arithmetic operations used by the CLI:
 *  - add(numbersArray) -> addition
 *  - sub(numbersArray) -> subtraction (left-associative, requires >=2 args)
 *  - mul(numbersArray) -> multiplication
 *  - div(numbersArray) -> division (left-associative, requires >=2 args, throws on div-by-zero)
 */

function toNumberArray(arr) {
  if (!Array.isArray(arr)) throw new Error('Expected an array of numbers');
  const nums = arr.map((n) => {
    const v = Number(n);
    if (Number.isNaN(v)) throw new Error(`Invalid number: ${n}`);
    return v;
  });
  if (nums.length === 0) throw new Error('No numeric arguments provided');
  return nums;
}

function add(arr) {
  const nums = toNumberArray(arr);
  return nums.reduce((a, b) => a + b, 0);
}

function sub(arr) {
  const nums = toNumberArray(arr);
  if (nums.length < 2) throw new Error('sub requires at least two numbers');
  return nums.slice(1).reduce((a, b) => a - b, nums[0]);
}

function mul(arr) {
  const nums = toNumberArray(arr);
  return nums.reduce((a, b) => a * b, 1);
}

function div(arr) {
  const nums = toNumberArray(arr);
  if (nums.length < 2) throw new Error('div requires at least two numbers');
  if (nums.slice(1).some((n) => n === 0)) throw new Error('Division by zero');
  return nums.slice(1).reduce((a, b) => a / b, nums[0]);
}

function modulo(a, b) {
  const x = Number(a);
  const y = Number(b);
  if (Number.isNaN(x) || Number.isNaN(y)) throw new Error(`Invalid number: ${a} or ${b}`);
  if (y === 0) throw new Error('Division by zero');
  return x % y;
}

function power(base, exponent) {
  const b = Number(base);
  const e = Number(exponent);
  if (Number.isNaN(b) || Number.isNaN(e)) throw new Error(`Invalid number: ${base} or ${exponent}`);
  return Math.pow(b, e);
}

function squareRoot(n) {
  const v = Number(n);
  if (Number.isNaN(v)) throw new Error(`Invalid number: ${n}`);
  if (v < 0) throw new Error('Square root of negative number');
  return Math.sqrt(v);
}

module.exports = { add, sub, mul, div, modulo, power, squareRoot };
