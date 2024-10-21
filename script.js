function filterData () {
  event.preventDefault () ;
  var startdate = document.getElementById ("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log ("Starting date: " + startdate);
  console.log("Ending date: " + enddate);
  fetch("https://compute.samford.edu/zohauth/client/data");
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