import Contact from '../models/contact'
export const Create = (req, res)=> {
     const contact = new Contact(req.body);
     contact.save((err,data) => {
         if (err){
             return res.status(400).json({
                 error: "Không thêm đc contact"
             })
         }
         res.json(data)
     });
}
export const List = (req, res)=> {
    Contact.find((err,data)=> {
        if (err){
            return res.status(400).json({
                error: "Không có contact"
            })
        }
        res.json(data)
    })
}
export const Remove = (req,res)=> {
    const contactRemove = req.contact ;
    contactRemove.remove((err,data)=>{
        if (err){
            return res.status(400).json({
                error: "Không có contact"
            })
        }
        res.json(data)
    })
}
export const ContactById = (req,res,next,id)=> {
    Contact.findById(id).exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error: "Không có tìm đc contact"
            })
        }
        req.contact = data;
        next();
    })
}