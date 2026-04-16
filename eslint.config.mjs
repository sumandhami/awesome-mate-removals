import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores(["dist/**", ".next/**", "node_modules/**", ".eslintrc.cjs"]),
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    rules: {
      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",
      "@next/next/no-img-element": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
]);
