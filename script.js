document.addEventListener("DOMContentLoaded", function(event) {
    // main screen elements and attributes
    const aboutTab = document.getElementById('aboutTab');
    const projectsTab = document.getElementById('projectsTab');

    const cursor = document.createElement('span');
    const default_path = "PS C:\\Users\\nickomode\\nick-bui-personal-website";
    cursor.className = 'cursor';

    const prompt = document.querySelector('.prompt');
    prompt.appendChild(cursor);

    // window elements 
    const fakeWindow = document.getElementById('fakeWindow');
    const windowTitlebar = document.querySelector('.window-titlebar');
    const windowTitle = document.getElementById('windowTitle');
    const windowCloseButton = document.getElementById('windowCloseButton');
    
    const aboutContent = document.getElementById('aboutContent');
    const projectsContent = document.getElementById('projectsContent');
    
    let isResizing = false;
    let startX;
    let startY;
    let startWidth;
    let startHeight;

    // handle "cd about-nick"
    aboutTab.addEventListener('click', function() {
        aboutContent.style.display = 'block';
        projectsContent.style.display = 'none';
        prompt.textContent = default_path + "\\about-nick>";
        prompt.appendChild(cursor);
        fakeWindow.style.display = 'block';
        windowTitle.textContent = "about-nick";
    });

    // handle "cd nick-projects"
    projectsTab.addEventListener('click', function() {
        aboutContent.style.display = 'none';
        projectsContent.style.display = 'block';
        prompt.textContent = default_path + "\\nick-projects>";
        prompt.appendChild(cursor);
        fakeWindow.style.display = 'block';
        windowTitle.textContent = 'nick-projects';
    });

    windowCloseButton.addEventListener('click', closeWindow);

    function closeWindow() {
        fakeWindow.style.display = 'none';
        prompt.textContent = default_path + ">";
        prompt.appendChild(cursor);
    }
    
    // Make window draggable
    windowTitlebar.addEventListener('mousedown', startDragging);

    function startDragging(e) {
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(getComputedStyle(fakeWindow).width, 10);
        startHeight = parseInt(getComputedStyle(fakeWindow).height, 10);
        isResizing = true;
        document.addEventListener('mousemove', dragWindow);
        document.addEventListener('mouseup', stopDragging);
    }

    function dragWindow(e) {
        if (!isResizing) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        fakeWindow.style.width = startWidth + dx + 'px';
        fakeWindow.style.height = startHeight + dy + 'px';
    }

    function stopDragging() {
        isResizing = false;
        document.removeEventListener('mousemove', dragWindow);
        document.removeEventListener('mouseup', stopDragging);
    }
});
