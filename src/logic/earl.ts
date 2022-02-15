import { Procedure, EarlAssertion } from "../types";
import { assert, validImport, validOutcome } from './assert';

const context = "https://act-rules.github.io/earl-context.json";

export function createReport(procedures: Record<string, Procedure>): string {
  const entries = Object.entries(procedures);
  const assertions: EarlAssertion[] = [];
  entries.forEach(([procedureName, procedure]) => {
    Object.entries(procedure.assertions).forEach(([testCaseUrl, outcome]) => {
      validOutcome(outcome);
      assertions.push({
        "@type": "Assertion",
        subject: {
          "@type": "TestSubject",
          "source": testCaseUrl,
        },
        test: {
          "@type": "TestCase",
          "title": procedureName
        },
        result: {
          "@type": "TestResult",
          "outcome": `earl:${outcome}`
        }
      })
    })
  })

  return JSON.stringify({
    "@context": context,
    "@graph": assertions
  }, null, 2);
}

export function loadReport(report: string): Record<string, Procedure> {
  const earlReport = JSON.parse(report);
  validImport(earlReport, context);

  const procedures: Record<string, Procedure> = {};
  earlReport['@graph'].forEach(assertion => {
    const testCaseUrl = assertion.subject.source;
    const procedureName = assertion.test.title;
    const outcome = assertion.result.outcome.replace('earl:', '');
    const ruleId = testCaseUrl.match(/\/([0-9a-z]{6})\//)?.[1];
    assert(typeof ruleId === 'string', `Expect to find a ruleID in ${testCaseUrl}`);

    procedures[procedureName] ??= { ruleIds: [], assertions: {} };
    procedures[procedureName].assertions[testCaseUrl] = outcome;
    if (!procedures[procedureName].ruleIds.includes(ruleId)) {
      procedures[procedureName].ruleIds.push(ruleId);
    }
  });
  return procedures;
}
