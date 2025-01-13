async function getAllRecords() {
    const table = document.getElementById('tableSelect').value;
    try {
        const response = await fetch(`http://localhost:8000/api/${table}`);
        const records = await response.json();
        const recordsDiv = document.getElementById('records');
        recordsDiv.innerHTML = '';
        records.forEach(record => {
            const recordDiv = document.createElement('div');
            if (table === 'trail') {
                recordDiv.textContent = `ID: ${record.id}, Name: ${record.trail_name}, Length: ${record.trail_length}`;
            } else if (table === 'points') {
                recordDiv.textContent = `ID: ${record.id}, Trail ID: ${record.trail_id}, Latitude: ${record.latitude}, Longitude: ${record.longitude}, Elevation: ${record.elevation}`;
            }
            recordsDiv.appendChild(recordDiv);
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        alert('An error occurred while fetching records. Please try again.');
    }
}

function updateInputFields() {
    const table = document.getElementById('tableSelect').value;
    const createInputsDiv = document.getElementById('createInputs');
    const updateInputsDiv = document.getElementById('updateInputs');
    const deleteInputsDiv = document.getElementById('deleteInputs');
    createInputsDiv.innerHTML = '';
    updateInputsDiv.innerHTML = '';
    deleteInputsDiv.innerHTML = '';

    if (table === 'trail') {
        createInputsDiv.innerHTML = `
            <input type="text" id="newTrailName" placeholder="Trail Name">
            <input type="number" id="newTrailLength" placeholder="Trail Length">
        `;
        updateInputsDiv.innerHTML = `
            <input type="number" id="updateRecordId" placeholder="Record ID">
            <input type="text" id="updateTrailName" placeholder="New Trail Name">
            <input type="number" id="updateTrailLength" placeholder="New Trail Length">
        `;
        deleteInputsDiv.innerHTML = `
            <input type="number" id="deleteRecordId" placeholder="Record ID">
        `;
    } else if (table === 'points') {
        createInputsDiv.innerHTML = `
            <input type="number" id="newTrailId" placeholder="Trail ID">
            <input type="number" id="newLatitude" placeholder="Latitude">
            <input type="number" id="newLongitude" placeholder="Longitude">
            <input type="number" id="newElevation" placeholder="Elevation">
        `;
        updateInputsDiv.innerHTML = `
            <input type="number" id="updateRecordId" placeholder="Record ID">
            <input type="number" id="updateTrailId" placeholder="New Trail ID">
            <input type="number" id="updateLatitude" placeholder="New Latitude">
            <input type="number" id="updateLongitude" placeholder="New Longitude">
            <input type="number" id="updateElevation" placeholder="New Elevation">
        `;
        deleteInputsDiv.innerHTML = `
            <input type="number" id="deleteRecordId" placeholder="Record ID">
        `;
    }
}

function updateInputFieldsAndLoadRecords() {
    updateInputFields();
    getAllRecords();
}

async function createRecord() {
    const table = document.getElementById('tableSelect').value;
    let body = {};

    if (table === 'trail') {
        const trailName = document.getElementById('newTrailName').value;
        const trailLength = document.getElementById('newTrailLength').value;
        body = { trail_name: trailName, trail_length: parseFloat(trailLength) };
    } else if (table === 'points') {
        const trailId = document.getElementById('newTrailId').value;
        const latitude = document.getElementById('newLatitude').value;
        const longitude = document.getElementById('newLongitude').value;
        const elevation = document.getElementById('newElevation').value;

        body = { trail_id: parseInt(trailId), latitude: parseFloat(latitude), longitude: parseFloat(longitude), elevation: parseFloat(elevation) };
    }

    try {
        const response = await fetch(`http://localhost:8000/api/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert('Record created successfully');
            getAllRecords();
        } else {
            const errorData = await response.json();
            alert(`Failed to create record: ${JSON.stringify(errorData)}`);
        }
    } catch (error) {
        console.error('Error creating record:', error);
        alert('An error occurred while creating the record. Please try again.');
    }
}

async function updateRecord() {
    const table = document.getElementById('tableSelect').value;
    const recordId = document.getElementById('updateRecordId').value;
    let body = {};

    if (table === 'trail') {
        const trailName = document.getElementById('updateTrailName').value;
        const trailLength = document.getElementById('updateTrailLength').value;
        body = { trail_name: trailName, trail_length: parseFloat(trailLength) };
    } else if (table === 'points') {
        const trailId = document.getElementById('updateTrailId').value;
        const latitude = document.getElementById('updateLatitude').value;
        const longitude = document.getElementById('updateLongitude').value;
        const elevation = document.getElementById('updateElevation').value;
        body = { trail_id: parseInt(trailId), latitude: parseFloat(latitude), longitude: parseFloat(longitude), elevation: parseFloat(elevation) };
    }

    try {
        const response = await fetch(`http://localhost:8000/api/${table}/${recordId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert('Record updated successfully');
            getAllRecords();
        } else {
            alert('Failed to update record');
        }
    } catch (error) {
        console.error('Error updating record:', error);
        alert('An error occurred while updating the record. Please try again.');
    }
}

async function deleteRecord() {
    const table = document.getElementById('tableSelect').value;
    const recordId = document.getElementById('deleteRecordId').value;

    try {
        const response = await fetch(`http://localhost:8000/api/${table}/${recordId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Record deleted successfully');
            getAllRecords();
        } else {
            alert('Failed to delete record');
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        alert('An error occurred while deleting the record. Please try again.');
    }
}

// Initialize input fields and load records on page load
document.addEventListener('DOMContentLoaded', updateInputFieldsAndLoadRecords);