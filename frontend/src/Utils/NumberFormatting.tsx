export const formatLargeMonetaryNumber: any = (number: number) => {
  if (number < 0) {
      return "-" + formatLargeMonetaryNumber(-1 * number);
  }
  if (number < 1000) {
      return "$" + number;
  } else if (number >= 1000 && number < 1_000_000) {
      const result = number / 1000;
      return "$" + (result % 1 === 0 ? result.toFixed(0) : result.toFixed(1)) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
      const result = number / 1_000_000;
      return "$" + (result % 1 === 0 ? result.toFixed(0) : result.toFixed(1)) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      const result = number / 1_000_000_000;
      return "$" + (result % 1 === 0 ? result.toFixed(0) : result.toFixed(1)) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      const result = number / 1_000_000_000_000;
      return "$" + (result % 1 === 0 ? result.toFixed(0) : result.toFixed(1)) + "T";
  }
};

export const formatLargeNonMonetaryNumber: any = (number: number) => {
  if (number < 0) {
      return "-" + formatLargeNonMonetaryNumber(-1 * number);
  }
  if (number < 1000) {
      return number;
  } else if (number >= 1000 && number < 1_000_000) {
      const result = number / 1000;
      return result % 1 === 0 ? result.toFixed(0) + "K" : result.toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
      const result = number / 1_000_000;
      return result % 1 === 0 ? result.toFixed(0) + "M" : result.toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      const result = number / 1_000_000_000;
      return result % 1 === 0 ? result.toFixed(0) + "B" : result.toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      const result = number / 1_000_000_000_000;
      return result % 1 === 0 ? result.toFixed(0) + "T" : result.toFixed(1) + "T";
  }
};

export const formatRatio = (ratio: number) => {
  return (Math.round(ratio * 100) / 100).toFixed(2);
};
