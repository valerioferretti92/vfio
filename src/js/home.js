const detailsList = document.querySelectorAll("details");

function handleDetailToggle(event) {
  if (!event.target.open) return;

  for (let details of detailsList) {
    details.open = details === event.target;
  }
}

for (let details of detailsList) {
  details.addEventListener("toggle", handleDetailToggle);
}
