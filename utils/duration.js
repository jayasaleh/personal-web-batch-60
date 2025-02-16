function countTimeProjectEnd(end, start) {
  const distance = new Date(end) - new Date(start);
  // let diffInYear= Math.floor(distance/(12*30*24*60*1000));
  // if (diffInYear>0){
  //   return diffInYear + (diffInYear === 1 ? "Year Ago" : "Years Ago");
  // }
  let diffInMonth = Math.floor(distance / (30 * 24 * 60 * 60 * 1000));

  //menghitung sisa hari dari bulan
  let leftdays = Math.floor(
    (distance % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
  );
  if (diffInMonth > 0) {
    if (leftdays > 0) {
      return (
        diffInMonth +
        (diffInMonth === 1 ? " Month " : " Months ") +
        leftdays +
        (leftdays === 1 ? " Day Ago " : " Days Ago ")
      );
    }
    return diffInMonth + (diffInMonth === 1 ? " Month Ago" : " Months Ago");
  }

  let diffInDays = Math.floor(distance / (24 * 60 * 60 * 1000));
  if (diffInDays > 0) {
    return diffInDays + (diffInDays === 1 ? " day Ago" : " days Ago");
  } else {
    return "less than 1 day";
  }
}
function formatDateStartEnd(dateString) {
  let date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return ""; // Jika tanggal tidak valid, kembalikan string kosong
  }

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Tambahkan 0 jika perlu
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(a) {
  // Konversi ke objek Date
  let date = new Date(a);

  // Array nama hari dan bulan
  let hari = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];
  let bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  // Ambil komponen tanggal
  let namaHari = hari[date.getDay()];
  let tanggal = date.getDate();
  let namaBulan = bulan[date.getMonth()];
  let tahun = date.getFullYear();

  // Tampilkan hasil
  let hasil = `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
  return hasil;
}
function techValue(check) {
  if (check == "on") {
    return "";
  } else {
    return "none";
  }
}
module.exports = {
  countTimeProjectEnd,
  techValue,
  formatDateStartEnd,
  formatDate,
};
