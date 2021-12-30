const {
	addNoteHandler,
	getAllNotesHandler,
	getNoteByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler,
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/guest',
		handler: addNoteHandler,
	},
	{
		method: 'GET',
		path: '/guest',
		handler: getAllNotesHandler,
	},
	{
		method: 'GET',
		path: '/data/{id}',
		handler: getNoteByIdHandler,
	},
	{
		method: 'PUT',
		path: '/data/{id}',
		handler: editNoteByIdHandler,
	},
	{
		method: 'DELETE',
		path: '/data/{id}',
		handler: deleteNoteByIdHandler,
	},
];

module.exports = routes;
