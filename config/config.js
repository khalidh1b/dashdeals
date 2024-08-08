const port = process.env.PORT || 5000;
const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

module.exports = { port, backendUrl, clientUrl };
