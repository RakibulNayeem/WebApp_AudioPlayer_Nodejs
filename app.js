const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// Serving static files (e.g., MP3 files)
app.use(express.static('public'));

// Endpoint for streaming the specified MP3 file
app.get('/', (req, res) => {
  const mp3FileName = 'SurahAsSajdah'; // Replace with your actual MP3 file name
  const filePath = `public/${mp3FileName}.mp3`;

  // Check if the file exists before attempting to stream
  if (fs.existsSync(filePath)) {
    // Set content type to audio/mpeg
    res.setHeader('Content-Type', 'audio/mpeg');

    // Set Content-Disposition header to force download (optional)
    res.setHeader('Content-Disposition', `attachment; filename=${mp3FileName}.mp3`);

    // Create a readable stream from the file
    const stream = fs.createReadStream(filePath);

    // Pipe the stream to the response
    stream.pipe(res);

    // Log when the streaming is finished
    stream.on('close', () => {
      console.log(`Streaming finished: ${mp3FileName}.mp3`);
    });
  } else {
    // Return a 404 status if the file does not exist
    console.error(`File ${mp3FileName}.mp3 not found`);
    res.status(404).send(`File ${mp3FileName}.mp3 not found`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
