import fs from 'fs';
import path from 'path';

const dirs = [
    'c:/Users/saura/Desktop/vms/apps/web/src/pages/admin',
    'c:/Users/saura/Desktop/vms/apps/web/src/pages/web'
];

function fixImports(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixImports(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Replace ../../ components, services, constants, styles, layouts etc.
            // But be careful not to keep adding ../ if we run it multiple times.
            // Let's replace exactly match of `from '../../` or `import '../../` with `../../../`
            const newContent = content.replace(/from '..\/..\//g, "from '../../../")
                                      .replace(/import '..\/..\//g, "import '../../../");
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Fixed imports in ${fullPath}`);
            }
        }
    }
}

dirs.forEach(fixImports);
console.log('Done fixing imports.');
