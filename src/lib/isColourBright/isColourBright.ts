function isColourBright(hexColor: string): boolean {
  // Remove the hash from the hex color if it exists
  hexColor = hexColor.replace("#", "");

  // Convert the hex color to RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // If the brightness is less than 128, the color is dark, otherwise it's bright

  return brightness >= 128;
}

export default isColourBright;
