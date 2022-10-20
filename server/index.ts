import { connect } from "mongoose"


const uri: string = <string>process.env.DATABASE;

connectToMongo().catch(err => console.log(err));

export async function connectToMongo(): Promise<void> {
    // 4. Connect to MongoDB
    await connect(uri);

    console.log("connected to MongoDB using mongoose 6... yaayy"); // 'bill@initech.com'
}