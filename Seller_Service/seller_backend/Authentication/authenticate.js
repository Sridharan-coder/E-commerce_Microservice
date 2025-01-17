const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const s_id = req.params["s_id"];
    if (!authHeader) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
        return
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT);
        if (user.sub !== s_id) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized!',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("error begin ", error)
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
    }
};