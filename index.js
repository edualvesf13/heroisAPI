const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")

        .option('-c, --cadastrar', "Cadastrar um Herói")

        .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {
        if (Commander.cadastrar) {
            const resultado = await Database.cadastrar(heroi)
            
            if (!resultado) {
                console.error('Herói não foi cadastrado!')
                return
            }

            console.log('Herói cadastrado com sucesso!')
        }
    } catch (error) {
        console.error('DEU RUIM ', error);
    }
}

main()