docker exec -it 494f11dd88d8 /
    mongo -u admin -p admin --authenticationDatabase herois

show dbs

use herois

// mostrar tabelas
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1988-01-01'
})

db.herois.find()
db.herois.find().pretty()

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })


// create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1988-01-01'
})

// read
db.herois.find()

// update
db.herois.update({ _id: ObjectId("5f57fb1c01225f7520d67766") }, { nome: 'Mulher Maravilha' })

db.herois.update({ _id: ObjectId("5f57fb1c01225f7520d67766") }, { $set: { nome: 'Bobou Bi' } })

// delete
db.herois.remove({}) // apaga todos
db.herois.remove({ nome: 'Bobou Bi' })