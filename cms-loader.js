// CMS Loader for Dr. Goran Friad Website

async function loadCMSData() {
    try {
        const response = await fetch('/data/site.json');
        const data = await response.json();
        
        // Update all CMS-controlled elements
        if (data.siteName) {
            document.querySelector('.logo-name').textContent = data.siteName;
            document.title = `${data.siteName} - MD`;
        }
        
        if (data.heroGreeting) {
            document.getElementById('heroGreeting').textContent = data.heroGreeting;
        }
        
        if (data.heroName) {
            document.getElementById('heroName').textContent = data.heroName;
        }
        
        if (data.heroSuffix) {
            document.getElementById('heroSuffix').textContent = data.heroSuffix;
        }
        
        if (data.heroSubtitle) {
            document.getElementById('heroSubtitle').textContent = data.heroSubtitle;
        }
        
        if (data.aboutTitle) {
            document.getElementById('aboutTitle').textContent = data.aboutTitle;
        }
        
        if (data.blogHeading) {
            document.getElementById('blogHeading').textContent = data.blogHeading;
        }
        
        if (data.blogDescription) {
            document.getElementById('blogDescription').textContent = data.blogDescription;
        }
        
        if (data.blogButtonText) {
            document.getElementById('blogButtonText').textContent = data.blogButtonText;
        }
        
        if (data.contactPhone) {
            document.getElementById('contactPhone').textContent = data.contactPhone;
        }
        
        if (data.footerCopyright) {
            document.getElementById('footerCopyright').textContent = data.footerCopyright;
        }
        
        console.log('✅ CMS data loaded successfully');
        
    } catch (error) {
        console.log('📌 Using default content - CMS not yet configured');
    }
}

// Load when page is ready
document.addEventListener('DOMContentLoaded', loadCMSData);
