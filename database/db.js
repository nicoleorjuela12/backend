import { Sequelize } from "sequelize";

const db = new Sequelize('proyecto_Mila', 'root', '',{

    host:'localhost',
    dialect:'mysql'
})

export default db;