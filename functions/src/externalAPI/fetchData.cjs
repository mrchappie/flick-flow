require('dotenv').config();
const { functions } = require('firebase-functions');
const { onRequest } = require('firebase-functions/v2/https');
const authUser = require('../utils/authUser.cjs');

const fetchDataFromTMDB = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed', status: 405 });
    return;
  }

  authUser(req, res, async () => {
    try {
      const requesterID = req.user;
      if (!requesterID) {
        return res.status(401).json({ message: 'Unauthorized', status: 401 });
      }

      const originalUrl = req.originalUrl;
      const tmdbBaseUrl =
        process.env.TMDB_API_ORIGIN || functions.config().tmdb.api.origin;

      const url = `${tmdbBaseUrl}${originalUrl}`;

      const response = await fetch(url, {
        method: req.method,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${
            process.env.TMDB_ACCESS_TOKEN ||
            functions.config().tmdb.access.token
          }`,
        },
      });

      const jsonData = await response.json();

      return res.status(response.status).json({
        message: 'Lists data fetched successfully',
        data: jsonData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: 'Something went wrong',
        details: error,
        status: 500,
      });
    }
  });
});

module.exports = fetchDataFromTMDB;
