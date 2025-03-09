// static/js/markdown-helper.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to properly render markdown content
    function enhanceMarkdownRendering() {
        document.querySelectorAll('.recommendation-content').forEach(container => {
            let html = container.innerHTML;
            
            // Fix headers that might not be properly rendered
            html = html.replace(/&lt;h([1-6])&gt;(.*?)&lt;\/h[1-6]&gt;/g, '<h$1>$2</h$1>');
            html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
            html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
            html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
            
            // Fix bold text
            html = html.replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/g, '<strong>$1</strong>');
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
            
            // Fix italic text
            html = html.replace(/&lt;em&gt;(.*?)&lt;\/em&gt;/g, '<em>$1</em>');
            html = html.replace(/\*([^\*\n]+)\*/g, '<em>$1</em>');
            html = html.replace(/_([^_\n]+)_/g, '<em>$1</em>');
            
            // Fix unordered lists
            html = html.replace(/^(\s*)[•*-](\s+)(.*)$/gm, function(match, indent, space, content) {
                // If not already in a list, create one
                return `${indent}<ul><li>${content}</li></ul>`;
            });
            
            // Flatten nested lists (cleanup duplicate <ul> tags)
            html = html.replace(/<\/ul>\s*<ul>/g, '');
            
            // Fix ordered lists
            html = html.replace(/^(\s*)(\d+)\.(\s+)(.*)$/gm, function(match, indent, number, space, content) {
                // If not already in a list, create one
                return `${indent}<ol start="${number}"><li>${content}</li></ol>`;
            });
            
            // Flatten nested ordered lists
            html = html.replace(/<\/ol>\s*<ol start="\d+">/g, '');
            
            // Fix line breaks
            html = html.replace(/\n\n/g, '<br><br>');
            
            // Fix links
            html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
            
            container.innerHTML = html;
            
            // Combine adjacent list items
            combineListItems(container);
        });
    }
    
    // Function to combine adjacent list items into a single list
    function combineListItems(container) {
        // Fix unordered lists
        let lists = container.querySelectorAll('ul');
        if (lists.length > 1) {
            // Get the first list
            const firstList = lists[0];
            
            // For each subsequent list, move its items to the first list
            for (let i = 1; i < lists.length; i++) {
                const items = lists[i].querySelectorAll('li');
                items.forEach(item => {
                    firstList.appendChild(item.cloneNode(true));
                });
                lists[i].remove();
            }
        }
        
        // Fix ordered lists
        lists = container.querySelectorAll('ol');
        if (lists.length > 1) {
            // Get the first list
            const firstList = lists[0];
            
            // For each subsequent list, move its items to the first list
            for (let i = 1; i < lists.length; i++) {
                const items = lists[i].querySelectorAll('li');
                items.forEach(item => {
                    firstList.appendChild(item.cloneNode(true));
                });
                lists[i].remove();
            }
        }
    }
    
    // Run the enhancement after a short delay to ensure content is loaded
    setTimeout(enhanceMarkdownRendering, 300);
});