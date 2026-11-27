import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
// GitHub project Pages serves this repository beneath /groeitafel/.
// Regular npm run build keeps the root-domain and localhost behavior.
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  {
    stdio: "inherit",
    env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/groeitafel" },
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
writeFileSync("out/.nojekyll", "");
console.log(
  "GitHub Pages export ready in out/. Publish to gh-pages, then enable Pages for that branch.",
);
