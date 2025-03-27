// Function to load project details
function loadProjectDetails(project) {
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = '';
    
    const detailView = document.createElement('div');
    detailView.className = 'project-detail';
    
    const galleryHTML = project.photos.map(photo => 
        `<div class="gallery-image">
            <img src="images/${project.img_folder_name}/${photo}" alt="${project.title}">
        </div>`
    ).join('');
    
    detailView.innerHTML = `
        <button class="back-button" onclick="loadProjects()">← projects</button>
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
}

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        const projectGrid = document.querySelector('.project-grid');
        
        // Clear existing content
        projectGrid.innerHTML = '';
        
        // Create project preview items
        data.projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            
            // Only show first image
            const firstPhoto = project.photos[0];
            
            const content = `
                <div class="project-preview">
                    <div class="project-image">
                        <img src="images/${project.img_folder_name}/${firstPhoto}" alt="${project.title}">
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                </div>
            `;
            
            projectItem.innerHTML = content;
            projectItem.querySelector('.project-preview').dataset.project = JSON.stringify(project);
            projectItem.querySelector('.project-preview').addEventListener('click', function() {
                const projectData = JSON.parse(this.dataset.project);
                loadProjectDetails(projectData);
            });
            projectGrid.appendChild(projectItem);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}


// Load projects when the page loads
document.addEventListener('DOMContentLoaded', loadProjects);