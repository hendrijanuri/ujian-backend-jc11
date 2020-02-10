const db = require('../connections/index')

module.exports = {
    getMovie: (req, res) => { 
        // Using query params nama or tahun
        var nama = req.query.nama || ''
        var tahun = req.query.tahun || ''

        var sql = `SELECT * FROM movies WHERE nama LIKE '%${nama}%'
                    AND tahun LIKE '%${tahun}%'`

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err)

            }

            res.status(200).send(results)
        })
    },

    getMovieById: (req, res) => {
        // Using id params 
        var sql = `SELECT * FROM movies WHERE id = ${req.params.id};`

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err)

            }

            res.status(200).send(results)
        })
    },

    deleteMovie: (req, res) => {
        var sql = `DELETE FROM movies 
                    WHERE id = ${req.params.id};`

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err)
            }

            if (results.affectedRows == 0) {
                res.status(200).send({ message: "DATA NOT EXIST OR HAS BEEN REMOVED", status: results })
            } else {
                res.status(200).send({ message: `DELETE ID=${req.params.id} SUCCESS`, status: results })
            }

        })
    },

    addMovie: (req, res) => {
        var movie = req.body

        if (movie) {
            var sql = `INSERT INTO movies SET ?;`

            db.query(sql, movie, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err)

                }

                sql = `SELECT * FROM movies WHERE id=${results.insertId}` // supaya mereturn hasil yg udah di update
                db.query(sql, (err1, result1) => {
                    if (err1) return res.status(500).send(err1)
                    console.log(result1[0])
                    return res.send({ message: "POST DATA SUCCESS ICIKIWIR", data: result1[0] })
                })

            })

        } else {
            res.status(500).send('Tolong isi body movie')
        }
    },

    editMovie: (req, res) => {
        var dataUpdate = req.body
        var sql = `UPDATE movies SET ?
                    WHERE id = ${req.params.id};`

        console.log(dataUpdate);

        db.query(sql, dataUpdate, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err)

            }

            res.status(200).send({ message: "PUT DATA SUCCESS", data: results })
        })
    }
}