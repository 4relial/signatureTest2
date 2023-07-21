const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Jika Anda memiliki file JavaScript terpisah atau file CSS dalam folder 'public'

app.get('/', (req, res) => {
  res.render('index');
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
      format: 'Letter',
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
    });
  });
});

// ... (Bagian lain dari kode Anda)

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
