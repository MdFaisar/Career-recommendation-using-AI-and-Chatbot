// Enhanced function to determine the optimal role based on recommendation content
function determineOptimalRole(attributes) {
    if (!attributes || attributes.length === 0) return;
    
    // Get the recommendation content
    const recommendationContent = document.querySelector('.recommendation-content');
    if (!recommendationContent) {
        console.error("Recommendation content not found");
        return fallbackRoleDetermination(attributes);
    }
    
    // Try to extract roles from the recommendation content
    const extractedRoles = extractRolesFromContent(recommendationContent);
    
    if (extractedRoles && extractedRoles.length > 0) {
        // Use the first (primary) role from the content
        displayOptimalRole(extractedRoles[0].title, extractedRoles[0].icon);
    } else {
        // Fall back to the attribute-based determination if no roles found in content
        fallbackRoleDetermination(attributes);
    }
}

// Function to extract roles from the recommendation content
function extractRolesFromContent(contentElement) {
    if (!contentElement) return [];
    
    const roles = [];
    
    // Look for headings that might contain role titles
    const headings = contentElement.querySelectorAll('h1, h2, h3, h4');
    
    // Primary approach: Look for career path specific headings
    for (const heading of headings) {
        if (!heading || !heading.textContent) continue;
        
        const text = heading.textContent.trim();
        
        // Skip regional headings or general sections
        if (text.toLowerCase().includes('india') || 
            text.toLowerCase().includes('international') ||
            text.toLowerCase().includes('recommendation') ||
            text.toLowerCase().includes('summary')) {
            continue;
        }
        
        // Patterns that indicate this might be a job role heading
        if (isTitleLikelyJobRole(text)) {
            roles.push({
                title: text,
                icon: determineIconForRole(text),
                element: heading,
                priority: 1
            });
        }
    }
    
    // Secondary approach: Check for strong tags or emphasized text that might contain roles
    if (roles.length === 0) {
        const emphasizedElements = contentElement.querySelectorAll('strong, b, em');
        for (const element of emphasizedElements) {
            if (!element || !element.textContent) continue;
            
            const text = element.textContent.trim();
            if (text.length > 3 && text.length < 50 && isTitleLikelyJobRole(text)) {
                roles.push({
                    title: text,
                    icon: determineIconForRole(text),
                    element: element,
                    priority: 2
                });
            }
        }
    }
    
    // Tertiary approach: Look for sentences containing career-related keywords
    if (roles.length === 0) {
        const paragraphs = contentElement.querySelectorAll('p');
        for (const paragraph of paragraphs) {
            if (!paragraph || !paragraph.textContent) continue;
            
            const text = paragraph.textContent;
            const roleMatch = text.match(/(?:recommend|suitable|ideal|perfect|best|career as a|career as an|role as a|role as an|position as a|position as an|job as a|job as an|profession as a|profession as an)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})/i);
            
            if (roleMatch && roleMatch[1]) {
                const roleTitle = roleMatch[1].trim();
                if (roleTitle.length > 3 && isTitleLikelyJobRole(roleTitle)) {
                    roles.push({
                        title: roleTitle,
                        icon: determineIconForRole(roleTitle),
                        element: paragraph,
                        priority: 3
                    });
                }
            }
        }
    }
    
    // Sort by priority (lower number = higher priority)
    return roles.sort((a, b) => a.priority - b.priority);
}

// Function to determine if a text string is likely a job role title
function isTitleLikelyJobRole(text) {
    if (!text) return false;
    
    // Common tech/professional role keywords
    const roleKeywords = [
        'developer', 'engineer', 'designer', 'manager', 'analyst', 'architect', 'consultant',
        'specialist', 'technician', 'scientist', 'director', 'administrator', 'coordinator',
        'lead', 'head', 'professional', 'strategist', 'expert', 'programmer', 'tester'
    ];
    
    // Check for common role keywords
    const containsRoleKeyword = roleKeywords.some(keyword => 
        text.toLowerCase().includes(keyword)
    );
    
    // Check for tech domain keywords
    const techDomains = [
        'software', 'web', 'frontend', 'backend', 'full stack', 'fullstack', 'mobile',
        'ui/ux', 'ux/ui', 'data', 'cloud', 'devops', 'security', 'network', 'systems',
        'machine learning', 'ai', 'artificial intelligence', 'blockchain', 'iot'
    ];
    
    const containsTechDomain = techDomains.some(domain => 
        text.toLowerCase().includes(domain)
    );
    
    // Other job role indicators
    const isProfessionalRole = 
        (text.length > 3 && text.length < 50) && // Reasonable length for a title
        !text.includes('?') && // Not a question
        !text.endsWith('.') && // Not a sentence
        !text.toLowerCase().includes('summary') && // Not a summary section
        !text.toLowerCase().includes('content'); // Not a content section
    
    return (containsRoleKeyword || containsTechDomain) && isProfessionalRole;
}

