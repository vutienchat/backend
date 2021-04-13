import User from '../models/user';
export const userById = (req, res,next,id) => {
    User.findById(id).exec((err, data) => {
       if (err) {
           return res.status(400).json({
               error: "User not found",
           })
       }
       req.profile = data
       next()
    })
}
export const read = (req, res) => {
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
       const data = req.profile;
        res.json(data)
}
export const update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile.id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform in action'
                })
            }
            req.profile.hashed_password = undefined;
            req.profile.salt = undefined;
            res.json(user);
        }
    )
}