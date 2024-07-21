import dayjs from "dayjs";

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

export const formatDate = (date) => {
  return date ? dayjs(date).format("DD MMM YYYY") : "-";
};

export const renderMaritalStatus = (status) => {
  switch (status) {
    case "married":
      return "Menikah";
    case "single":
      return "Belum Menikah";
    default:
      return "-";
  }
};

export const renderResidentStatus = (status) => {
  switch (status) {
    case "permanent":
      return "Tetap";
    case "contract":
      return "Kontrak";
    default:
      return "-";
  }
};

export const renderHouseStatus = (status) => {
  switch (status) {
    case "occupied":
      return "Dihuni";
    case "unoccupied":
      return "Tidak Dihuni";
    default:
      return "-";
  }
};

export const renderPaymentPeriod = (period) => {
  switch (period) {
    case "once":
      return "Sekali";
    case "monthly":
      return "Bulanan";
    case "yearly":
      return "Tahunan";
    default:
      return "-";
  }
};

export const renderPaymentStatus = (status) => {
  switch (status) {
    case "paid":
      return "Dibayar";
    case "unpaid":
      return "Belum Dibayar";
    default:
      return "-";
  }
};
