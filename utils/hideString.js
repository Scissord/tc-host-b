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

  // Убираем пробелы
  const noSpacesStr = str.replace(/\s+/g, '');

  // Заменяем последовательности из 7 и более цифр на '***'
  const hiddenPhoneStr = noSpacesStr.replace(/\d{7,}/g, '***');

  return hiddenPhoneStr;
}
