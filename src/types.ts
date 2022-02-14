export interface ImplementationReport {}

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
  ruleAccessibilityRequirements: RequirementsMapping
}

export interface RuleImplementation {
  ruleName: string
  ruleId: string
  rulePage: string
  ruleAccessibilityRequirements: RequirementsMapping
  testCases: TestCaseReport[]
}

export interface TestCaseReport {
  testcaseId: string
  testcaseTitle: string
  url: string
  relativePath: string
  expected?: string
}

export type RequirementsMapping = null | Record<string, AccessibilityRequirement>;

export interface AccessibilityRequirement {
  title?: string
  forConformance: boolean
  failed: string
  passed: string
  inapplicable: string
}

export interface Procedure {
  ruleIds: string[]
  assertions: Record<string, string>
}
