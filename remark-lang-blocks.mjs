// Remark plugin to convert :::lang-en / :::lang-zh fenced divs into HTML divs

export function remarkLangBlocks() {
  return (tree) => {
    // Simple approach: convert the entire tree to string and use regex
    const treeToString = (node) => {
      if (node.type === 'text') {
        return node.value;
      } else if (node.type === 'paragraph') {
        return node.children.map(treeToString).join('') + '\n';
      } else if (node.type === 'heading') {
        return `#${'#'.repeat(node.depth - 1)} ${node.children.map(treeToString).join('')}\n`;
      } else if (node.type === 'list') {
        const listType = node.ordered ? '1.' : '-';
        return node.children.map(item => `${listType} ${item.children.map(treeToString).join('')}\n`).join('');
      } else if (node.type === 'thematicBreak') {
        return '---\n';
      } else if (node.type === 'html') {
        return node.value;
      }
      return '';
    };
    
    // Convert tree to string
    const content = tree.children.map(treeToString).join('');
    
    // Replace language blocks with HTML
    const processedContent = content
      .replace(/:::lang-en[\s\S]*?:::/g, (match) => {
        const content = match.replace(/^:::lang-en\s*/, '').replace(/\s*:::$/, '');
        return `<div class="lang-en active">${content}</div>`;
      })
      .replace(/:::lang-zh[\s\S]*?:::/g, (match) => {
        const content = match.replace(/^:::lang-zh\s*/, '').replace(/\s*:::$/, '');
        return `<div class="lang-zh active">${content}</div>`;
      })
      .replace(/:::zh-hans[\s\S]*?:::/g, (match) => {
        const content = match.replace(/^:::zh-hans\s*/, '').replace(/\s*:::$/, '');
        return `<div class="lang-zh active">${content}</div>`;
      });
    
    // Replace tree children with the processed HTML
    tree.children = [{
      type: 'html',
      value: processedContent
    }];
  };
}
