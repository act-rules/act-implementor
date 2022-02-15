import { defineStore } from 'pinia'
import { assert } from '../logic/assert'
import { getImplementation } from '../logic/getImplementation';
import { TestCase, TestCasesJson, RuleImplementation, Procedure } from '../types';
import { createReport, loadReport } from '../logic/earl'

interface State {
  loaded?: boolean
  testCases?: TestCase[]
  rules?: Record<string, RuleImplementation>
  procedures: Record<string, Procedure>
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    loaded: false,
    testCases: undefined,
    rules: undefined,
    procedures: {}
  }),

  getters: {
    getRule() {
      return (ruleId: string): RuleImplementation => {
        assert(this.rules?.[ruleId], `Unknown rule ID ${ruleId}`)
        return this.rules[ruleId];
      }
    },

    findProcedureName() {
      return (ruleId: string): string => {
        const entries = Object.entries(this.procedures || {});
        const entry = entries.find(([, { ruleIds }]) => ruleIds.includes(ruleId));
        return (entry ? entry[0] : `${ruleId}-test`);
      }
    },

    getRuleStats() {
      return (
        ruleId: string,
        procedureName?: string
      ): { total: number, complete: number, procedureName: string } => {
        procedureName ??= this.findProcedureName(ruleId);
        let complete = 0;
        const { testCases } = this.getRule(ruleId);
        testCases.forEach(({ url }) => {
          if (procedureName && this.getOutcome(procedureName, url) !== 'untested') {
            complete++;
          }
        });
        return { total: testCases.length, complete, procedureName }
      }
    },

    getOutcome() {
      return (procedureName: string, testCaseUrl: string): string => {
        return this.procedures[procedureName]?.assertions[testCaseUrl] ?? 'untested';
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
    },

    resetReport() {
      this.procedures = {}
    },

    loadReportText(reportText: string) {
      const procedures = loadReport(reportText);
      this.procedures = procedures;
    },

    renameProcedure(currentName: string, newName: string) {
      if (!this.procedures[currentName]) {
        return; // No procedure, do nothing
      }
      this.procedures[newName] = {
        ...this.procedures[newName] || {},
        ...this.procedures[currentName]
      }
      delete this.procedures[currentName];
    },

    setOutcome(procedureName: string, testCaseUrl: string, outcome: string) {
      this.procedures[procedureName] ??= { ruleIds: [], assertions: {} }
      const { assertions, ruleIds } = this.procedures[procedureName]
      const testCase = this.testCases?.find(testCase => {
        testCase.url
        return testCase.url === testCaseUrl
      })
      assertions[testCaseUrl] = outcome;
      if (testCase?.ruleId && !ruleIds.includes(testCase.ruleId)) {
        ruleIds.push(testCase.ruleId)
      }
    },

    getEarlReport(): string {
      return createReport(this.procedures);
    }
  }
});
