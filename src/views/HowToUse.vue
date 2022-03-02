<script setup lang="ts">
import Icon from "../components/Icon.vue";
</script>

<template>
  <h1>How to use</h1>
  <p>
    The ACT Implementor is a tool that can be used to create and maintain an ACT
    implementation report. These reports can then be used to determine the
    consistency and coverage of implementations like accessibility test tools
    and evaluation methodologies.
  </p>
  <p>
    This tool is specifically designed for manual and semi-automated
    accessibility testing solutions. For fully automated accessibility test
    tools it is recommended to build a test runner that outputs JSON+EARL
    instead. See
    <a href="https://github.com/act-rules/testrunner">ACT Test Runner</a> for
    details.
  </p>

  <h2>Step 1: Create or import a report</h2>
  <p>
    From <router-link to="/start">start</router-link>, either create a new
    report or import an existing report either by copying the JSON content in,
    or providing a URL to the file. When using GitHub, make sure to get the
    `raw` git URL.
  </p>

  <h2>Step 2: Update Implementation Data</h2>
  <p>
    From <router-link to="/implementation">implementation</router-link>, fill
    out details of the implementation, such as the name of the tool or
    procedure, a brief description, home page, etc. All fields in this view are
    optional. Leave any field that is not relevant empty.
  </p>

  <h2>Step 3: Add or update the implementation of an ACT rule</h2>
  <p>
    From <router-link to="/rules">rules</router-link>, find whatever rule you
    want to work on. Rules are grouped by whether they are partially tested,
    fully tested, and untested. Rules may go from being fully tested to
    partially tested as test cases in that rule are updated or added. In rare
    cases where all test cases have changed, a previously tested rule can be set
    to untested once more.
  </p>
  <p>
    After selecting a rule, fill in the name, identifier, or title of
    <strong>implementation procedure</strong> that you will be using for the
    test. This can be a name, identifier or title of a procedure, check point,
    failure type, rule in a tool. Different implementations have different names
    for what in ACT terminology is called an implementation procedure.
  </p>
  <p>
    Go through the list of examples, opening them one at a time, then run the
    implementation procedure against that test page. In the outcomes column,
    select the most appropriate outcome for that example.
  </p>

  <h2>Step 4: Export and store the report</h2>
  <p>
    From <router-link to="/export">export</router-link>, copy the resulting JSON
    report or download it as a file. The content of this file must then be
    uploaded to GitHub, or wherever else the implementation report is stored.
    When updating, make sure to replace the previous report and leave the
    filename unchanged so that the URL remains consistent.
  </p>

  <h2>Other Resources</h2>
  <ul>
    <li>
      <a
        href="https://www.w3.org/WAI/standards-guidelines/act/rules/about/"
        target="_blank"
      >
        About ACT Rules<Icon type="box-arrow-up-right" small />
      </a>
    </li>
    <li>
      <a
        href="https://act-rules.github.io/pages/implementations/overview/"
        target="_blank"
      >
        ACT Rule implementations<Icon type="box-arrow-up-right" small />
      </a>
    </li>
    <li>
      <a
        href="https://act-rules.github.io/pages/implementations/mapping/"
        target="_blank"
      >
        Mapping to ACT rules<Icon type="box-arrow-up-right" small />
      </a>
    </li>
    <li>
      <a
        href="https://act-rules.github.io/pages/implementations/reporting/"
        target="_blank"
      >
        Submit an implementation<Icon type="box-arrow-up-right" small />
      </a>
    </li>
  </ul>
</template>
