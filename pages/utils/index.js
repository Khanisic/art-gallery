export const camelCase = (str) => {
  var words = str.toLowerCase().split(" ");
  for (var i = 0; i < words.length; i++) {
    words[i] = capitalizeFirstLetter(words[i]);
  }
  var capitalizedString = words.join(" ");
  // if (capitalizedString.length > 20){
  //   return `${capitalizedString.slice(0,50)}...`;
  // }
  return capitalizedString;
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
