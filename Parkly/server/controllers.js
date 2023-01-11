import Park from './db.js';

const controller = {

  getParks: function(req, res) {
    let requestFilters = JSON.parse(req.query.filters);
    let queryFilters = {};

    if (requestFilters.hasOwnProperty('miles') && requestFilters.miles) {
      queryFilters.location = {
        $geoWithin: {
          $centerSphere: [requestFilters.currentLoc, (requestFilters.miles / 3959)]
        }
      };
    }

    if (requestFilters.hasOwnProperty('activities') && requestFilters.activities.length) {
      queryFilters.activities = {$elemMatch: { name: { $in: requestFilters.activities }}};
    }

    if (requestFilters.hasOwnProperty('designation') && requestFilters.designation.length) {
      queryFilters.designation = {'$in': requestFilters.designation};
    }

    if (requestFilters.hasOwnProperty('states') && requestFilters.states.length) {
      queryFilters.states = {'$in':requestFilters.states};
    }

    if (requestFilters.hasOwnProperty('saved')) {
      queryFilters = { saved: true }
    }

    if (requestFilters.hasOwnProperty('_id')) {
      queryFilters = { _id }
    }

    return Park.find(queryFilters)
      .catch((err) => {
        res.status(501).send(err);
      })
      .then((results) => {
        // res.cookie('cookieName', 'cookieValue', { SameSite: 'none', secure: true})
        res.status(200).send(results);
      })
  },

  getPark: function(req, res) {
    return Park.findById(req.params.id)
      .catch((err) => {
        res.status(501).send(err);
      })
      .then((results) => {
        res.status(200).send(results);
      })
  },

  getParkNames: function(req, res) {
    // return Park.find({ fullName: { "$regex": req.body.name, "$options": "i" } }, 'fullName _id')
    return Park.find({}, 'fullName _id')
      .catch((err) => {
        res.status(501).send(err);
      })
      .then((results) => {
        // res.cookie('cookieName', 'cookieValue', { SameSite: 'none', secure: true})
        res.status(200).send(results);
      })
  },

  savePark: function(req, res) {
    let _id = req.params.id;
    let saved = req.body.saved;
    console.log(_id, saved);
    return Park.findOneAndUpdate({ _id }, { saved })
      .catch((err) => {
        res.status(501).send(err);
      })
      .then(() => {
        res.status(200).send();
      })
  },

  markVisited: function(req, res) {
    let _id = req.params.id;
    let visited = req.body.visited;
    return Park.findOneAndUpdate({ _id }, { visited })
      .catch((err) => {
        res.status(501).send(err);
      })
      .then(() => {
        res.status(200).send();
      })
  }
};

export default controller;