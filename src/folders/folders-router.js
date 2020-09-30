const express = require('express')
const xss = require('xss')
const path = require('path')
const FoldersService = require('./folders-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolders = folder => ({
  id: folder.id,
  name: xss(folder.name),
  
})

foldersRouter
.route('/')
.get((req, res, next) => {
  FoldersService.getAllFolderss(
    req.app.get('db')
  )
  .then(folders => {
    res.json(folders.map(serializeFolders))
  })
  .catch(next)
})
.post(jsonParser, (req, res, next) => {
  const { name } = req.body
  const newFolders = { name }

  if (name == null) {
    return res.status(400).json({
      error: { message: `Missing name in request body`}
    })
  }

  FoldersService.insertFolders(
    req.app.get('db'),
    newFolders
  )
    .then(folder => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${folder.id}`))
        .json(serializeFolders(folder))
    })
    .catch(next)
})

foldersRouter
  .route('/:folder_id')
  .all((req, res, next) => {
    FoldersService.getById(req.app.get('db'), req.params.folder_id)
      .then(folder => {
        if (!folder) {
          return res.status(404).json({
            error: { message: `Folders doesn't exist` }
          })
        }
        res.folder = folder
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    res.json(serializeFolders(res.folder))
  })

  .delete((req, res, next) => {
    FoldersService.deleteFolderss(
      req.app.get('db'),
      req.params.folder_id
    )
      .then(numRoesAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { name } = req.body
    const folderToUpdate = {name}

    const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must contain 'name'`
          }
        })
      
        FoldersService.updateFolderss(
          req.app.get('db'),
          req.params.folder_id,
          folderToUpdate
        )
          .then(numRowsAffected => {
            res.status(204).end()
          })
          .catch(next)
  })

module.exports = foldersRouter