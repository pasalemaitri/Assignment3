//Title constructor function that creates a Title object
var table = document.getElementById('myTable');
var headers = table.rows[0].cells.length;
function studentCount() {
	var studentCount = 0;

	for (var i = 1; i < table.rows.length; i += 2) {
		var tableCell = table.rows[i].cells[1]; 
		if (tableCell) {
			var rowData = tableCell.textContent.trim().match(/\d+/);
			if (rowData && parseInt(rowData[0]) > studentCount) {
				studentCount = parseInt(rowData[0]);
			}
		}
	}

	return studentCount;
}
var isAddingStudent = false;
function addStudentRows(){
    if (isAddingStudent) {
        return;
    }

    isAddingStudent = true;
	var studentNumber = Math.floor((table.rows.length - 1) / 2) + 1;
	var newRowData = [
        "<input type='checkbox' class='check' onclick='changeColor(this)'/>" +
        "<br />" +
        "<img src='down.png' onclick='viewInfo(this)' width='25px'/>",
        "Student " + (studentNumber), 
        "Teacher " + (studentNumber), 
        "Approved",
        "Fall",
        "TA",
        "45678",
        "100%"
    ];

    var toggle_data = ["<td class='textdrop'colspan='8'>" +
        "Advisor:<br /><br />" +
        "Award Details<br />" +
        "Summer 1-2014(TA)<br />" +
        "Budget Number: <br />" +
        "Tuition Number: <br />" +
        "Comments:<br /><br /><br />" +
        "Award Status:<br /><br /><br />" +
        "</td>"
    ];

    alert("Student "+(studentNumber)+" record added successfully");

    var row = table.insertRow(-1); 
    var rowId = table.rows.length - 1;
    row.id = rowId;

    for (var i = 0; i < headers; i++) {
        var col = row.insertCell(i);
        col.innerHTML = newRowData[i];
    }

    var toggleRow = table.insertRow(-1);
    var toggleRowId = table.rows.length - 1;
    toggleRow.id = toggleRowId;
    var toggleCol = toggleRow.insertCell(-1);
    toggleCol.innerHTML = toggle_data;

    isAddingStudent = false;
}




function changeColor(element){
	var selected_element = element.closest('tr');
	var id = selected_element.getAttribute('id');
	if(selected_element.getElementsByTagName('input')[0].checked == true){
		if(table.rows[0].cells.length<=headers){
			var deleteColumn = table.rows[0].insertCell(-1);
			deleteColumn.innerHTML="DELETE".fontcolor("white");
			deleteColumn.style.fontWeight = "Bold";
			deleteColumn.style.backgroundColor="#a7c942";
			var editColumn = table.rows[0].insertCell(-1);
			editColumn.innerHTML="EDIT".fontcolor("white");
			editColumn.style.fontWeight = "Bold";
			editColumn.style.backgroundColor="#a7c942";
			
			
		}
		selected_element.style.backgroundColor = "Yellow";
		var col = selected_element.insertCell(-1);
		col.innerHTML = "<input type='button' class='btn' name='del_but' onclick='delete_data(this)' value='Delete'/>"
		var col = selected_element.insertCell(-1);
		col.innerHTML = "<input type='button' class='btn' name='edit_but' onclick='editStudent(this)' value='Edit'/>"
		submitbtn = document.getElementById('submitbtn');
		submitbtn.disabled = false;
		submitbtn.style.backgroundColor = "orange";
	}else if(selected_element.getElementsByTagName('input')[0].checked == false){
		selected_element.style.backgroundColor = "";
		selected_element.deleteCell(-1);
		selected_element.deleteCell(-1);
		removeDeleteColumn();
		removeEditColumn();
	}

}

function removeDeleteColumn(){
	var deleteBtn = document.getElementsByName("del_but");
	if(deleteBtn.length == 0){
		table.rows[0].deleteCell(-1);
		submitbtn.disabled = true;
		submitbtn.style.backgroundColor = "";

	}

}
function removeEditColumn(){
	var EditBtn = document.getElementsByName("edit_but");
	if(EditBtn.length == 0){
		table.rows[0].deleteCell(-1);
		submitbtn.disabled = true;
		submitbtn.style.backgroundColor = "";

	}

}


function delete_data(element){
	var delete_row = element.closest('tr');
	var id = delete_row.getAttribute('id');
	var studentName = delete_row.cells[1].textContent.trim(); 

    // Confirm the deletion and display a message
    if (confirm("Are you sure you want to delete the record for " + studentName + "?")) {
        delete_row.parentNode.removeChild(delete_row); // Delete the row

        // Remove the "DELETE" button if no rows are selected
        removeDeleteColumn();
        removeEditColumn();

        // Display a success message
        alert(studentName + " Record deleted successfully");
    }
}
function editStudent(element) {
    var edit_row = element.closest('tr');
    var id = edit_row.getAttribute('id');

    // Get student details from the selected row
    var studentDetails = [];
    for (var i = 1; i <= headers; i++) {
        var cellContent = edit_row.cells[i].textContent.trim(); // Remove leading/trailing whitespace
        if (cellContent !== "") {
            studentDetails.push(cellContent);
        }
    }

    // Create a modal pop-up
    var modal = document.createElement('div');
    modal.classList.add('modal');
    
    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Create a title for the modal
    var modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Edit details of ' + studentDetails[0] +":";

    var detailsContainer = document.createElement('div');
    detailsContainer.classList.add('student-details');

    // Populate the detailsContainer with formatted student details
    var detailsText = "Student Name: " + studentDetails[0]+"\n" +
                      "Advisor Name: " + studentDetails[1] + "\n" +
                      "Award Status: " + studentDetails[2] + "\n" +
                      "Semester: " + studentDetails[3] + "\n" +
                      "Award Type: " + studentDetails[4] + "\n" +
                      "Budget Number: " + studentDetails[5] + "\n" +
                      "Percentage: " + studentDetails[6] + "\n\n";
    var detailsTextElement = document.createElement('pre');
    detailsTextElement.textContent = detailsText;
    detailsContainer.appendChild(detailsTextElement);	
    // Create an "Update" button
    var updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.onclick = function () {
        modal.style.display = 'none';
        alert(studentDetails[0] + ' data updated successfully');
    };

    // Create a "Cancel" button
    var cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = function () {
        modal.style.display = 'none';
    };

    // Append elements to the modalContent
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(detailsContainer);
    modalContent.appendChild(updateButton);
    modalContent.appendChild(cancelButton);

    // Append modalContent to the modal
    modal.appendChild(modalContent);

    // Append the modal to the document body
    document.body.appendChild(modal);

    // Display the modal
    modal.style.display = 'block';
}


function viewInfo(selected_row){
	var row = selected_row.closest('tr');
	var id = row.getAttribute('id');
	var show_details = document.getElementById(parseInt(id)+1);
	if(show_details.style.display == "none"){
		show_details.style.display = "block";
	}else{
		show_details.style.display = "none";
	}
	
}