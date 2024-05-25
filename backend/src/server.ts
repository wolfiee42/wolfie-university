import app from "./app";
import mongoose from "mongoose";
import configaration from "./app/configaration";


async function main() {

    try {

        await mongoose.connect(configaration.database_url as string);

        app.listen(configaration.port, () => {
            console.log(`Example app listening on port ${configaration.port}`)
        });

    } catch (error) {
        console.log('Server is not connected to mongoDB.');
    }
}



main()