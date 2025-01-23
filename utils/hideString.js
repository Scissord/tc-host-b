// export default function hideString(string) {
//   const str = String(string);

//   const maskLength = Math.ceil(str.length * 0.4);

//   const visiblePart = str.slice(0, str.length - maskLength);

//   const maskedPart = '*'.repeat(maskLength);

//   return visiblePart + maskedPart;
// };

export function hideString(string) {
  const str = String(string);

  const maskLength = str.length;

  const maskedPart = '*'.repeat(maskLength);

  return maskedPart;
};


export function hidePhoneInComment(string) {
  const str = String(string);

  const spaceIndexes = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      spaceIndexes.push(i);
    }
  }
  const noSpacesStr = str.replace(/\s+/g, '');

  const hiddenPhoneStr = noSpacesStr.replace(/\d{7,}/g, '***');

  let result = hiddenPhoneStr.split('');
  for (const index of spaceIndexes) {
    result.splice(index, 0, ' ');
  }

  return result.join('');
}

