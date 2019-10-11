const markdownPdf = require('markdown-pdf');

function getPdfFromNote(content) {
  return new Promise((resolve, reject) => {
    markdownPdf()
      .from.string(content)
      .to.buffer(null, (error, buffer) => {
        if (error) {
          reject(error);
        } else {
          resolve(buffer);
        }
      })
  });
}

module.exports = {
  getPdfFromNote,
};