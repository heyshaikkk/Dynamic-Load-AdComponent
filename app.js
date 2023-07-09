const fs = require('fs');
const dotenv = require('dotenv').config();
const moment = require('moment');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const config = require('./config.json');

const port = process.env.PORT || 5051;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Function to validate date format
function isValidDateFormat(date) {
  return moment(date, 'YYYY-MM-DDTHH:mm:ss', true).isValid();
}

app.get('/', async (req, res) => {
  try {
    const currentDate = moment();

    let activeCollections = [];

    // Iterate over the collection dates in config.json
    Object.keys(config.collectionDates).forEach((collectionName) => {
      const collectionStartDate = moment(config.collectionDates[collectionName].startDate);
      const collectionEndDate = moment(config.collectionDates[collectionName].endDate);
      const startDate = config.collectionDates[collectionName].startDate;
      const endDate = config.collectionDates[collectionName].endDate;

      if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
        const errorMessage = `Invalid date format for collection '${collectionName}' at ${moment().toISOString()}`;
        console.error(errorMessage);
        fs.appendFileSync('log.txt', `[ERROR] ${errorMessage}\n`);
        return;
      }
      if (currentDate.isBetween(collectionStartDate, collectionEndDate)) {
        activeCollections.push(collectionName);
      }
    });

    console.log('Active Collections:', activeCollections);
    fs.appendFileSync('log.txt', `[INFO] Active Collections: ${activeCollections}\n`);

    let activeCollectionData = [];

    for (const collectionName of activeCollections) {
      const collectionModel = require(`./models/${collectionName}`);
      let collectionData = await collectionModel.find({});
      activeCollectionData.push({
        collectionName,
        images: collectionData,
      });
    }
    res.render('index', { activeCollections: activeCollectionData });
    console.log('Rendered index page with active collections:', activeCollectionData);
    fs.appendFileSync('log.txt', `[INFO] Rendered index page with active collections: ${JSON.stringify(activeCollectionData)}\n`);

  } catch (error) {
    console.log('Internal Server Error');
    console.error(error);
    fs.appendFileSync('log.txt', `[ERROR] Internal Server Error: ${error}\n`);
    res.status(500).send('Internal Server Error');
  }
});

const routes = require('./routes/birdsRoute.js');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  fs.appendFileSync('log.txt', `[INFO] Server running on port ${port}\n`);
});


module.exports = app;
