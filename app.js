const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Jika Anda memiliki file JavaScript terpisah atau file CSS dalam folder 'public'

app.get('/', (req, res) => {
  res.render('index');
});

// ... (Bagian lain dari kode Anda)
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const { name, date, description, signature } = req.body;
  // Lakukan apa pun yang Anda inginkan dengan data yang diinputkan, termasuk tanda tangan.
  // Misalnya, Anda bisa menyimpannya di database atau menampilkannya di halaman lain.

  // Contoh untuk menampilkan data yang diinputkan
  console.log(signature);
  res.render('submit', { name, date, description, signature });
});

app.post('/submit', (req, res) => {
  const { name, date, description, signature } = req.body;
  // Lakukan apa pun yang Anda inginkan dengan data yang diinputkan, termasuk tanda tangan.
  // Misalnya, Anda bisa menyimpannya di database atau menampilkannya di halaman lain.

  // Contoh untuk menampilkan data yang diinputkan
  console.log(signature)
  res.send(`
    <h2>Data yang diinputkan:</h2>
    <p><strong>Nama:</strong> ${name}</p>
    <p><strong>Tanggal:</strong> ${date}</p>
    <p><strong>Deskripsi:</strong> ${description}</p>
    <h2>Tanda Tangan:</h2>
    <img src="${signature}" alt="Tanda Tangan">
  `);
});

// ... (Bagian lain dari kode Anda)

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
