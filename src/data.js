const con = require('./connectionDb');

//CREATE
const insertData = function(createdAt,lokasi,deskripsi){
    return new Promise((resolve,reject)=>{
        let sql = "INSERT INTO `laporan_masyarakat`(`id`, `waktu`, `lokasi`, `deskripsi`) VALUES (NULL,'"+ createdAt +"','"+lokasi+"','"+deskripsi+"')";
        con.query(sql, function (err, result) {
        if (err) throw err;
                    console.log("1 record inserted");
                    return resolve("berhasil");
        });
    })
}

//READ ALL
const datadbs = [] ;
con.query("SELECT * FROM laporan_masyarakat", function (err, result, fields) {
    if (err) throw err;
    datadbs.push(...result);
  });

//READ DETAIL
const getDetailsql = function(id){
	return new Promise((resolve, reject)=>{
		let sql = "select * from laporan_masyarakat where id='"+id+"'";
            con.query(sql, function (err, result) {
                if (err) throw reject("undefined");
                return resolve(result);
            }); 
	})
}

//UPDATE
const editData = function(id,waktu,lokasi,deskripsi){
    return new Promise((resolve, reject)=>{
        let sql = "UPDATE laporan_masyarakat SET id='"+id+"',waktu='"+waktu+"',lokasi='"+lokasi+"',deskripsi='"+deskripsi+"' WHERE id = '"+id+"'";
        con.query(sql, function (err, result) {
                if (err) throw err;
                if(result.affectedRows == 0){
                    return resolve("gagal");
                }
                return resolve("berhasil");
        });
    })
}

//DELETE
const deleteData = function(id){
    return new Promise((resolve, reject)=>{
        let sql = "DELETE FROM laporan_masyarakat WHERE id = '"+id+"'";
        con.query(sql, function (err, result) {
                if (err) throw err;
                if(result.affectedRows == 0){
                    return resolve("gagal");
                }
                return resolve("berhasil");
        });
    })
}

module.exports = {datadbs,getDetailsql,editData, insertData,deleteData};