// Function to determine an appropriate icon for a role
function determineIconForRole(roleTitle) {
    if (!roleTitle) return 'fa-briefcase'; // Default icon
    
    const roleLower = roleTitle.toLowerCase();
    
    // Map role keywords to Font Awesome icons
    const iconMappings = [
        { keywords: ['develop', 'programmer', 'coding', 'software'], icon: 'fa-code' },
        { keywords: ['data', 'analyst', 'analytics', 'scientist'], icon: 'fa-chart-line' },
        { keywords: ['design', 'ui', 'ux', 'graphic'], icon: 'fa-pencil-ruler' },
        { keywords: ['manager', 'lead', 'director', 'head'], icon: 'fa-users-cog' },
        { keywords: ['product', 'project', 'program'], icon: 'fa-tasks' },
        { keywords: ['security', 'cyber', 'ethical'], icon: 'fa-shield-alt' },
        { keywords: ['network', 'system', 'infrastructure'], icon: 'fa-server' },
        { keywords: ['cloud', 'devops', 'operations'], icon: 'fa-cloud' },
        { keywords: ['mobile', 'android', 'ios', 'app'], icon: 'fa-mobile-alt' },
        { keywords: ['web', 'frontend', 'front-end', 'front end'], icon: 'fa-laptop-code' },
        { keywords: ['backend', 'back-end', 'back end'], icon: 'fa-database' },
        { keywords: ['fullstack', 'full-stack', 'full stack'], icon: 'fa-layer-group' },
        { keywords: ['ai', 'machine', 'learning', 'intelligence'], icon: 'fa-brain' },
        { keywords: ['test', 'qa', 'quality'], icon: 'fa-check-circle' },
        { keywords: ['consult', 'advisor'], icon: 'fa-comment-dots' },
        { keywords: ['architect', 'architecture'], icon: 'fa-sitemap' },
        { keywords: ['content', 'writer', 'author'], icon: 'fa-pen-fancy' },
        { keywords: ['customer', 'support', 'service'], icon: 'fa-headset' }
    ];
    
    // Find the first matching icon or return default
    for (const mapping of iconMappings) {
        if (mapping.keywords.some(keyword => roleLower.includes(keyword))) {
            return mapping.icon;
        }
    }
    
    return 'fa-briefcase'; // Default icon if no matches
}

// Function to display the optimal role in the UI
function displayOptimalRole(roleTitle, roleIcon) {
    const optimalRoleElement = document.getElementById('optimal-role');
    if (!optimalRoleElement) return;
    
    optimalRoleElement.innerHTML = `
        <i class="fas ${roleIcon}"></i> Your Ideal Role:<br>
        <span style="font-size: 1.3em; display: block; margin-top: 8px;">${roleTitle}</span>
    `;
    
    // Add reveal animation
    optimalRoleElement.classList.add('fade-in');
}

// Fallback to attribute-based role determination if content analysis fails
function fallbackRoleDetermination(attributes) {
    // Get top 3 attributes
    const topAttributes = attributes.slice(0, Math.min(3, attributes.length))
        .map(attr => attr[0])
        .filter(attr => attr !== null && attr !== undefined);
        
    let optimalRole = "";
    let roleIcon = "";
    
    // Helper function to check if attribute exists in top attributes
    const hasAttribute = (attr) => {
        return topAttributes.some(a => a === attr);
    };
    
    // Role determination logic based on top attributes (original logic)
    if (hasAttribute('analytical') && hasAttribute('technical')) {
        if (hasAttribute('creativity')) {
            optimalRole = "Data Scientist";
            roleIcon = "fa-chart-line";
        } else {
            optimalRole = "Software Developer";
            roleIcon = "fa-code";
        }
    } else if (hasAttribute('leadership') && hasAttribute('analytical')) {
        optimalRole = "Project Manager";
        roleIcon = "fa-tasks";
    } else if (hasAttribute('creativity') && hasAttribute('artistic')) {
        optimalRole = "UX/UI Designer";
        roleIcon = "fa-pencil-ruler";
    } else if (hasAttribute('analytical') && hasAttribute('business')) {
        optimalRole = "Business Analyst";
        roleIcon = "fa-chart-bar";
    } else if (hasAttribute('leadership') && hasAttribute('time_management')) {
        optimalRole = "Team Lead";
        roleIcon = "fa-users-cog";
    } else if (hasAttribute('technical') && hasAttribute('problem_solving')) {
        optimalRole = "DevOps Engineer";
        roleIcon = "fa-server";
    } else if (hasAttribute('helping') && hasAttribute('social')) {
        optimalRole = "Customer Success Manager";
        roleIcon = "fa-headset";
    } else if (hasAttribute('creativity') && hasAttribute('technical')) {
        optimalRole = "Front-end Developer";
        roleIcon = "fa-laptop-code";
    } else {
        // Default role if no specific match
        optimalRole = "Technical Consultant";
        roleIcon = "fa-briefcase";
    }
    
    // Display the determined role
    displayOptimalRole(optimalRole, roleIcon);
}

