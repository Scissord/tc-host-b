export default function hideString(string) {
  const str = String(string);

  const maskLength = Math.ceil(str.length * 0.4);

  const visiblePart = str.slice(0, str.length - maskLength);

  const maskedPart = '*'.repeat(maskLength);

  return visiblePart + maskedPart;
};
