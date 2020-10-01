TRUNCATE noteful_notes;

INSERT INTO noteful_notes (note_name, content, modified, folderId)
VALUES
('Note 1', 'this is note 1', '9/28/2020', 1),
  ('Note 2', 'this is note 2', '9/29/2020', 1),
  ('Note 3', 'this is note 3', '9/30/2020', 1),
  ('Note 4', 'this is note 4', '10/02/2020', 2),
  ('Note 5', 'this is note 5', '10/01/2020', 2);