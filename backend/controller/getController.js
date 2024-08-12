
const get = (req,res) =>{
    console.log(req.body);
    res.status(200).json({l:0})
}
module.exports = get