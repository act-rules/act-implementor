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
import {
  createReport,
  loadReport,
  successCriteriaFromMapping,
} from "../logic/earl";

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

    findSuccessCriteria() {
      return (ruleId: string): string => {
        assert(this.rules?.[ruleId], `Unknown rule ID ${ruleId}`);
        const rule = this.rules[ruleId];
        const entries = Object.entries(this.procedures || {});
        const entry = entries.find(([, { ruleIds }]) =>
          ruleIds.includes(ruleId)
        );

        if (!entry) {
          const accRequirements = Object.keys(
            rule.ruleAccessibilityRequirements || {}
          );
          return successCriteriaFromMapping(accRequirements).join(", ");
        }
        return entry[1].successCriteria || "";
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
    setUnsaved(unsaved = true): void {
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

    async loadTestCases(testCaseUrl: string): Promise<void> {
      const content = await fetch(testCaseUrl);
      const jsonData = (await content.json()) as TestCasesJson;
      const { rules } = getImplementation(jsonData);
      this.rules = rules;
      this.loaded = true;
      this.testCases = jsonData.testcases;
    },

    resetReport(): void {
      this.procedures = {};
      this.implementation = {};
    },

    loadReportText(reportText: string): void {
      const { procedures, implementation } = loadReport(reportText);
      this.implementation = implementation;
      this.procedures = procedures;
    },

    renameProcedure(ruleId: string, newName: string): void {
      const currentName = this.findProcedureName(ruleId);
      const successCriteria = this.findSuccessCriteria(ruleId);
      const entries = Object.entries(
        this.procedures[currentName]?.assertions || []
      );
      const ruleAssertions = Object.fromEntries(
        entries.filter(([url]) => {
          return url.includes(`/${ruleId}/`);
        })
      );
      // If needed, create an empty process to add things to
      if (!this.procedures[newName]) {
        this.procedures[newName] = {
          ruleIds: [],
          assertions: {},
          successCriteria,
        };
      }
      // Merge rule info into the the process
      this.procedures[newName].ruleIds.push(ruleId);
      this.procedures[newName].assertions = {
        ...this.procedures[newName].assertions,
        ...ruleAssertions,
      };
      // Exit early if there's nothing worth keeping on the current process
      if (
        !this.procedures[currentName] ||
        this.procedures[currentName].ruleIds.length <= 1
      ) {
        delete this.procedures[currentName];
        return;
      }
      // Remove rule info from the existing process
      const filteredAssertionEntries = entries.filter(
        ([url]) => !url.includes(`/${ruleId}/`)
      );
      const filteredRuleIds = this.procedures[currentName].ruleIds.filter(
        (id) => id !== ruleId
      );
      this.procedures[currentName].ruleIds = filteredRuleIds;
      this.procedures[currentName].assertions = Object.fromEntries(
        filteredAssertionEntries
      );
    },

    setSuccessCriteria(ruleId: string, successCriteria: string): void {
      const procedureName = this.findProcedureName(ruleId);
      if (!this.procedures[procedureName]) {
        this.procedures[procedureName] = {
          ruleIds: [ruleId],
          successCriteria,
          assertions: {},
        };
      } else {
        this.procedures[procedureName].successCriteria = successCriteria;
      }
    },

    setOutcome(
      procedureName: string,
      testCaseUrl: string,
      outcome: string
    ): void {
      const testCase = this.testCases?.find(
        (testCase) => testCase.url === testCaseUrl
      );
      assert(testCase, `Unknown testcase with URL ${testCaseUrl}}`);
      this.procedures[procedureName] ??= {
        ruleIds: [testCase.ruleId],
        assertions: {},
        successCriteria: this.findSuccessCriteria(testCase.ruleId),
      };

      const { assertions, ruleIds } = this.procedures[procedureName];
      assertions[testCaseUrl] = outcome;
      if (!ruleIds.includes(testCase.ruleId)) {
        ruleIds.push(testCase.ruleId);
      }
      this.setUnsaved();
    },

    getEarlReport(): string {
      return createReport(this.procedures, this.implementation);
    },
  },
});
