import { IResolvers } from "graphql-tools";
import { User } from "./entity/User";

import * as bcrypt from 'bcryptjs';
import { ObjectID } from "mongodb";
import { stripe } from "./stripe";

export const resolvers : IResolvers = {
    Query : {
        me :  async (_, __, {req}) => {
            console.log('req.session.userId', req.session.userId)

            if (!req.session || !req.session.userId) {
                throw new Error("There is no session")
            }

            const user = await User.findOne(req.session.userId);

            if (!user) {
                throw new Error("User not found")
            }

            console.log('Query(me):: user', user)

            return user
        },

        date : () => new Date()
    },

    Mutation : {
        register : async (_, {email, password}) => {
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({email, password : hashedPassword}).save();

            return true;
        },

        login : async (_, {email, password}, {req}) => {
            // console.log("req", req);
            console.log('email', email, 'password', password);

            const user = await User.findOne({ where: {email} });

            if (!user) {
                return null
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return null
            }

            req.session.userId = user.id

            return user
        },

        createSubscription : async (_, {source}, {req}) => {
            if (!req.session || !req.session.userId) {
                throw new Error("Not authenticated")
            }

            const user = await User.findOne(req.session.userId);

            const customer = await stripe.customers.create({
                email : user.email,
                source,
                plan : process.env.PLANID_STANDARD
            });

            user.stripeId = customer.id
            user.plan = 'standard'
            user.save()

            return user;
        }
    }
}