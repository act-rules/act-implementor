export interface TestCasesJson {
  name: string
  website: string
  license: string
  description: string
  count: number
  testcases: TestCase[]
}

export interface TestCase {
  testcaseId: string
  testcaseTitle: string
  url: string
  relativePath: string
  expected: string
  ruleId: string
  ruleName: string
  rulePage: string
  ruleAccessibilityRequirements: Requirement
}

export type Requirement = null;
