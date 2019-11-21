const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    console.log('at the main route');

    let query = "SELECT * FROM my_table WHERE Fatalities > 8";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }
        console.log(result);
        res.render('home', { info: result });
    })
})

router.get('/user/chart-one', (req, res) => {
    console.log('chart route one');
    
    let query = `SELECT COUNT(*) AS "Number" FROM my_table WHERE Fatalities > 8 AND Mental_Health_Issues = "Yes"`;

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }
        console.log(result);

        res.json(result[0]);
    })
})

router.get('/user/chart-two', (req, res) => {
    console.log('chart route two');

    let query = `SELECT COUNT(*) AS "Number" FROM my_table WHERE Fatalities > 8 AND Gender = "Male"`;

    sql.query(query, (err, result) => {
        if (err) {throw err; console.log(err); }
        console.log(result);

        res.json(result[0]);
    })
})

router.get('/user/chart-three', (req, res) => {
    console.log('chart route three');

    let query = `SELECT COUNT(*) AS "Number" FROM my_table WHERE Fatalities > 8 AND Race LIKE "%white%"`;

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }
        console.log(result);

        res.json(result[0]);
    })
})

module.exports = router;