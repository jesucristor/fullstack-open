const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

if (process.argv.length > 2 && process.argv.length <= 5) {

    const password = process.argv[2]

    const url = `mongodb+srv://jesucristor:${password}@cluster0.aiv68.mongodb.net/phonebook?retryWrites=true&w=majority`

    mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('connected to DB');
        })
        .catch((err) => {
            console.log(err);
            process.exit(1)
        })

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(result)
        mongoose.connection.close()
    })

    if (process.argv.length === 3) {

        Person.find({}).then(result => {
            console.log('phonebook:');
            result.forEach(person => {
                console.log(person.name)
            })

            mongoose.connection.close()
        })
    }
}