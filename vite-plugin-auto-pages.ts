// vite-plugin-auto-pages.ts
import fs from 'fs';
import path from 'path';
import { type Plugin } from 'vite';

export default function autoPages(): Plugin {
  const pagesDir = 'src/pages';
  
  return {
    name: 'vite-plugin-auto-pages',
    
    async handleHotUpdate({ file, read }) {
      if (file.endsWith('App.tsx')) {
        const content = await read();
        const regex = /element=\{<(\w+)\s*\/?>/g;
        let match;
        
        while ((match = regex.exec(content)) !== null) {
          const componentName = match[1];
          const filePath = path.join(pagesDir, `${componentName}.tsx`);
          
          if (!fs.existsSync(filePath)) {
            const template = `export default function ${componentName}() {
  return (
    <>
      ${componentName} Page
    </>
  )
}
`;
            fs.mkdirSync(pagesDir, { recursive: true });
            fs.writeFileSync(filePath, template);
            console.log(`✅ Auto-created: ${filePath}`);
          }
        }
      }
    }
  };
}