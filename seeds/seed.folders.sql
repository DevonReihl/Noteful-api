TRUNCATE noteful_folders, RESTART IDENTITY CASCADE;

INSERT INTO noteful_folders (folder_name)
VALUES
  ('Important'),
  ('Super Important'),
  ('Needs to be done');