// Function to handle tab clicks and show the appropriate content
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (!tabButtons.length) {
        console.error("Tab buttons not found");
        return;
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab identifier
            const tabId = this.getAttribute('data-tab');
            
            // Handle tab content visibility
            handleTabContent(tabId);
        });
    });
}

// Function to find section elements and scroll to them
function handleTabContent(tabId) {
    const recommendationContent = document.querySelector('.recommendation-content');
    if (!recommendationContent) {
        console.error("Recommendation content not found");
        return;
    }
    
    // Find heading elements in the recommendation content
    const headings = recommendationContent.querySelectorAll('h1, h2, h3, h4');
    let targetElement = null;
    
    if (tabId === 'all') {
        // For "All Recommendations", scroll to the top of the recommendation content
        targetElement = recommendationContent;
    } else if (tabId === 'india') {
        // For "India" tab, find headings containing India
        for (const heading of headings) {
            if (heading.textContent.includes('Indian Opportunities') || 
                heading.textContent.includes('India') || 
                heading.innerText.includes('🇮🇳')) {
                targetElement = heading;
                break;
            }
        }
        
        // If no heading found, look for sections with India class
        if (!targetElement) {
            const indiaSection = document.querySelector('.india-section, .india-section-heading');
            if (indiaSection) {
                targetElement = indiaSection;
            }
        }
    } else if (tabId === 'international') {
        // For "International" tab, find headings containing International
        for (const heading of headings) {
            if (heading.textContent.includes('International Opportunities') || 
                heading.textContent.includes('International') || 
                heading.innerText.includes('🌐')) {
                targetElement = heading;
                break;
            }
        }
        
        // If no heading found, look for sections with International class
        if (!targetElement) {
            const internationalSection = document.querySelector('.international-section, .international-section-heading');
            if (internationalSection) {
                targetElement = internationalSection;
            }
        }
    }
    
    // If a target element was found, scroll to it
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tabId !== 'all') {
        // If we couldn't find a specific section and it's not the "all" tab,
        // try to find content by text
        scrollToTextContent(tabId, recommendationContent);
    }
}

// Function to find and scroll to content based on text
function scrollToTextContent(keyword, container) {
    if (!container) return;
    
    // Convert keyword to searchable format
    const searchTerm = keyword.toLowerCase();
    
    // Get all text-containing elements
    const textElements = container.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
    
    // Find the first element containing the keyword
    for (const element of textElements) {
        if (element.textContent.toLowerCase().includes(searchTerm)) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
    }
    
    // If we reach here, we couldn't find the content
    console.warn(`Could not find content containing "${keyword}"`);
}

// Initialize share dialog functionality
function setupShareDialog() {
    const shareBtn = document.querySelector('.share-btn');
    const shareDialog = document.getElementById('shareDialog');
    const closeDialog = document.querySelector('.close-dialog');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    
    if (shareBtn && shareDialog) {
        shareBtn.addEventListener('click', function() {
            shareDialog.style.display = 'flex';
            setTimeout(() => {
                shareDialog.classList.add('dialog-active');
            }, 10);
        });
    }
    
    if (closeDialog && shareDialog) {
        closeDialog.addEventListener('click', function() {
            shareDialog.classList.remove('dialog-active');
            setTimeout(() => {
                shareDialog.style.display = 'none';
            }, 300);
        });
    }
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            const linkInput = document.getElementById('shareLink');
            if (linkInput) {
                linkInput.select();
                document.execCommand('copy');
                
                // Show a temporary "Copied!" message
                const originalIcon = copyLinkBtn.innerHTML;
                copyLinkBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyLinkBtn.innerHTML = originalIcon;
                }, 2000);
            }
        });
    }
}

