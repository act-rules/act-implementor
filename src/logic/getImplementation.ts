import { TestCasesJson, ImplementationReport } from '../types';

export interface Implementation {
  rules: Record<string, RuleImplementation>
}

export interface RuleImplementation {
  ruleName: string
  ruleId: string
  rulePage: string
  testCases: TestCaseReport[]
}

export interface TestCaseReport {
  testcaseId: string
  testcaseTitle: string
  url: string
  relativePath: string
  expected?: string
}

export function getImplementation(
  testCaseJson: TestCasesJson,
  implementationReport: ImplementationReport
): Implementation {
  const implementation: Implementation = {
    rules: {}
  }

  testCaseJson.testcases.forEach(testCase => {
    const {
      testcaseId,
      testcaseTitle,
      url,
      relativePath,
      expected,
      ruleId,
      rulePage
    } = testCase
    const ruleName = testCase.ruleName.replace(/`/g, '')

    implementation.rules[testCase.ruleId] ??= { ruleName, ruleId, rulePage, testCases: [] }
    implementation.rules[testCase.ruleId].testCases.push({
      testcaseId, testcaseTitle, url, relativePath, expected
    })
  })
  return implementation;
}