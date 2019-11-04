// makes error messages much nicer to the eye
function errorHandler(error, request, response, next) {
    // error 500 is general something went wrong
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Something went wrong, please send us a ticket!"
        }
    });
}

module.exports = errorHandler;