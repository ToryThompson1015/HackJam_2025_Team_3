require("dotenv").config(); // Load environment variables

var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var swaggerUi = require('swagger-ui-express');
var swaggerSpec = require('./config/swagger');
var app = express();

var connectDB = require("./config/database");
//router path
var authRouter = require("./routes/authRoute");
const achievementRoutes = require('./routes/achievementRoutes');
const engagementRoutes = require('./routes/engagementRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');
const mcpRoutes = require('./routes/dashboardRoutes');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Connect Database using the method defined in database.js
connectDB();

app.get("/", (req, res) => res.send("You are in server"));

app.use("/auth", authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/achievements', achievementRoutes);
app.use('/api/engagements', engagementRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/dashboard', mcpRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
