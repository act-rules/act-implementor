import { defineStore } from 'pinia'
import { TestCase } from '../types';

interface State {
  loaded: boolean
  testCases: TestCase[]
}

type Rule = {
  ruleId: string
  ruleName: string
  rulePage: string
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    loaded: false,
    testCases: ([] as TestCase[])
  }),

  getters: {
    rules(): Rule[] {
      const ids = new Set<string>()
      const rules: Rule[] = []
      this.testCases.forEach(testcase => {
        if (!ids.has(testcase.ruleId)) {
          ids.add(testcase.ruleId);
          rules.push({
            ruleId: testcase.ruleId,
            ruleName: testcase.ruleName,
            rulePage: testcase.rulePage
          })
        }
      })
      return rules;
    }
  },

  actions: {
    async loadTestCases(testCaseUrl: string) {
      const content = await fetch(testCaseUrl);
      const jsonData = await content.json();

      this.loaded = true;
      this.testCases = jsonData.testcases
    }
  }
})
