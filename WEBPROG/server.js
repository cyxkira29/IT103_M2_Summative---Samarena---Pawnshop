const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config(); 

const newCustomerRoutes = require("./routes/new-customer");
const allPawnedItemsRoutes = require("./routes/all-pawned-items");
const addItemsRoutes = require("./routes/add-items");
const deleteItemsRoutes = require("./routes/delete-items");
const newUpdateRoutes = require('./routes/newUpdate');
const redeemedItemsRoutes = require("./routes/redeem-items"); // ✅ Added redeemed items route

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// ✅ Serve static files correctly
app.use(express.static(path.join(__dirname, "public")));

// ✅ Fix MIME-type issues by setting correct headers
app.use((req, res, next) => {
    if (req.path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
    } else if (req.path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
    }
    next();
});

// ✅ Serve `new-customer.html` correctly
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "new-customer.html"));
});

// ✅ API Routes
app.use("/new-customer", newCustomerRoutes); 
app.use("/update", newUpdateRoutes); 
app.use("/all-pawned-items", allPawnedItemsRoutes);
app.use("/add-items", addItemsRoutes);
app.use("/redeem-items", redeemedItemsRoutes); // ✅ Added API route for redeemed items
app.use("/delete-items", deleteItemsRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// ✅ Error Handling
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Promise Rejection:", reason);
});
