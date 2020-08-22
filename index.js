const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")
        .option('-i, --id [value]', "ID do Herói")

        .option('-c, --cadastrar', "Cadastrar um Herói")
        .option('-l, --listar', "Listar um Herói")
        .option('-r, --remover', "Remove um Herói pelo ID")
        .option('-a, --atualizar [value]', "Atualizar um Herói pelo ID")

        .parse(process.argv)

    const heroi = new Heroi(Commander)

    try {

        if (Commander.cadastrar) {

            delete heroi.id

            const resultado = await Database.cadastrar(heroi)
            
            if (!resultado) {
                console.error('Herói não foi cadastrado!')
                return
            }

            console.log('Herói cadastrado com sucesso!')
        }

        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return
        }

        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)

            if (!resultado) {
                console.error('Não foi possível remover o Herói')
                return
            }

            console.log('Herói removido com sucesso!');
        }

        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if (!resultado) {
                console.error('Não foi possível atualizar o Heróis!')
                return
            }

            console.log('Herói atualizado com sucesso!')
        }
    } catch (error) {
        console.error('DEU RUIM ', error);
    }
}

main()