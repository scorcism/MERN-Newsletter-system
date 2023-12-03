const express = require("express");

const router = express.Router();

const authRoutes = require('./authRoutes');
const rootRoutes = require('./rootRoutes');

const routes = [
    {
        path: "/auth", routes: authRoutes
    },
    {
        path: "/root", routes: rootRoutes
    }
]

routes.forEach((route) => {
    router.use(route.path, route.routes)
})

module.exports = router;
