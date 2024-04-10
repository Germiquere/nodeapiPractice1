const { userModel } = require("../models/user");
const { MongoDao } = require("./MongoDao");
let instance = null;
class UserDao extends MongoDao {
    constructor() {
        super(userModel);
    }
    async findByEmail(email) {
        try {
            return await this.model.findOne({ email: email }).lean();
        } catch (error) {
            throw error;
        }
    }
    static getInstance() {
        if (!instance) {
            instance = new UserDao();
        }
        return instance;
    }
}
module.exports = { UserDao };
