class User {
    constructor(
        id,
        {
            name,
            email,
            password,
            address,
            phone,
            type,
            creationStatus = "creado",
            accessStatus = "habilitado",
        }
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.type = type;
        this.creationStatus = creationStatus;
        this.accessStatus = accessStatus;
    }
}

module.exports = { User };
