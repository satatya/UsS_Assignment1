if (!localStorage.getItem('users')) {
  const defaultUsers = [
    {
      fullName: 'Satatya',
      enrollment: 'satatya',
      course: 'computer-science-engineering',
      department: 'computer-science-engineering',
      year: '1',
      institute: 'IIITD',
      email: 'satatya@iiitd.ac.in',
      password: '1234'
    }
  ];
  localStorage.setItem('users', JSON.stringify(defaultUsers));
}

// Function to get current user's grievance key
function getUserKey() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    navigateTo('login-page');
    return null;
  }
  return `${currentUser}_grievances`;
}

// Load grievances from localStorage on page load
function loadGrievances() {
  const key = getUserKey();
  if (!key) return;
  const grievances = JSON.parse(localStorage.getItem(key) || '[]');
  const tableBody = document.getElementById('grievance-table-body');
  tableBody.innerHTML = '';
  grievances.forEach(grievance => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>#${grievance.id}</td>
      <td>${grievance.category}</td>
      <td>${grievance.description.substring(0, 20)}${grievance.description.length > 20 ? '...' : ''}</td>
      <td>${grievance.status}</td>
      <td>${grievance.date}</td>
      <td>${grievance.anonymous ? 'Yes' : 'No'}</td>
      <td>${grievance.priority ? grievance.priority.charAt(0).toUpperCase() + grievance.priority.slice(1) : 'N/A'}</td>
    `;
    tableBody.appendChild(row);
  });
}

function navigateTo(pageId) {
  document.querySelectorAll('.card').forEach(card => card.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
  if (pageId === 'dashboard') loadGrievances();
}

// Login handler
function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const error = document.getElementById('login-error');

  if (!username || !password) {
    error.textContent = 'Please enter both enrollment number and password.';
    error.classList.remove('hidden');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.enrollment === username && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', username);
    error.classList.add('hidden');
    navigateTo('dashboard');
  } else {
    error.textContent = 'Invalid enrollment number or password.';
    error.classList.remove('hidden');
  }
}

// Registration handler
function submitRegistration() {
  const fullName = document.getElementById('full-name').value;
  const enrollment = document.getElementById('enrollment').value;
  const course = document.getElementById('course').value;
  const department = document.getElementById('department').value;
  const year = document.getElementById('year').value;
  const institute = document.getElementById('institute').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const error = document.getElementById('reg-error');

  if (!fullName || !enrollment || !course || !department || !year || !institute || !email || !password || !confirmPassword) {
    error.textContent = 'Please fill all required fields.';
    error.classList.remove('hidden');
    return;
  }

  if (password !== confirmPassword) {
    error.textContent = 'Passwords do not match.';
    error.classList.remove('hidden');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.enrollment === enrollment)) {
    error.textContent = 'Enrollment number already registered.';
    error.classList.remove('hidden');
    return;
  }

  const newUser = {
    fullName,
    enrollment,
    course,
    department,
    year,
    institute,
    email,
    password
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registered successfully! Please login with your enrollment number and password.');
  document.getElementById('full-name').value = '';
  document.getElementById('enrollment').value = '';
  document.getElementById('course').value = '';
  document.getElementById('department').value = '';
  document.getElementById('year').value = '';
  document.getElementById('institute').value = '';
  document.getElementById('email').value = '';
  document.getElementById('reg-password').value = '';
  document.getElementById('confirm-password').value = '';
  error.classList.add('hidden');
  navigateTo('login-page');
}

// Submit grievance and store in localStorage for current user
function submitGrievance() {
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const priority = document.getElementById('priority').value;
  const anonymous = document.getElementById('anonymous').checked;
  const error = document.getElementById('form-error');
  const key = getUserKey();
  if (!key) return;

  if (!category || !description || !priority) {
    error.classList.remove('hidden');
    return;
  }

  error.classList.add('hidden');
  const grievances = JSON.parse(localStorage.getItem(key) || '[]');
  const newGrievance = {
    id: Math.floor(10000 + Math.random() * 90000),
    category,
    description,
    priority,
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
    anonymous
  };
  grievances.push(newGrievance);
  localStorage.setItem(key, JSON.stringify(grievances));
  alert(`Grievance submitted successfully! ID: #${newGrievance.id}`);
  document.getElementById('category').value = '';
  document.getElementById('description').value = '';
  document.getElementById('priority').value = '';
  document.getElementById('anonymous').checked = false;
  navigateTo('dashboard');
}

// Submit anonymous grievance
function submitAnonymousGrievance() {
  const category = document.getElementById('anon-category').value;
  const description = document.getElementById('anon-description').value;
  const priority = document.getElementById('anon-priority').value;
  const error = document.getElementById('anon-form-error');

  if (!category || !description || !priority) {
    error.classList.remove('hidden');
    return;
  }

  error.classList.add('hidden');
  const newGrievance = {
    id: Math.floor(10000 + Math.random() * 90000),
    category,
    description,
    priority,
    status: 'Submitted Anonymously',
    date: new Date().toISOString().split('T')[0],
    anonymous: true
  };
  alert(`Anonymous grievance submitted successfully! ID: #${newGrievance.id}. You are being redirected to the login page.`);
  document.getElementById('anon-category').value = '';
  document.getElementById('anon-description').value = '';
  document.getElementById('anon-priority').value = '';
  navigateTo('login-page');
}

// Logout handler
function logout() {
  localStorage.removeItem('currentUser');
  navigateTo('login-page');
}

// Initialize with login page
navigateTo('login-page');
