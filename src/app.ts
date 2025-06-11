import express from "express";

const app = express();

app.use(express.json()); // Middleware für JSON-Parsing

// /api/login POST-Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Beispiel-Dummy-Logik
  if (username === 'testuser' && password === '12345') {
    res.status(200).json({ message: 'Login erfolgreich!' });
  } else {
    res.status(401).json({ message: 'Ungültige Anmeldedaten.' });
  }
});

app.get("/", (_, res) => {
  res.send("Hello express");
});

app.listen(80);
console.log("Server started at http://localhost:80");
