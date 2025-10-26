const port = process.env.PORT || 4000;
const backendUrl = process.env.BACKEND_URL || "https://e-commerce-server-inky-alpha.vercel.app";
const clientUrl = process.env.CLIENT_URL || "https://dashdeals-8226d.web.app";

module.exports = { port, backendUrl, clientUrl };