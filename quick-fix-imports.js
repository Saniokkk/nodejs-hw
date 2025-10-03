// quick-fix-imports.js
import fs from "fs";
import path from "path";

function fixImports(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixImports(fullPath);
        } else if (fullPath.endsWith(".js")) {
            let code = fs.readFileSync(fullPath, "utf-8");
            code = code.replace(/(from\s+['"]\.\/[^\s'"]+)(?=['"])/g, "$1.js");
            fs.writeFileSync(fullPath, code);
        }
    }
}
fixImports("./src"); // тека з твоїми js файлами
