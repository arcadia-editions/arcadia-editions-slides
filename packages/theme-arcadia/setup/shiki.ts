import { defineShikiSetup } from "@slidev/types";
import zfl from "./zfl.tmLanguage.json";

// Minimal ZFL/ZDL grammar so ```zfl blocks highlight.
export default defineShikiSetup(() => ({
  langs: ["java", "kotlin", "typescript", "js", "json", "yaml", "bash", "md", "mermaid", zfl as any],
}));
