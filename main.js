import { filterAllRows,resetFilter,sortTable } from "./Filters.js"

// SearchInput
document.getElementById("searchForm").addEventListener("submit",(event)=>(
    filterAllRows(event)
))

// ResetButton
document.getElementById("buttonReset").addEventListener("click", () => {
    resetFilter();
});

//Sorting
document.getElementById("countryFilter").addEventListener("click", () => {
    console.log("Sorting by Country");
    sortTable(6);
  });
  
document.getElementById("nameFilter").addEventListener("click", () => {
    console.log("Sorting by Name");
    sortTable(1);
});