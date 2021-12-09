const { nanoid } = require('nanoid');
const notes = require('./notes');


// POST HANDLER
const addNoteHandler = (request, h) => {
	const { lokasi,fotoName, deskripsi } = request.payload;

	const id = nanoid(16);
	const createdAt = new Date().toISOString();
	const updatedAt = createdAt;

	const newNote = {
		id,
		lokasi,
		fotoName,
		deskripsi,
		createdAt,
		updatedAt,
	};

	notes.push(newNote);

	const isSuccess = notes.filter((note) => note.id === id).length > 0;

	if (isSuccess) {
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
		notes,
	},
});


//GET DETAIL HANDLER
const getNoteByIdHandler = (request, h) => {
	const { id } = request.params;

	const note = notes.filter((n) => n.id === id)[0];

	if (note !== undefined) {
		return {
			status: 'success',
			data: {
				note,
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

//edit
const editNoteByIdHandler = (request, h) => {
	const { id } = request.params;

	const { lokasi,fotoName, deskripsi} = request.payload;
	const updatedAt = new Date().toISOString();

	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		notes[index] = {
			...notes[index],
			lokasi,
			fotoName,
			deskripsi,
			updatedAt,
		};

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

//delete
const deleteNoteByIdHandler = (request, h) => {
	const { id } = request.params;

	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		notes.splice(index, 1);
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
