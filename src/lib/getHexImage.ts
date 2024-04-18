
const hexToRgb = (hex: string) => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
};


export const getHexImage = (hex: string) => {
    // Remove the '0x' prefix if present
    hex = hex.replace(/^0x/, '');
  
    // Calculate the dimensions of the image based on the hex data length
    const dataLength = hex.length;
    const width = Math.ceil(Math.sqrt(dataLength / 6));
    const height = Math.ceil(dataLength / (width * 6));
  
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Iterate over the hex data and set pixel colors
    for (let i = 0; i < dataLength; i += 6) {
      const hexColor = hex.substring(i, i + 6);
      const { r, g, b } = hexToRgb(hexColor);
      const x = (i / 6) % width;
      const y = Math.floor((i / 6) / width);
      
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x, y, 1, 1);
    }
  
    // Return the data URL of the canvas
    return canvas.toDataURL();
};