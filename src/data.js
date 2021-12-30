const con = require('./connectionDb');

//CREATE
const insertData = function(createdAt,lokasi,deskripsi,updatedAt){
    return new Promise((resolve,reject)=>{
        let sql = "INSERT INTO `laporan_masyarakat`(`id`, `created_at`, `lokasi`, `deskripsi`,`foto_laporan`,`foto_sebelum`,`foto_sesudah`,`updated_at`) VALUES (NULL,'"+ createdAt +"','"+lokasi+"','"+deskripsi+"','NULL','NULL','NULL','"+updatedAt+"')";
        con.query(sql, function (err, result) {
        if(err){
            return reject(err);
        }
                    console.log("1 record inserted");
                    return resolve("berhasil");
        });
    })
}

//READ ALL
const getAllData = function(){
    return new Promise((resolve,reject)=>{
    const datadbs = [] ;
    con.query("SELECT * FROM laporan_masyarakat", function (err, result) {
        if(err){
            return reject(err);
        }
        datadbs.push(...result);
        return resolve(datadbs);
    });
    
    })
}



//READ DETAIL
const getDetailsql = function(id){
	return new Promise((resolve, reject)=>{
		let sql = "select * from laporan_masyarakat where id='"+id+"'";
            con.query(sql, function (err, result) {
                if(err){
                    return reject(err);
                }
                return resolve(result);
            }); 
	})
}

//UPDATE
const editData = function(id,lokasi, deskripsi, fotoLaporan,fotoSebelum,fotoSesudah,updatedAt){
    return new Promise((resolve, reject)=>{
        let sql = "UPDATE laporan_masyarakat SET id='"+id+"',created_at='',lokasi='"+lokasi+"',deskripsi='"+deskripsi+"',foto_laporan='"+fotoLaporan+"', foto_sebelum='"+fotoSebelum+"', foto_sesudah='"+fotoSesudah+"', updated_at='"+updatedAt+"' WHERE id = '"+id+"'";
        con.query(sql, function (err, result) {
                if(err){
                    return reject(err);
                }
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

module.exports = {getAllData,getDetailsql,editData, insertData,deleteData};