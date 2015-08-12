import google from "googleapis";
google.options({auth: process.env.GOOGLE_API_KEY});
const youtube = google.youtube("v3");

function search_youtube(query, done) {
  youtube.search.list(
    {
      auth: process.env.GOOGLE_API_KEY,
      part: 'id,snippet',
      q: query,
      maxResults: 20,
      order: 'viewcount',
      type: 'video',
      videoEmbeddable: true,
    },
    function (err, res) {
      if (err) {
        done(err);
      } else {
        done(null, res);
      }
    }
  );
}

export default {
  lookup: function (req, res, next) {
    function finished(err, results) {
      if (err) {
        next(err);
      } else {
        res.json(results);
      }
    }
    search_youtube(req.query.q, finished);
  }
}
