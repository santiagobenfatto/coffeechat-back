export default class GenericRepository {
    constructor(dao){
        this.dao = dao
    }

    getAll = async () => {
        const result = await this.dao.getAll()
        return result
    }

    getById = async (id) =>{
        const result = await this.dao.getById(id)
        return result
    }

    create = async (doc) => {
        const result = await this.dao.create(doc)
        return result
    }

    updateById = async (id, updates) => {
        const result = await this.dao.updateById(id, updates)
        return result
    }

    deleteOne = async (id) => {
        const result = await this.dao.delete(id)
        return result
    }
}