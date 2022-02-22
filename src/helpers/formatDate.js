const formatDate = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const fullDate = new Date(date);
  const day = fullDate.getDay();
  const dateNumber = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  return `${days[day]} ${dateNumber} ${months[month]} ${year}`;
}

export default formatDate;