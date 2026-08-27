/**
 * Writes the standalone brand SVGs in public/brand/ from the shared path data
 * in lib/brand-mark.ts, so the static files, the React <Monogram>, and the
 * generated favicon/OG images never drift apart.
 *
 *   pnpm brand
 *
 * The generated files are committed, so this only needs running when the mark
 * itself changes. Requires Node >= 22.6 for TypeScript type stripping; the app
 * build itself has no such requirement.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { badgeSvg } = await import(`${root}/lib/brand-mark.ts`);

const files = {
  // Ivory on obsidian — the primary lockup, matching the house seal.
  "hod-seal-ivory.svg": badgeSvg({ fg: "#f1eee7", bg: "#0c0c0c" }),
  // Inverted, for light collateral and packaging.
  "hod-seal-obsidian.svg": badgeSvg({ fg: "#0c0c0c", bg: "#f1eee7" }),
  // Transparent + currentColor, for inlining anywhere.
  "hod-seal.svg": badgeSvg({ fg: "currentColor" }),
  // Bare HD monogram, no type ring — for small sizes and embroidery files.
  "hod-mark.svg": badgeSvg({ fg: "currentColor", ring: false }),
};

await mkdir(`${root}/public/brand`, { recursive: true });

for (const [name, contents] of Object.entries(files)) {
  await writeFile(`${root}/public/brand/${name}`, `${contents}\n`, "utf8");
  console.log(`wrote public/brand/${name}`);
}
