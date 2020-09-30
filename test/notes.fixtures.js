function makeNotesArray() {
  return [
    {
      id: 1,
      name: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      modified: '2100-05-22T16:28:32.615Z'
    },
    {
      id: 2,
      name: 'Mark Smith',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      modified: '2100-05-22T16:28:32.615Z'
    },
    {
      id: 3,
      name: 'David Tennant',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      modified: '2100-05-22T16:28:32.615Z'
    },
    {
      id: 4,
      name: 'Samantha Jones',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      modified: '2100-05-22T16:28:32.615Z'
    },
  ];
}

function makeMaliciousNotes() {
  const maliciousNotes = {
    id: 911,
    modified: new Date().toISOString(),
    name: 'Lucifer <script>alert("xss");</script>',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedNotes = {
    ...maliciousNotes,
    name: 'Lucifer &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousNotes,
    expectedNotes,
  }
}

module.exports = {
  makeNotesArray,
  makeMaliciousNotes
}