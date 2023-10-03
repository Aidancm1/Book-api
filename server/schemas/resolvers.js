const { Book, User } = require('../models');
const { signToken } = require('../utils/auth.js');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('savedBooks');
        },
        getSingleUser: async ( parent, args, context) => {
            const userData = await User.findOne({
                _id: context.user._id
            }).select("-__v -password");
            return userData;

        
          },    
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, args) => {
            const {username, email, password} = args;
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
              return res.status(400).json({ message: "Can't find this user" });
            }
        
            const correctPw = await user.isCorrectPassword(password);
        
            if (!correctPw) {
              return res.status(400).json({ message: 'Wrong password!' });
            }
            const token = signToken(user);
            res.json({ token, user });
          },
          saveBook: async (parent, args, context) => {
            const {username, email, bookData} = args;
            const {user} = context;
            console.log(user);
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
              );
              return(updatedUser);
            } catch (err) {
              console.log(err);
              return res.status(400).json(err);
            }
        },
          deleteBook: async (parent, args, context) => {
            const {bookId} = args;
            const {user} = context;

            const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $pull: { savedBooks: { bookId: params.bookId } } },
              { new: true }
            );
            if (!updatedUser) {
              return res.status(404).json({ message: "Couldn't find user with this id!" });
            }
            return res.json(updatedUser);
          }, 
        },   


};