const FolderService = {
  getAllFolders(knex) {
    return knex.select('*').from('noteful_folders')
  },
  insertFolders(knex, newFolders) {
    return knex
      .insert(newFolders)
      .into('noteful_folders')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex
      .from('noteful_folders')
      .select('*')
      .where('id', id)
      .first()
  },
  deleteFolders(knex, id) {
    return knex('noteful_folders').where({ id }).delete()
  },
  updateFolders(knex, id, newFoldersFields) {
    return knex('noteful_folders').where({ id }).update(newFoldersFields)
  }

}

module.exports = FolderService