//const yelp = require('yelp-fusion');
const functions = require('firebase-functions');


// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'PBrvWsP_r9_rGWvBo8EkN8KXs0ii7g5_-cH1El74FpbBBQewn0y34CPlxEk28nWELN54i_jwr42GlSddC16SsbwkX5I1Jby4AFe2c88SSb54SYcBKZgIBCIHAq3YX3Yx';

//const client = yelp.client(apiKey);

exports.helloWorld = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello World!", {structuredData: true});

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');

  
   if (req.method === 'OPTIONS') {
     res.end();
    }
    else{
    res.status(200).send({data: "{msg: Rishi}"});
    }
});

// exports.yelpSearch = functions.https.onRequest((req, res) => {
//   functions.logger.info("Hello yelp!", {structuredData: true});
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
//   res.set('Access-Control-Allow-Headers', '*');

  
//    if (req.method === 'OPTIONS') {
//      res.end();
//     }
//   else{

//     var str_term = req.body.data.term;
//     var str_location = req.body.data.location
//     functions.logger.info("term: "+  str_term+ " location:"+str_location, {structuredData: true});
    
//     const searchRequest = {
//       term: str_term,
//       location: str_location
//     };
//     client.search(searchRequest).then(response => {
//       const result = response.jsonBody.businesses;
//       const prettyJson = JSON.stringify(result, null, 4);
//       res.status(200).send({data: prettyJson});
//       return prettyJson;
//     }).catch(e => {
//       console.log(e);
//       res.status(400).send({data: "{msg: error!}"});
//       return e;
//     });
//   }
// });


