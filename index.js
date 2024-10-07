class Course {
    constructor(name, code) {
        this.name = name;
        this.code = code;
        this.students = [];
    }

    enrollStudent(studentName) {
        this.students.push(studentName);
    }

    displayCourseInfo() {
        return `
            <strong>Course Name:</strong> ${this.name} <br>
            <strong>Course Code:</strong> ${this.code} <br>
            <strong>Enrolled Students:</strong> ${this.students.join(', ') || 'No students enrolled'}<br>
            <hr>
        `;
    }
}

class CourseManager {
    constructor() {
        this.courses = [];
    }

    addCourse(name, code) {
        const course = new Course(name, code);
        this.courses.push(course);
        this.updateCourseSelect();
        this.displayCourses();
    }

    enrollStudent(courseCode, studentName) {
        const course = this.courses.find(c => c.code === courseCode);
        if (course) {
            course.enrollStudent(studentName);
            this.displayCourses();
        }
    }

    updateCourseSelect() {
        const courseSelect = document.getElementById('courseSelect');
        courseSelect.innerHTML = '<option value="">Select Course</option>';
        this.courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.code;
            option.textContent = `${course.name} (${course.code})`;
            courseSelect.appendChild(option);
        });
    }

    displayCourses() {
        const courseListDiv = document.getElementById('courseList');
        courseListDiv.innerHTML = '';

        this.courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.innerHTML = course.displayCourseInfo();
            courseListDiv.appendChild(courseDiv);
        });
    }
}

const courseManager = new CourseManager();

function addCourse() {
    const courseName = document.getElementById('courseName').value;
    const courseCode = document.getElementById('courseCode').value;

    if (courseName && courseCode) {
        courseManager.addCourse(courseName, courseCode);
        document.getElementById('courseName').value = '';
        document.getElementById('courseCode').value = '';
    } else {
        alert("Please fill in both the course name and code.");
    }
}


function enrollStudent() {
    const studentName = document.getElementById('studentName').value;
    const courseCode = document.getElementById('courseSelect').value;

    if (studentName && courseCode) {
        courseManager.enrollStudent(courseCode, studentName);
        document.getElementById('studentName').value = '';
    } else {
        alert("Please select a course and enter a student's name.");
    }
}
