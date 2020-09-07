const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context( new Postgres() )
const MOCK_HEROI_CADASTRAR = {
    nome: 'Gavião Negro',
    poder: 'Flexas'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: 'Batman',
    poder: 'Dinheiro'
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        await context.connect()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('PostgreSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Cadastrar Heróis - POSTGRES', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Listar Heróis  - POSTGRES', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar Heróis - POSTGRES', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const result = await context.update(itemAtualizar.id, novoItem)
        assert.deepEqual(result.nome, novoItem.nome)
    })
})