// Initialize the rating graph when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment to ensure all data is loaded
    setTimeout(() => {
        initRatingGraph();
        
        // Set up the tab functionality
        setupTabs();
        
        // Set up the share dialog
        setupShareDialog();
        
        // Add click handler to role display to scroll to relevant content
        const optimalRoleElement = document.getElementById('optimal-role');
        if (optimalRoleElement) {
            optimalRoleElement.addEventListener('click', function() {
                // Try to find the corresponding content
                const recommendationContent = document.querySelector('.recommendation-content');
                if (!recommendationContent) return;
                
                const extractedRoles = extractRolesFromContent(recommendationContent);
                if (extractedRoles && extractedRoles.length > 0 && extractedRoles[0].element) {
                    // Scroll to the position of the role heading/element
                    extractedRoles[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
            
            // Add a pointer cursor to indicate it's clickable
            optimalRoleElement.style.cursor = 'pointer';
        }
        
        // Add classes to help identify sections
        addSectionClasses();
    }, 500);
});

// Function to add classes to help identify sections
function addSectionClasses() {
    const recommendationContent = document.querySelector('.recommendation-content');
    if (!recommendationContent) return;
    
    // Find headings in the recommendation content
    const headings = recommendationContent.querySelectorAll('h1, h2, h3, h4');
    
    for (const heading of headings) {
        const text = heading.textContent.toLowerCase();
        
        // Add classes based on heading content
        if (text.includes('india') || text.includes('indian')) {
            heading.classList.add('india-section-heading');
            
            // Find the section following this heading
            let section = heading.nextElementSibling;
            let sectionElements = [];
            
            // Collect all elements until the next heading or end of content
            while (section && !['H1', 'H2', 'H3', 'H4'].includes(section.tagName)) {
                sectionElements.push(section);
                section = section.nextElementSibling;
            }
            
            // Add class to each element in the section
            sectionElements.forEach(elem => {
                elem.classList.add('india-section');
            });
        } else if (text.includes('international')) {
            heading.classList.add('international-section-heading');
            
            // Find the section following this heading
            let section = heading.nextElementSibling;
            let sectionElements = [];
            
            // Collect all elements until the next heading or end of content
            while (section && !['H1', 'H2', 'H3', 'H4'].includes(section.tagName)) {
                sectionElements.push(section);
                section = section.nextElementSibling;
            }
            
            // Add class to each element in the section
            sectionElements.forEach(elem => {
                elem.classList.add('international-section');
            });
        }
    }
}

// Function to initialize and render the rating graph
function initRatingGraph() {
    // Get skills and interests data from hidden elements
    const skillsDataElement = document.getElementById('skillsData');
    const interestsDataElement = document.getElementById('interestsData');
    
    if (!skillsDataElement || !interestsDataElement) {
        console.error("Skills or interests data elements not found");
        return;
    }
    
    try {
        // Parse the JSON data with safety checks
        let skills = {};
        let interests = {};
        
        try {
            skills = JSON.parse(skillsDataElement.textContent || '{}');
        } catch (e) {
            console.error("Error parsing skills data:", e);
        }
        
        try {
            interests = JSON.parse(interestsDataElement.textContent || '{}');
        } catch (e) {
            console.error("Error parsing interests data:", e);
        }
        
        // Combine skills and interests data for the rating graph
        const ratingData = {...skills, ...interests};
        
        // Get the container element
        const ratingGraphContainer = document.getElementById('skills-rating-graph');
        if (!ratingGraphContainer) {
            console.error("Rating graph container not found");
            return;
        }
        
        // Sort attributes by value in descending order
        const sortedAttributes = Object.entries(ratingData)
            .filter(([_, value]) => value !== null && value !== undefined)
            .sort((a, b) => (b[1] || 0) - (a[1] || 0))
            .slice(0, 8); // Show top 8 attributes
        
        // Clear existing content
        ratingGraphContainer.innerHTML = '';
        
        // Create rating bars for each attribute
        sortedAttributes.forEach(([attribute, value]) => {
            if (attribute === null || value === null || value === undefined) return;
            
            const ratingItem = document.createElement('div');
            ratingItem.className = 'rating-item';
            
            // Format attribute name for display (convert snake_case to Title Case)
            const formattedAttribute = attribute
                .replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            const safeValue = Number(value) || 0; // Convert to number, default to 0
            
            ratingItem.innerHTML = `
                <div class="rating-label">
                    <span>${formattedAttribute}</span>
                    <span>${safeValue.toFixed(1)}/5</span>
                </div>
                <div class="rating-bar">
                    <div class="rating-fill" data-value="${safeValue}"></div>
                </div>
            `;
            
            ratingGraphContainer.appendChild(ratingItem);
        });
        
        // Animate the rating bars after a delay
        setTimeout(() => {
            const ratingFills = document.querySelectorAll('.rating-fill');
            ratingFills.forEach(fill => {
                const value = fill.getAttribute('data-value') || 0;
                fill.style.width = `${(Number(value) / 5) * 100}%`;
            });
        }, 500);
        
        // Determine optimal role based on top attributes and recommendation content
        if (sortedAttributes.length > 0) {
            determineOptimalRole(sortedAttributes);
        }
        
    } catch (error) {
        console.error("Error initializing rating graph:", error);
    }
}