const express = require('express');
const router = express();
const books = [
    {id:1, type:'Romance'},
    {id:2, type:'Detective and Mystery'},
    {id:3, type:'Biographies'},
    {id:4, type:'Fantasy'},
    {id:5, type:'Horror'}
];

router.get('/',(req,res)=>{
    res.send(books);
});

router.get('/:id',(req,res)=>{
    const book = books.find(book=>book.id === parseInt(req.params.id))
    if (!book) return res.status(400).send('Book cannot be found.');
    res.send(book);
});
router.put('/:id',(req,res)=>{
    const book = books.find(book => book.id === parseInt(req.params.id))
    if(!book) return res.status(400).send('Book cannot be found.')
    
    const { error } = validateBook(req.body)
    if(error){
        res.status(400).send(error)
        return;
    };

    book.type = req.body.type;
    res.send(book);
});

router.post('/',(req,res)=>{
    const { error }= validateBook(req.body)
    if (error){
        res.status(400).send(error)
        return;
    };
    const book = 
        {
            id: books.length + 1,
            type: req.body.type 
        };
    
    books.push(book);
    res.send(book);
});

router.delete('/:id',(req,res)=>{
    const book = books.find(book => book.id === parseInt(req.params.id))
    if (!book) return res.status(400).send('Book cannot be found')
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});
function validateBook(book){
    const schema = {
        type : Joi.string().min(3).required()
    };
    return schema.validate(book)
    
};
//const port = process.env.PORT ||3000;

module.exports = router;