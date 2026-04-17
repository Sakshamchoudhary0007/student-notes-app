const router = require("express").Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  const note = new Note({
    userId: req.user.id,
    title: req.body.title,
    content: req.body.content,
  });

  await note.save();
  res.json(note);
});

// READ
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

//Update
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );

    res.json(updatedNote);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;