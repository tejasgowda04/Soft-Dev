document.addEventListener('DOMContentLoaded', function() {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('softDevUser'));
    
    // Get course from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course') || 'fullstack';
    
    // Update user profile
    if (userData) {
        // Set user name
        document.querySelectorAll('.user-name').forEach(el => {
            el.textContent = userData.name;
        });
        
        // Set user avatar (you can enhance this later)
        document.querySelectorAll('.user-avatar').forEach(el => {
            el.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=4f46e5&color=fff`;
        });
        
        // Set enrolled course
        if (userData.enrolledCourse) {
            document.querySelector('.course-title').textContent = userData.enrolledCourse;
        }
    }
    
    // Set course-specific content
    setCourseContent(courseId);
});

function setCourseContent(courseId) {
    const courses = {
        'ai-ml': {
            title: 'AI & Machine Learning Masterclass',
            description: 'Learn to build intelligent systems with Python and TensorFlow from scratch.',
            modules: [
                'Module 1: Python for Data Science',
                'Module 2: Machine Learning Fundamentals',
                'Module 3: Deep Learning with TensorFlow'
            ],
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        'fullstack': {
            title: 'Full Stack Web Development',
            description: 'Master MERN stack and build complete web applications with React and Node.js',
            modules: [
                'Module 1: Frontend with React',
                'Module 2: Backend with Node.js',
                'Module 3: Database Integration'
            ],
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        // Add other courses similarly
    };
    
    const course = courses[courseId] || courses['fullstack'];
    
    // Update course content
    document.querySelector('.course-hero-image').src = course.image;
    document.querySelector('.course-title').textContent = course.title;
    document.querySelector('.course-description').textContent = course.description;
    
    // Update modules
    const modulesContainer = document.querySelector('.course-modules');
    modulesContainer.innerHTML = '';
    
    course.modules.forEach((module, index) => {
        const status = index === 0 ? 'Completed' : (index === 1 ? 'In Progress' : 'Not Started');
        const statusClass = index === 0 ? 'bg-green-100 text-green-800' : 
                          (index === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800');
        
        modulesContainer.innerHTML += `
            <div class="module-card bg-white rounded-xl shadow-md border border-gray-100 transition duration-300 overflow-hidden">
                <div class="flex items-center justify-between p-6">
                    <div class="flex items-center">
                        <div class="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                            <i class="fas fa-play text-indigo-600"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-900">${module}</h4>
                            <p class="text-gray-600 text-sm">${index + 3} Lessons • ${25 + (index * 5)} Hours</p>
                        </div>
                    </div>
                    <div>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClass}">
                            ${status}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
}