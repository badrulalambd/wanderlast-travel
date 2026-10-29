import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins"
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import 'dotenv/config' // for esm

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("wanderlast");


export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        jwt(),
    ],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 24*60*60,
        }
    }
});