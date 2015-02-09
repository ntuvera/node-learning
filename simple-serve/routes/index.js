var express = require('express');
var router = express.Router();

/* GET Status Codes Only. */
// router.get('/', function(req, res) {
//   res.send(200);
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {title: 'Simple Serve via Express' });
// });

/* GET JSON object. */
// router.get('/', function(req, res) {
//   // res.render('index', { title: 'Simple Serve via Express'});
//   res.send({
//     users: ['Nate', 'Tuvera']
//   });
//

/* GET console req params log & JSON name change. */
// router.get('/', function(req, res) {
//   console.log(req.query);
//   if (req.query.title) {
//     res.render('index', {title: req.query.title});
//   } else {
//   res.render('index', {title: 'Simple-Serve'});
//   }
// });

/* GET console log Params log (res required to stop pending forever) */
router.get('/users/:id', function(req, res){
  console.log(req.params);
  res.send(req.params.id, 200);
})
module.exports = router;
