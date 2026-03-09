// Remark plugin to convert :::lang-en / :::lang-zh fenced divs into HTML divs
import { visit } from 'unist-util-visit';

export function remarkLangBlocks() {
  return (tree) => {
    const newChildren = [];
    let currentLang = null;
    let buffer = [];

    for (const node of tree.children) {
      // Check if this is a paragraph containing just ":::lang-en" or ":::lang-zh" or ":::"
      let text = '';
      if (node.type === 'paragraph' && node.children?.length === 1 && node.children[0].type === 'text') {
        text = node.children[0].value.trim();
      }

      if (text === ':::lang-en' || text === ':::lang-zh') {
        // Close previous block if open
        if (currentLang && buffer.length > 0) {
          newChildren.push({
            type: 'html',
            value: `<div class="${currentLang}">`,
          });
          newChildren.push(...buffer);
          newChildren.push({
            type: 'html',
            value: `</div>`,
          });
          buffer = [];
        }
        currentLang = text === ':::lang-en' ? 'lang-en' : 'lang-zh';
      } else if (text === ':::') {
        // Close current block
        if (currentLang && buffer.length > 0) {
          newChildren.push({
            type: 'html',
            value: `<div class="${currentLang}">`,
          });
          newChildren.push(...buffer);
          newChildren.push({
            type: 'html',
            value: `</div>`,
          });
          buffer = [];
        }
        currentLang = null;
      } else if (currentLang) {
        buffer.push(node);
      } else {
        newChildren.push(node);
      }
    }

    // Flush remaining buffer
    if (currentLang && buffer.length > 0) {
      newChildren.push({
        type: 'html',
        value: `<div class="${currentLang}">`,
      });
      newChildren.push(...buffer);
      newChildren.push({
        type: 'html',
        value: `</div>`,
      });
    }

    tree.children = newChildren;
  };
}
