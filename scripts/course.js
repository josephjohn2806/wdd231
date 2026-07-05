const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces development using basic programming tools to think computationally.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students design and construct functional sites implementing proper web architecture patterns.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Extends knowledge from programming principles focusing on procedural and functional code block designs.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Introduces encapsulation, polymorphism, inheritance, and object orientation architectures.',
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on structural elements using intermediate CSS selectors alongside native DOM-driven JavaScript implementations.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Deep dive focus building responsive frontend frameworks, performance optimization, and dynamic external data interactions.',
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('course-container');
    const totalCreditsEl = document.getElementById('total-credits');
    
    function displayCourses(filteredCourses) {
        // Clear old content nodes from view grid
        courseContainer.innerHTML = '';
        
        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.classList.add('course-card');
            
            // Mark completed items uniquely
            if (course.completed) {
                card.classList.add('completed');
            }
            
            card.innerHTML = `<span>${course.subject} ${course.number}</span>`;
            courseContainer.appendChild(card);
        });

        // Use array reduce to add up your dynamic credits count
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsEl.textContent = totalCredits;
    }

    // Set up filter actions
    document.getElementById('btn-all').addEventListener('click', (e) => {
        setActiveButton(e.target);
        displayCourses(courses);
    });

    document.getElementById('btn-wdd').addEventListener('click', (e) => {
        setActiveButton(e.target);
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddCourses);
    });

    document.getElementById('btn-cse').addEventListener('click', (e) => {
        setActiveButton(e.target);
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseCourses);
    });

    function setActiveButton(activeBtn) {
        document.querySelectorAll('.filter-buttons .btn').forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    // Baseline render trigger
    displayCourses(courses);
});

