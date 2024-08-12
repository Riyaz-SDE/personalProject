
async function getUsersController (req,res){
    try{
        const id = await req.params.id
    console.log(id);
    res.json({x:'p'})
    }
    catch(err){
        console.log(err);
    }
    
}
module.exports= getUsersController
