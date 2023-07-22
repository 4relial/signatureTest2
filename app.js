const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const db = require('./utils/mongo')

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Jika Anda memiliki file JavaScript terpisah atau file CSS dalam folder 'public'

app.get('/tambah', (req, res) => {
  res.render('tambah');
});

app.get('/details', (req, res) => {
  const id = req.query.id;
  db.getData(id)
    .then(data => {
      console.log(data)
      let name = data.nama
      let date = data.tanggal
      let description = data.deskripsi
      let signature = data.signature
      res.render('preview', { name, date, description, signature })
    })
});

app.get('/', (req, res) => {
  db.allData()
    .then(response => {
      console.log(response)
      res.render('data', { data: response })
    })
});

// ... (Bagian lain dari kode Anda)
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  let { name, date, description, signature } = req.body;

  description = description.replace(/\n/g, "<br>");
  // Rendering the 'submit' template with the data
  res.render('submit', { name, date, description, signature }, (err, html) => {
    if (err) {
      console.error('Error rendering HTML:', err);
      return res.status(500).send('Error generating PDF');
    }

    // PDF options (you can customize these as needed)
    const pdfOptions = {
      format: 'a4',
      orientation: 'portrait',
      border: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    };

    // Generate PDF from the HTML content
    pdf.create(html, pdfOptions).toStream((err, pdfStream) => {
      if (err) {
        console.error('Error generating PDF:', err);
        return res.status(500).send('Error generating PDF');
      }

      // Set the appropriate headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

      // Pipe the PDF stream to the response
      pdfStream.pipe(res);
      db.tambahData(name, date, description, signature)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
    });
  });
});

app.post('/preview', (req, res) => {
  let { name, date, description, signature } = req.body;

  description = description.replace(/\n/g, "<br>");
  // Rendering the 'submit' template with the data
  res.render('preview', { name, date, description, signature })
});

// ... (Bagian lain dari kode Anda)

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
