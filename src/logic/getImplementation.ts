import { TestCasesJson, RuleImplementation } from "../types";

export interface Implementation {
  rules: Record<string, RuleImplementation>;
}

export function getImplementation(testCaseJson: TestCasesJson): Implementation {
  const implementation: Implementation = {
    rules: {},
  };

  testCaseJson.testcases.forEach((testCase) => {
    const {
      testcaseId,
      testcaseTitle,
      url,
      relativePath,
      expected,
      ruleId,
      rulePage,
      ruleAccessibilityRequirements,
    } = testCase;
    const ruleName = testCase.ruleName.replace(/`/g, "");

    implementation.rules[testCase.ruleId] ??= {
      ruleName,
      ruleId,
      rulePage,
      ruleAccessibilityRequirements,
      testCases: [],
    };
    implementation.rules[testCase.ruleId].testCases.push({
      testcaseId,
      testcaseTitle,
      url,
      relativePath,
      expected,
    });
  });
  return implementation;
}
