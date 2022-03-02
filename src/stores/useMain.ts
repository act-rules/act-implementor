import { defineStore } from "pinia";
import { assert } from "../logic/assert";
import { getImplementation } from "../logic/getImplementation";
import {
  TestCase,
  TestCasesJson,
  RuleImplementation,
  Procedure,
  Implementation,
} from "../types";
import { createReport, loadReport } from "../logic/earl";

interface State {
  loaded?: boolean;
  testCases?: TestCase[];
  rules?: Record<string, RuleImplementation>;
  procedures: Record<string, Procedure>;
  implementation: Implementation;
  unsaved: boolean;
}

export const useMainStore = defineStore("main", {
  state: (): State => ({
    loaded: false,
    testCases: undefined,
    rules: undefined,
    unsaved: false,
    procedures: {},
    implementation: {},
  }),

  getters: {
    rulesOutcome(): Record<string, string[]> {
      const ruleIds = Object.keys(this.rules || {});
      const complete: string[] = [];
      const incomplete: string[] = [];
      const untested: string[] = [];
      ruleIds.forEach((ruleId) => {
        const stats = this.getRuleStats(ruleId);
        if (stats.complete === 0) {
          untested.push(ruleId);
        } else if (stats.complete === stats.total) {
          complete.push(ruleId);
        } else {
          incomplete.push(ruleId);
        }
      });
      return { complete, incomplete, untested };
    },

    getRule() {
      return (ruleId: string): RuleImplementation => {
        assert(this.rules?.[ruleId], `Unknown rule ID ${ruleId}`);
        return this.rules[ruleId];
      };
    },

    findProcedureName() {
      return (ruleId: string): string => {
        const entries = Object.entries(this.procedures || {});
        const entry = entries.find(([, { ruleIds }]) =>
          ruleIds.includes(ruleId)
        );
        return entry ? entry[0] : `${ruleId}-test`;
      };
    },

    getRuleStats() {
      return (
        ruleId: string,
        procedureName?: string
      ): { total: number; complete: number; procedureName: string } => {
        procedureName ??= this.findProcedureName(ruleId);
        let complete = 0;
        const { testCases } = this.getRule(ruleId);
        testCases.forEach(({ url }) => {
          if (
            procedureName &&
            this.getOutcome(procedureName, url) !== "untested"
          ) {
            complete++;
          }
        });
        return { total: testCases.length, complete, procedureName };
      };
    },

    getOutcome() {
      return (procedureName: string, testCaseUrl: string): string => {
        return (
          this.procedures[procedureName]?.assertions[testCaseUrl] ?? "untested"
        );
      };
    },

    reportFileName() {
      let safeName = `act-report`;
      const { projectName } = this.implementation;
      if (projectName) {
        safeName = projectName
          .toLowerCase()
          .replace(/[\s]+/g, "-")
          .replace(/[^a-z0-9-_]/gi, "");
      }
      return `${safeName}.json`;
    },
  },

  actions: {
    setUnsaved(unsaved = true) {
      this.unsaved = unsaved;
      // Register the event listener
      if (unsaved && !window.onbeforeunload) {
        window.onbeforeunload = () => {
          if (this.unsaved) {
            return `There may be unsaved changes. Are you sure you want to exit this page?`;
          }
        };
      }
    },

    async loadTestCases(testCaseUrl: string) {
      const content = await fetch(testCaseUrl);
      const jsonData = (await content.json()) as TestCasesJson;
      const { rules } = getImplementation(jsonData);
      this.rules = rules;
      this.loaded = true;
      this.testCases = jsonData.testcases;
    },

    resetReport() {
      this.procedures = {};
      this.implementation = {};
    },

    loadReportText(reportText: string) {
      const { procedures, implementation } = loadReport(reportText);
      this.implementation = implementation;
      this.procedures = procedures;
    },

    renameProcedure(currentName: string, newName: string) {
      if (!this.procedures[currentName]) {
        return; // No procedure, do nothing
      }
      this.procedures[newName] = {
        ...(this.procedures[newName] || {}),
        ...this.procedures[currentName],
      };
      delete this.procedures[currentName];
    },

    setOutcome(procedureName: string, testCaseUrl: string, outcome: string) {
      this.procedures[procedureName] ??= { ruleIds: [], assertions: {} };
      const { assertions, ruleIds } = this.procedures[procedureName];
      const testCase = this.testCases?.find((testCase) => {
        testCase.url;
        return testCase.url === testCaseUrl;
      });
      assertions[testCaseUrl] = outcome;
      if (testCase?.ruleId && !ruleIds.includes(testCase.ruleId)) {
        ruleIds.push(testCase.ruleId);
        this.setUnsaved();
      }
    },

    getEarlReport(): string {
      return createReport(this.procedures, this.implementation);
    },
  },
});
