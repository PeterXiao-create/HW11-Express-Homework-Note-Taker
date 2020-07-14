const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 1024;

let notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/notes", (req, res) => {
    notes = fs.readFileSync("./db/db.json", "utf8");
    notes = JSON.parse(notes);
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    notes = fs.readFileSync("./db/db.json", "utf8");
    notes = JSON.parse(notes);
    req.body.id = notes.length;

    notes.push(req.body);
    notes = JSON.stringify(notes);
    fs.writeFileSync("./db/db.json", notes, "utf8");

    res.json(JSON.parse(notes));
});

app.delete("/api/notes/: id", (req, res) => {
    notes = fs.writeFileSync("./db/db.json", notes, "utf8");
    notes = JSON.parse(notes);

    notes = notes.filter(function(note) {
        return note.id != req.params.id
    });
    notes = JSON.stringify(notes);

    fs.writeFileSync("./db/db.json", notes, "utf8");
    res.send(JSON.parse(notes));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(__dirname, "./public/index.html");
});

app.get("/api/notes", (req, res) => {
    return res.sendFile(path.json(__dirname, "./db/db.json"));
});

app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});