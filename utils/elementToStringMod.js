module.exports = (element, index) => {
  return `**${index[element.slice(0, -3)].name}**: ${index[element.slice(0, -3)].desc} \n`;
}
