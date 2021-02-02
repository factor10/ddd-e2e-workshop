/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require("fs-extra");

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on("task", {
    "db:empty": () => {
      fs.copy("test/e2e/fixtures/empty-storage.json", "src/infrastructure/_storage/e2e-storage.json");
      return null;
    },
    "db:apply-fixture": (fixtureName) => {
      fs.copy(`test/e2e/fixtures/${fixtureName}.json`, "src/infrastructure/_storage/e2e-storage.json");
      return null;
    }
  });
};
