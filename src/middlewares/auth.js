

const AdminAuth = (req, res, next) => {
    const token = "akhil";
    const isAuthorized = token == "akhil";
    if (!isAuthorized) {
        res.status(401).send("Unauthorized request!!");
    }
    else {
        next();
    }
};

module.exports = {
    AdminAuth,
};
