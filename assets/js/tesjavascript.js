// Menggunakan Date.now() untuk menghitung durasi
let start = Date.now();
// Simulasi operasi yang memakan waktu
for (let i = 0; i < 1000000; i++) {}
let end = Date.now();
console.log(`Durasi: ${end - start} ms`); // Output: Durasi dalam milidetik