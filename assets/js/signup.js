// frontend/js/signup.js

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Stop form from refreshing the page
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Basic validation
            if (!name || !email || !password) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            // Prepare data for sending
            const userData = {
                name: name,
                email: email,
                password: password
            };
            
            // Show loading state
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;
            
            try {
                // Send data to your backend API
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });
                
                const data = await response.json();
                
                // Check if registration was successful
                if (response.ok) {
                    // Success! Save token and user data
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    // Show success message
                    alert(`Welcome ${data.user.name}! Registration successful.`);
                    
                    // Redirect to your main page
                    window.location.href = 'index.html'; // Change to your desired page
                } else {
                    // Show error from backend
                    alert(`Registration failed: ${data.message || 'Unknown error'}`);
                }
            } catch (error) {
                // Network or server error
                console.error('Error:', error);
                alert('Cannot connect to server. Please check if backend is running.');
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});