const timeStringFormatter = (value: number) => {
  const minutes: number = value % 1;
  const hours: number = value - minutes;
  let formattedTime: string = "";

  if (minutes === 0.5 && hours === 0) {
    return "30 minutes";
  }

  formattedTime += `${hours} hour`;
  if (hours !== 1) {
    formattedTime += "s";
  }
  if (minutes !== 0) {
    formattedTime += ` and 30 minutes`;
  }

  return formattedTime;
};

export default timeStringFormatter;
