/* eslint @typescript-eslint/no-explicit-any: 0 */
import {
  EarlReport,
  EarlAssertion,
  EarlTestSubject,
  EarlTestCase,
  EarlTestResult,
  Outcome,
} from "../types";

const outcomes = [
  "passed",
  "failed",
  "cannotTell",
  "untested",
  "inapplicable",
] as const;

export function assert(assertion: any, msg: string): asserts assertion {
  if (!assertion) {
    throw new Error(msg);
  }
}

export function validImport(
  report: any,
  context: string
): asserts report is EarlReport {
  assert(
    typeof report === "object",
    `Expected EARL report to be an object, received ${report}`
  );
  assert(
    report["@context"] === context,
    `Expected @context to be ${context}, received ${report["@context"]}`
  );
  assert(
    Array.isArray(report["@graph"]),
    `Expected @graph to be an array, received ${report["@graph"]}`
  );

  report["@graph"].forEach(validEarlAssertion);
}

export function validEarlAssertion(
  assertion: any
): asserts assertion is EarlAssertion {
  assert(
    typeof assertion === "object",
    `Expected EARL report to be an object, received ${assertion}`
  );
  assert(
    assertion["@type"] === "Assertion",
    `Expected @type to be Assertion, received ${assertion["@type"]}`
  );
  validTestSubject(assertion.subject);
  validTestCase(assertion.test);
  validResult(assertion.result);
}

export function validTestSubject(
  subject: any
): asserts subject is EarlTestSubject {
  assert(
    typeof subject === "object",
    `Expected subject to be an object, received ${subject}`
  );
  assert(
    subject["@type"] === "TestSubject",
    `Expected @type to be TestSubject, received ${subject["@type"]}`
  );
  assert(
    typeof subject.source === "string",
    `Expected .source to be a string, received ${subject.source}`
  );
}

export function validTestCase(testCase: any): asserts testCase is EarlTestCase {
  assert(
    typeof testCase === "object",
    `Expected testCase to be an object, received ${testCase}`
  );
  assert(
    testCase["@type"] === "TestCase",
    `Expected @type to be TestCase, received ${testCase["@type"]}`
  );
  assert(
    typeof testCase.title === "string",
    `Expected .title to be a string, received ${testCase.title}`
  );
}

export function validResult(
  testResult: any
): asserts testResult is EarlTestResult {
  assert(
    typeof testResult === "object",
    `Expected testResult to be an object, received ${testResult}`
  );
  assert(
    testResult["@type"] === "TestResult",
    `Expected @type to be TestResult, received ${testResult["@type"]}`
  );
  assert(
    typeof testResult.outcome === "string",
    `Expected .outcome to be a string, received ${testResult.outcome}`
  );
  assert(
    outcomes.some((outcome) => testResult.outcome === `earl:${outcome}`),
    `Expect outcome to be a valid EARL outcome, received ${testResult.outcome}`
  );
}

export function validOutcome(outcome: any): asserts outcome is Outcome {
  assert(
    outcomes.includes(outcome),
    `Expect outcome to be an outcome, received ${outcome}`
  );
}
