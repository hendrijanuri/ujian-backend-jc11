const db = require('../connections/index')

module.exports = {
    getMovCat: (req,res) => {
        // GET ALL MOVIE CATEGORY
        var sql = `SELECT m.nama AS namaMovie, c.nama AS namaCategory FROM movcat mc
                    JOIN movies m ON mc.idmovie = m.id
                    JOIN categories c ON mc.idcategory = c.id;`
        
        db.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send(results)
        })
    },

    getMovCatByMovie: (req,res) => {
        // using query params ?nama=
        var sql = `SELECT m.nama AS namaMovie, c.nama AS namaCategory FROM movcat mc
                    JOIN movies m ON mc.idmovie = m.id
                    JOIN categories c ON mc.idcategory = c.id
                    WHERE m.nama = '${req.query.nama}';`
        
        db.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send(results)
        })
    },

    deleteMovCat : (req,res) => {
         var sql = `DELETE FROM movcat 
                    WHERE id = ${req.params.id};`
        
        db.query(sql, (err, results)=>{
            if(err) {
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

    addMovCat : (req,res) => {
        var movcat = req.body
        
        if (movcat) {
            var sql = `INSERT INTO movcat SET ?;`
        
            db.query(sql, movcat, (err, results)=>{
                if(err) {
                    console.log(err);
                    return res.status(500).send(err)
                            
                }
        
                sql = `SELECT * FROM movcat WHERE id=${results.insertId}` // supaya mereturn hasil yg udah di update
                db.query(sql, (err1, result1) => {
                    if (err1) return res.status(500).send(err1)
                    console.log(result1[0])
                    return res.status(200).send({ message: "POST MOVIE CATEGORY SUCCESS ICIKIWIR", data: result1[0] })
                })
            })
    
        } else {
            res.status(500).send('idmovie and idcategory is required for req.body')
        }
    }


}