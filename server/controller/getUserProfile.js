
const getUserProfile = (req,res) =>{
    username = req.username
    email = req.email
    res.json({username,email})
}

module.exports = getUserProfile