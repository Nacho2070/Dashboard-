import allRows from './data.json' with {type: "json"}; 

const pageNumberInput = document.querySelector("#page-number");

const userCount = document.getElementById("countDiv")
let filteredRows = [...allRows];
let currentPage = 0;
const rowsPerPage = 10;

//Render Table
function renderTable(data) {
  const dataTable = document.getElementById("table-id");
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedRows = data.slice(startIndex, endIndex);

  let output = "";
  paginatedRows.forEach(row => {
      output += `
          <tr>
              <td>${row.id}</td>
              <td>${row.first_name}</td>
              <td>${row.last_name}</td>
              <td>${row.email}</td>
              <td>${row.gender}</td>
              <td>${row.ip_address}</td>
              <td>${row.country}</td>
          </tr>
      `;
  });
  pageNumberInput.innerHTML = currentPage
  dataTable.querySelector("tbody").innerHTML = output;
}

// Search by input
export function filterAllRows(event) {
  event.preventDefault();
  
  if(!event){
    return;
  }

  const input = document.getElementById("myInput").value.toUpperCase();
  console.log(`Buscando: ${input}`);
  
  filteredRows = allRows.filter(row => {
      return (
          row.first_name.toUpperCase().includes(input) ||
          row.last_name.toUpperCase().includes(input) ||
          row.email.toUpperCase().includes(input) ||
          row.gender.toUpperCase().includes(input) ||
          row.country.toUpperCase().includes(input) 
      );
  });
  
  console.log(`Resultados encontrados: ${filteredRows.length}`);
  currentPage = 0;
  
  const totalFound = filteredRows.length;
  userCount.innerHTML = `<h1 >Se encontraron: <b>${totalFound}</b> coincidencias</h1>`; 
  userCount.style.display = "block"
  // ResetButton
  var button =  document.getElementById("buttonReset");
  button.style.display= "block"

  renderTable(filteredRows);
};

// ResetFilter
export function resetFilter() {
  console.log("Reiniciando filtros...");
  currentPage = 0;

  filteredRows = [...allRows];
  userCount.style.display = "none"

  renderTable(allRows);
}

// Prev paginator 
document.getElementById("prev").addEventListener("click", function () {
  if (currentPage > 0) {
      currentPage--;
      renderTable(filteredRows);
  }
});

// Next Paginator
document.getElementById("next").addEventListener("click", function () {
  if ((currentPage + 1) * rowsPerPage < filteredRows.length) {
      currentPage++;
      renderTable(filteredRows);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  renderTable(filteredRows);
});



export function sortTable(columnIndex) {

  let dir = "asc";
  const tableHeader = document.querySelectorAll(".table-class th")[columnIndex];
  if (tableHeader.dataset.sortDir === "asc") {
    dir = "desc";
    tableHeader.dataset.sortDir = "desc";
  } else {
    dir = "asc";
    tableHeader.dataset.sortDir = "asc";
  }

  filteredRows.sort((a, b) => {
    const valA = Object.values(a)[columnIndex]?.toString().toLowerCase() || "";
    const valB = Object.values(b)[columnIndex]?.toString().toLowerCase() || "";

    if (dir === "asc") {
      return valA > valB ? 1 : valA < valB ? -1 : 0;
    } else {
      return valA < valB ? 1 : valA > valB ? -1 : 0;
    }
  });

  currentPage = 0;
  renderTable(filteredRows);
}

