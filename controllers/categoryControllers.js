const db = require('../connections/index')

module.exports = {
    getCategory : (req, res) => {
        var nama = req.query.nama ? req.query.nama : ''
    
        var sql = `SELECT * FROM categories WHERE nama LIKE '%${nama}%';`
        
        db.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send(results)
        })
    },

    getCategoryById : (req, res) => {
        var sql = `SELECT * FROM categories WHERE id = ${req.params.id};`
        
        db.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send(results)
        })
    },

    deleteCategory : (req, res) => {
        var sql = `DELETE FROM categories 
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

    addCategory : (req, res) =>  {
        var nama = req.body.nama
    
        if (nama) {
            var sql = `INSERT INTO categories VALUES (NULL, '${nama}')`
        
            db.query(sql, (err, results)=>{
                if(err) {
                    console.log(err);
                    return res.status(500).send(err)       
                }

                sql = `SELECT * FROM categories WHERE id=${results.insertId}` // supaya mereturn hasil yg udah di update
                db.query(sql, (err1, result1) => {
                    if (err1) return res.status(500).send(err1)
                    console.log(result1[0])
                    return res.status(200).send({ message: "POST CATEGORY SUCCESS ICIKIWIR", data: result1[0] })
                })

            })
    
        } else {
            res.status(500).send('category is required for req.body')
        }
    },

    editCategory: (req,res) => {
        var data = req.body
        var sql = `UPDATE categories SET ?
                    WHERE id = ${req.params.id};`
    
        console.log(data);
        
        db.query(sql, data, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send({ message: "PUT DATA SUCCESS", data: results })
        })
    }
}