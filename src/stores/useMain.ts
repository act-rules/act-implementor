import { defineStore } from 'pinia'
import { getImplementation, RuleImplementation } from '../logic/getImplementation';
import { TestCase, TestCasesJson } from '../types';

interface State {
  loaded?: boolean
  testCases?: TestCase[]
  rules?: Record<string, RuleImplementation>
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    loaded: false,
    testCases: undefined,
    rules: undefined
  }),

  getters: {
    getRule() {
      return (ruleId: string): RuleImplementation | undefined => {
        return this.rules && this.rules[ruleId];
      }
    }
  },

  actions: {
    async loadTestCases(testCaseUrl: string) {
      const content = await fetch(testCaseUrl);
      const jsonData = await content.json() as TestCasesJson;
      const { rules } = getImplementation(jsonData, {});
      // @ts-ignore // Vue being annoying
      this.rules = rules;
      this.loaded = true;
      this.testCases = jsonData.testcases;
    }
  }
});
