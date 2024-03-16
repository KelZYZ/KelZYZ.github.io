document.getElementById('homeworkForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const imageFile = document.getElementById('imageFile').files[0];
    const caption = document.getElementById('caption').value;

    if (!imageFile) {
        alert('Please select an image file.');
        return;
    }

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('caption', caption);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Homework uploaded successfully:', data);
            fetchHomework(); // Reload homework after successful upload
        } else {
            alert('Failed to upload homework: ' + data.message);
        }
    } catch (error) {
        console.error('Error uploading homework:', error);
        alert('Error uploading homework. Please try again later.');
    }
});

// Function to fetch and display homework from the server
async function fetchHomework() {
    try {
        const response = await fetch('/api/homework');
        const homeworkData = await response.json();
        if (response.ok) {
            // Display homework data on the page
            displayHomework(homeworkData);
        } else {
            console.error('Failed to fetch homework:', homeworkData.message);
        }
    } catch (error) {
        console.error('Error fetching homework:', error);
    }
}

// Function to display homework on the page
function displayHomework(homeworkData) {
    const homeworkList = document.getElementById('homeworkList');
    homeworkList.innerHTML = '';
    homeworkData.forEach(homework => {
        const listItem = document.createElement('div');
        listItem.classList.add('homework-item');
        listItem.innerHTML = `
            <img src="${homework.imageUrl}" alt="Homework Image">
            <p>${homework.caption}</p>
        `;
        homeworkList.appendChild(listItem);
    });
}

// Fetch homework when the page loads
window.onload = fetchHomework;
