module.exports = (element, index) => {
  if (index[element.slice(0, -3)].hidden === true) return null;
  else return `**${index[element.slice(0, -3)].name}**: ${index[element.slice(0, -3)].desc} \n`;
}