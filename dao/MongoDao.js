class MongoDao {
    constructor(model) {
        this.model = model;
    }
    async getAll() {
        try {
            return await this.model.find({}).lean();
        } catch (error) {
            throw error;
        }
    }
    async findByDbId(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            return await this.model.findOne({ id: id }).lean();
        } catch (error) {
            throw error;
        }
    }
    async save(data) {
        try {
            const newItem = new this.model(data);
            await newItem.save();
            return newItem;
        } catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            return await this.model.deleteOne({ id: id });
        } catch (error) {
            throw error;
        }
    }
    // TODO: ver que funcione correctamente
    async update(data) {
        try {
            return await this.model.findOneAndUpdate(
                { id: data.id },
                {
                    ...data,
                },
                // devuelve el documento actualizado
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw error;
        }
    }
}
module.exports = { MongoDao };
