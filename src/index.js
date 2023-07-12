/**
 * Title: Node App
 * Description: A simple node app
 * Author: Koushik
 * Date: 12-07-22
 */

/** ===========================
 * Dependencies
 ============================= */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { notFoundHandler, errorHandler } = require('./middleware/common/errorHandler');
const routes = require('./routes/v1');

const app = express();
dotenv.config();

/** ==============================
 * Establish Database Connection
 ================================ */

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connection established'))
    .catch((err) => console.log(err));

/** ============================
 * Request parser
 ============================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** =============================
 * Routes
 =============================== */
app.use('/v1', routes);

/** ----------------------
 * 404 NOT FOUND HANDLER
 ----------------------- */
app.use(notFoundHandler);
/** -------------------------
 * ERROR HANDLER
 ---------------------------- */
app.use(errorHandler);

/** ===============================
 * Server Listen
 ================================== */
app.listen(process.env.PORT, () => {
    console.log('=======APP START=========');
    console.log(`http://localhost:${process.env.PORT}`);
});
