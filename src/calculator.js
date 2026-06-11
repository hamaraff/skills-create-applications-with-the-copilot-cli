#!/usr/bin/env node
"use strict";

/**
 * CLI Calculator
 * Supported operations:
 *  - add (addition)       -> +
 *  - sub (subtraction)    -> -
 *  - mul (multiplication) -> ×
 *  - div (division)       -> ÷
 *
 * Usage:
 *   node src/calculator.js add 1 2 3
 *   node src/calculator.js sub 10 3 2
 *   node src/calculator.js mul 2 3 4
 *   node src/calculator.js div 100 2 5
 */

const [,, cmd, ...args] = process.argv;

function parseNumbers(arr) {
  const nums = arr.map((s) => {
    const n = Number(s);
    if (Number.isNaN(n)) throw new Error(`Invalid number: ${s}`);
    return n;
  });
  if (nums.length === 0) throw new Error('No numeric arguments provided');
  return nums;
}

function usage() {
  console.error('Usage: calc <add|sub|mul|div> num1 num2 [num3 ...]');
  console.error('Examples:');
  console.error('  calc add 1 2 3');
  console.error('  calc sub 10 3');
  console.error('  calc mul 2 3 4');
  console.error('  calc div 20 2');
  process.exit(2);
}

if (!cmd) usage();

try {
  const op = cmd.toLowerCase();
  const nums = parseNumbers(args);
  let result;

  switch (op) {
    case 'add':
      // addition: sum all arguments
      result = nums.reduce((a, b) => a + b, 0);
      break;
    case 'sub':
      // subtraction: left-associative (num1 - num2 - num3 ...)
      if (nums.length < 2) throw new Error('sub requires at least two numbers');
      result = nums.slice(1).reduce((a, b) => a - b, nums[0]);
      break;
    case 'mul':
      // multiplication: product of all arguments
      result = nums.reduce((a, b) => a * b, 1);
      break;
    case 'div':
      // division: left-associative (num1 / num2 / num3 ...); handle division by zero
      if (nums.length < 2) throw new Error('div requires at least two numbers');
      if (nums.slice(1).some((n) => n === 0)) {
        throw new Error('Division by zero');
      }
      result = nums.slice(1).reduce((a, b) => a / b, nums[0]);
      break;
    case 'help':
    case '--help':
    case '-h':
      usage();
      break;
    default:
      console.error(`Unknown command: ${cmd}`);
      usage();
  }

  // Print numeric result to stdout
  // If result is an integer-like float, print without excessive decimals
  if (Number.isFinite(result) && Number.isInteger(result)) {
    console.log(result);
  } else if (Number.isFinite(result)) {
    console.log(result);
  } else {
    throw new Error('Result is not a finite number');
  }
  process.exit(0);
} catch (err) {
  // Print errors to stderr
  console.error('Error:', err.message);
  process.exit(1);
}
