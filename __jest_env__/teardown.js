module.exports = async function () {
	await global.__MOUNTEBANK__.close(() => {
		process.exit();
	});
};