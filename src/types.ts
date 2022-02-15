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

export interface EarlReport {
  '@context': string
  '@graph': EarlAssertion[]
}

export interface EarlAssertion {
  '@type': 'Assertion'
  subject: EarlTestSubject
  test: EarlTestCase
  result: EarlTestResult
};

export interface EarlTestSubject {
  '@type': 'TestSubject'
  source: string
}

export interface EarlTestCase {
  "@type": "TestCase"
  title: string
}

export interface EarlTestResult {
  "@type": "TestResult"
  outcome: EarlOutcome
}

export type Outcome = 'passed' | 'failed' | 'cannotTell' | 'untested' | 'inapplicable';

export type EarlOutcome = `earl:${Outcome}`;
