function countTimeProjectEnd(end, start) {
  const distance = new Date(end) - new Date(start);
  // let diffInYear= Math.floor(distance/(12*30*24*60*1000));
  // if (diffInYear>0){
  //   return diffInYear + (diffInYear === 1 ? "Year Ago" : "Years Ago");
  // }
  let diffInMonth = Math.floor(distance / (30 * 24 * 60 * 60 * 1000));
  let leftdays =
    (distance % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000);
  if (diffInMonth > 0) {
    if (leftdays > 0) {
      return (
        diffInMonth +
        (diffInMonth === 1 ? " Month Ago " : " Months Ago ") +
        leftdays +
        (leftdays === 1 ? " Day Ago" : " Days Ago")
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
function formatDate(a) {
  // Konversi ke objek Date
  let date = new Date(a);

  // Array nama hari dan bulan
  let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
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
  formatDate,
};
