import { server } from "../../server.ts";
import { Rhum } from "./deps.ts";

const serverConfigs = {
  hostname: "localhost",
  port: 1447,
};
const url = `http://${serverConfigs.hostname}:${serverConfigs.port}/staging`;

Rhum.testPlan("tests/integration/staging_module_resource_test.ts", () => {
  Rhum.testSuite("GET /staging/:module", () => {
    Rhum.testCase(
      "Responds with 302 and redirects to latest version when `module` is drash",
      async () => {
        await server.run(serverConfigs);
        const res = await fetch(`${url}/drash`);
        server.close();
        Rhum.asserts.assertEquals(res.status, 302);
        Rhum.asserts.assertEquals(res.url, `${url}/drash/v1.x`);
      },
    );
    Rhum.testCase(
      "Responds with 302 redirects to latest version when `module` is dmm",
      async () => {
        await server.run(serverConfigs);
        const res = await fetch(`${url}/dmm`);
        server.close();
        Rhum.asserts.assertEquals(res.status, 302);
        Rhum.asserts.assertEquals(res.url, `${url}/dmm/v1.x`);
      },
    );
    Rhum.testCase(
      "Responds with 302 redirects to latest version when `module` is rhum",
      async () => {
        await server.run(serverConfigs);
        const res = await fetch(`${url}/rhum`);
        server.close();
        Rhum.asserts.assertEquals(res.status, 302);
        Rhum.asserts.assertEquals(res.url, `${url}/rhum/v1.x`);
      },
    );
    Rhum.testCase(
      "Responds with 302 redirects to latest version when `module` is wocket",
      async () => {
        await server.run(serverConfigs);
        const res = await fetch(`${url}/wocket`);
        server.close();
        Rhum.asserts.assertEquals(res.status, 302);
        Rhum.asserts.assertEquals(res.url, `${url}/wocket/v0.x`);
      },
    );
    Rhum.testCase(
      "Responds with 302 redirects to latest version when `module` is sinco",
      async () => {
        await server.run(serverConfigs);
        const res = await fetch(`${url}/sinco`);
        server.close();
        Rhum.asserts.assertEquals(res.status, 302);
        Rhum.asserts.assertEquals(res.url, `${url}/sinco/v1.x`);
      },
    );
    Rhum.testCase(
      "Responds with 404 when `module` is not a recognised module",
      async () => {
        await server.run(serverConfigs);
        const res = await fetch(`${url}/hella`);
        server.close();
        Rhum.asserts.assertEquals(res.status, 404);
        Rhum.asserts.assertEquals(res.url, `${url}/v1.x`); // fixme this will be wrong
      },
    );
  });
  Rhum.testSuite("GET /staging/:module/:version", () => {
    Rhum.testCase("Responds with 200 for /drash/v1.x", async () => {
      await server.run(serverConfigs);
      // Development
      const res = await fetch(`${url}/drash/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/drash/v1.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Drash");
      const bundle = text.includes(
        `<script src="/assets/bundles/drash.v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /dmm/v1.x", async () => {
      await server.run(serverConfigs);
      // Development
      const res = await fetch(`${url}/dmm/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/dmm/v1.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Dmm");
      const bundle = text.includes(
        `<script src="/assets/bundles/dmm.v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /rhum/v1.x", async () => {
      await server.run(serverConfigs);
      const res = await fetch(`${url}/rhum/v1.x`);
      Rhum.asserts.assertEquals(res.status, 200);
      Rhum.asserts.assertEquals(res.url, `${url}/rhum/v1.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Rhum");
      const bundle = text.includes(
        `<script src="/assets/bundles/rhum.v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /wocket/v0.x", async () => {
      await server.run(serverConfigs);
      const res = await fetch(`${url}/wocket/v0.x`);
      Rhum.asserts.assertEquals(res.status, 302);
      Rhum.asserts.assertEquals(res.url, `${url}/wocket/v0.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Wocket");
      const bundle = text.includes(
        `<script src="/assets/bundles/wocket.v0.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase("Responds with 200 for /sinco/v1.x", async () => {
      await server.run(serverConfigs);
      const res = await fetch(`${url}/sinco`);
      Rhum.asserts.assertEquals(res.status, 302);
      Rhum.asserts.assertEquals(res.url, `${url}/sinco/v1.x`);
      const text = await res.text();
      server.close();
      const title = text.split("<title>")[1].split("</title>")[0];
      Rhum.asserts.assertEquals(title, "Drash Land - Sinco");
      const bundle = text.includes(
        `<script src="/assets/bundles/sinco.v1.x.js"></script>`,
      );
      Rhum.asserts.assertEquals(bundle, true);
    });
    Rhum.testCase(
      "Responds with 404 when `version` is not a recognised version for the module",
      async () => {
        await server.run(serverConfigs);
        const res = await fetch(`${url}/drash/hella`);
        server.close();
        Rhum.asserts.assertEquals(res.status, 404);
        Rhum.asserts.assertEquals(res.url, `${url}/v1.x`); // fixme this will be wrong
      },
    );
  });
});

Rhum.run();