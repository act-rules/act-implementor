import {
  Procedure,
  EarlAssertion,
  Implementation,
  EarlActImplementation,
} from "../types";
import { assert, validImport, validOutcome } from "./assert";

const context = "https://act-rules.github.io/earl-context.json";

export function createReport(
  procedures: Record<string, Procedure>,
  implementation: Implementation
): string {
  const earlReport = implementationToEarl(implementation);
  earlReport.assertedThat = assertionsToEarl(procedures);
  return JSON.stringify(earlReport, null, 2);
}

function implementationToEarl(
  implementation: Implementation
): EarlActImplementation {
  const earlReport: EarlActImplementation = {
    "@context": context,
    "@type": ["Assertor", "Project"],
    name: implementation.projectName || undefined,
    shortdesc: implementation.shortdesc || undefined,
    description: implementation.description || undefined,
    homepage: implementation.homepage || undefined,
    license: implementation.license || undefined,
  };
  if (implementation.versionName || implementation.versionDate) {
    earlReport.release = {
      "@type": "Version",
      created: implementation.versionDate || undefined,
      revision: implementation.versionName || undefined,
    };
  }
  return earlReport;
}

function assertionsToEarl(
  procedures: Record<string, Procedure>
): EarlAssertion[] {
  const entries = Object.entries(procedures);
  const assertions: EarlAssertion[] = [];
  entries.forEach(([procedureName, procedure]) => {
    Object.entries(procedure.assertions).forEach(([testCaseUrl, outcome]) => {
      validOutcome(outcome);
      assertions.push({
        "@type": "Assertion",
        subject: {
          "@type": "TestSubject",
          source: testCaseUrl,
        },
        test: {
          "@type": "TestCase",
          title: procedureName,
        },
        result: {
          "@type": "TestResult",
          outcome: `earl:${outcome}`,
        },
      });
    });
  });
  return assertions;
}

export function loadReport(report: string): {
  implementation: Implementation;
  procedures: Record<string, Procedure>;
} {
  const earlReport = JSON.parse(report);
  validImport(earlReport, context);
  const implementation = implementationFromEarl(earlReport);
  const procedures = assertionsFromEarl(earlReport);
  return { implementation, procedures };
}

function implementationFromEarl(
  earlReport: EarlActImplementation
): Implementation {
  const implementation: Implementation = {};
  if (typeof earlReport.name === "string") {
    implementation.projectName = earlReport.name;
  }
  if (typeof earlReport.shortdesc === "string") {
    implementation.shortdesc = earlReport.shortdesc;
  }
  if (typeof earlReport.description === "string") {
    implementation.description = earlReport.description;
  }
  if (typeof earlReport.homepage === "string") {
    implementation.homepage = earlReport.homepage;
  }
  if (typeof earlReport.license === "string") {
    implementation.license = earlReport.license;
  }
  if (typeof earlReport.release === "object") {
    if (typeof earlReport.release.created === "string") {
      implementation.versionDate = earlReport.release.created;
    }
    if (typeof earlReport.release.revision === "string") {
      implementation.versionName = earlReport.release.revision;
    }
  }
  return implementation;
}

function assertionsFromEarl({
  assertedThat,
}: EarlActImplementation): Record<string, Procedure> {
  const procedures: Record<string, Procedure> = {};
  assertedThat?.forEach((assertion) => {
    const testCaseUrl = assertion.subject.source;
    const procedureName = assertion.test.title;
    const outcome = assertion.result.outcome.replace("earl:", "");
    const ruleId = testCaseUrl.match(/\/([0-9a-z]{6})\//)?.[1];
    assert(
      typeof ruleId === "string",
      `Expect to find a ruleID in ${testCaseUrl}`
    );

    procedures[procedureName] ??= { ruleIds: [], assertions: {} };
    procedures[procedureName].assertions[testCaseUrl] = outcome;
    if (!procedures[procedureName].ruleIds.includes(ruleId)) {
      procedures[procedureName].ruleIds.push(ruleId);
    }
  });
  return procedures;
}
