import { Procedure } from "../types";

const context = "https://act-rules.github.io/earl-context.json";

interface Assertion {};

export function createReport(procedures: Record<string, Procedure>): string {
  const entries = Object.entries(procedures)
  const assertions: Assertion[] = []
  entries.forEach(([procedureName, procedure]) => {
    Object.entries(procedure.assertions).forEach(([testCaseUrl, outcome]) => {
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
