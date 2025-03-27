async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        const projectGrid = document.querySelector('.project-grid');
        
        // Clear existing placeholder content
        projectGrid.innerHTML = '';
        
        // Create project items
        data.projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            
            const content = `
                <div class="project-image">
                    <img src="images/${project.img_folder_name}/main.jpg" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <h4 class="project-subtitle">${project.subtitle}</h4>
                    <p class="project-description">${project.description}</p>
                </div>
            `;
            
            projectItem.innerHTML = content;
            projectGrid.appendChild(projectItem);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Load projects when the page loads
document.addEventListener('DOMContentLoaded', loadProjects);