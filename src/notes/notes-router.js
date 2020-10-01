const express = require('express')
const xss = require('xss')
const path = require('path')
const NoteService = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNotes = note => ({
  id: note.id,
  name: xss(note.note_name),
  content: xss(note.content),
  modified: note.modified,
  folderid: note.folderid
})

notesRouter
.route('/')
.get((req, res, next) => {
  NoteService.getAllNotes(
    req.app.get('db')
  )
  .then(notes => {
    res.json(notes.map(serializeNotes))
  })
  .catch(next)
})
.post(jsonParser, (req, res, next) => {
  console.log(req.body, 'what is here')
  const { name, content, folderId } = req.body
  const newNote = { note_name: name, content, folderid: folderId}

  if (!name) {
    return res.status(400).json({
      error: { message: `Missing name in request body`}
    })
  }

  NoteService.insertNote(
    req.app.get('db'),
    newNote
  )
    .then(note => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${note.id}`))
        .json(serializeNotes(note))
    })
    .catch(next)
})

notesRouter
  .route('/:note_id')
  .all((req, res, next) => {
    NoteService.getById(req.app.get('db'), req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Note doesn't exist` }
          })
        }
        res.note = note
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    res.json(serializeNotes(res.note))
  })

  .delete((req, res, next) => {
    NoteService.deleteNotes(
      req.app.get('db'),
      req.params.note_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { note_name, content } = req.body
    const noteToUpdate = {note_name, content}

    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must contain either 'name' or 'content'`
          }
        })
      
        NoteService.updateNotes(
          req.app.get('db'),
          req.params.note_id,
          noteToUpdate
        )
          .then(numRowsAffected => {
            res.status(204).end()
          })
          .catch(next)
  })

module.exports = notesRouter