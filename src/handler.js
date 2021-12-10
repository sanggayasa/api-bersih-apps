const { nanoid } = require('nanoid');
const notes = require('./notes');
const {datadbs,getDetailsql,editData,insertData,deleteData} = require('./data');
const con = require('./connectionDb');

// POST HANDLER
const addNoteHandler = async (request, h) => {
	const { lokasi,fotoName, deskripsi } = request.payload;

	const id = nanoid(16);
	const createdAt = new Date().toISOString();
	const updatedAt = createdAt;
    const insertdatadb = await insertData(createdAt,lokasi,deskripsi);
	if(insertdatadb == "berhasil"){
		const response = h.response({
			status: 'success',
			message: 'Catatan berhasil ditambahkan',
			data: {
				noteId: id,
			},
		});
		response.code(201);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal ditambahkan',
	});
	response.code(500);
	return response;
};

// GET HANDLER
const getAllNotesHandler = () => ({
	status: 'success',
	data: {
		datadbs,
	},
});


//GET DETAIL HANDLER
const getNoteByIdHandler = async(request, h) => {
	const { id } = request.params;
	const getdata = await getDetailsql(id);
	const [datadetail] = getdata;
	if (getdata.length > 0) {
		return {
			status: 'success',
			data: {
				datadetail,
			},
		};
	}

	const response = h.response({
		status: 'fail',
		message: 'Catatan tidak ditemukan',
	});
	response.code(404);
	return response;
};

//EDIT
const editNoteByIdHandler = async(request, h) => {
	const { id } = request.params;

	const { lokasi,fotoName, deskripsi} = request.payload;
	const editdata = await editData(id,lokasi,fotoName, deskripsi);

	if (editdata == "berhasil") {


		const response = h.response({
			status: 'success',
			message: 'Catatan berhasil diperbarui',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui catatan. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

//DELETE
const deleteNoteByIdHandler = async(request, h) => {
	const { id } = request.params;

	const deletedb = await deleteData(id);

	if (deletedb == "berhasil") {
		const response = h.response({
			status: 'success',
			message: 'Catatan berhasil dihapus',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal dihapus. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};



module.exports = {
	addNoteHandler,
	getAllNotesHandler,
	getNoteByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler,
};
