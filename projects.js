let allProjects = [];

async function fetchProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        allProjects = data.projects;
        handleRoute();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function handleRoute() {
    // If the hash is empty or just '#', it defaults to ''
    // Also ignore navigation hashes like '#projects', '#about', '#contacts'
    const hash = window.location.hash.slice(1);
    const mainSections = ['projects', 'about', 'contacts'];
    
    if (hash && !mainSections.includes(hash)) {
        // Look for project with matching folder name (used as ID)
        const project = allProjects.find(p => p.img_folder_name === hash);
        if (project) {
            renderProjectDetails(project);
            return;
        }
    }
    
    // Default to rendering the grid
    renderProjectGrid();
}

function renderProjectGrid() {
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = '';
    
    allProjects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        
        // Only show first image
        const firstPhoto = project.photos[0];
        
        const content = `
            <a href="#${project.img_folder_name}" class="project-preview" style="text-decoration: none;">
                <div class="project-image">
                    <img src="images/${project.img_folder_name}/${firstPhoto}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                </div>
            </a>
        `;
        
        projectItem.innerHTML = content;
        projectGrid.appendChild(projectItem);
    });
}

function renderProjectDetails(project) {
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = '';
    
    const detailView = document.createElement('div');
    detailView.className = 'project-detail';
    
    const galleryHTML = project.photos.map(photo => 
        `<div class="gallery-image">
            <img src="images/${project.img_folder_name}/${photo}" alt="${project.title}" loading="lazy">
        </div>`
    ).join('');
    
    detailView.innerHTML = `
        <a href="#projects" class="back-button" style="text-decoration: none; display: inline-block;">← projects</a>
        <div class="project-detail-content">
            <div class="project-info">
                <h2 class="project-title">${project.title}</h2>
                <h3 class="project-subtitle">${project.subtitle}</h3>
                <p class="project-description">${project.description}</p>
            </div>
            <div class="project-gallery vertical-scroll">
                ${galleryHTML}
            </div>
        </div>
    `;
    
    projectGrid.appendChild(detailView);
    
    // Smooth scroll to the projects section so user sees the details
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// Initialize routing and fetch data
window.addEventListener('hashchange', handleRoute);
document.addEventListener('DOMContentLoaded', fetchProjects);