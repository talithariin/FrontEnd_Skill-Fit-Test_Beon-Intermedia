export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatRupiah = (money) => {
  if (money !== undefined && !isNaN(money)) {
    return money.toLocaleString("id-ID");
  } else {
    return "0";
  }
};
