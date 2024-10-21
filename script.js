function filterData() {
  event.preventDefault();
  var startdate = new Date(document.getElementById("startdate").value);
  var enddate = new Date(document.getElementById("enddate").value);
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);

  var table = document.getElementById('data-table');
  var rows = table.getElementsByTagName('tr');

  for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
      var cells = rows[i].getElementsByTagName('td');
      if (cells.length > 0) {
          var datetimeText = cells[3].textContent; // Assuming the 4th column is Datetime
          var rowDate = new Date(datetimeText);

          if (isNaN(rowDate)) {
              // If rowDate is not a valid date, continue to the next row
              rows[i].style.display = 'none'; // Hide invalid rows
          } else {
              // Check if the row date is within the specified range
              if (rowDate >= startdate && rowDate <= enddate) {
                  rows[i].style.display = ''; // Show the row
              } else {
                  rows[i].style.display = 'none'; // Hide the row
              }
          }
      }
  }
}


async function fetchData() {
  const url = 'https://compute.samford.edu/zohauth/clients/datajson';

  try {
      const response = await fetch(url);
      const data = await response.json();

      const table = document.getElementById('data-table');

      data.forEach(item => {
          const row = table.insertRow();
          const cellId = row.insertCell(0);
          const cellSpeed = row.insertCell(1);
          const cellResult = row.insertCell(2);
          const cellDatetime = row.insertCell(3);

          cellId.innerHTML = `<a href="details.html?id=${item.id}">Pitch ${item.id}</a>`;
          cellSpeed.textContent = item.speed || '--';
          cellResult.textContent = item.result || '--';
          cellDatetime.textContent = item.datetime || '--';
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Call the fetchData function when the page loads
window.onload = fetchData;