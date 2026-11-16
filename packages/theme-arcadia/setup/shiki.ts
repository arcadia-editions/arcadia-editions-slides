import { defineShikiSetup } from "@slidev/types";
import zfl from "./zfl.tmLanguage.json";
import tla from "./tla.tmLanguage.json";

// Minimal ZFL/ZDL and TLA+ grammars so ```zfl / ```tla blocks highlight.
export default defineShikiSetup(() => ({
  langs: ["java", "kotlin", "typescript", "js", "json", "yaml", "bash", "md", "mermaid", zfl as any, tla as any],
}));
