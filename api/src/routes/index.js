const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require ("axios");
const {Country, Activity} = require('../db');
const router = Router();
const sequelize = require ("sequelize");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getCountries = async() => {
    const countriesTable = await Country.findAll({
        include: [{model: Activity}],
    })
    if(countriesTable.length === 0){
        try {
            const api = await axios.get("https://restcountries.com/v3/all");
            const apiInfo = await api.data.map(e => {
            return{
                id : e.cca3,
                name: e.name.common,
                flag: e.flags[0],
                continent: e.continents[0],
                capital: e.capital,
                subregion: e.subregion,
                area: e.area,
                population: e.population
            };
        });
        
        apiInfo.map(async (e) => {
            await Country.findOrCreate({
                where: {
                    id: e.id,
                    name: e.name,
                    flag: e.flag,
                    continent: e.continent,
                    capital: e.capital ? e.capital[0] : "Capital not found",
                    subregion: e.subregion ? e.subregion : "Subregion not found",
                    area: e.area,
                    population: e.population
                },
            });
        });
        return apiInfo;
        } catch (error){
            console.log(error);
        }
    }else{
        return (countriesTable);
    }
}

router.get("/countries" , async (req, res) => {
    const {name} = req.query;
    if(name === undefined || !name){
        const allCountries = await getCountries();
        res.status(200).json(allCountries);
    }else if(name){
        const country = await Country.findAll({
            where: {
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("name")),
                    "LIKE",
                    name.toLowerCase() + "%"
                ),
            },
        });

        if(country.length !== 0){
            res.json(country);
        }else{
            res.json("Country not found")
        }
    }
});


router.get("/countries/:idPais", async (req, res) => {
    const {idPais} = req.params;
    try{
        const getPais = await Country.findByPk(idPais.toUpperCase(), {
            include: [{
                model: Activity
            }]
        });
        if(getPais !== null){
            res.json(getPais);
        }else{
            res.json("Country not found");
        }
    }catch (error){
        console.log(error);
    }
});

router.post ('/activity', async (req, res) => {
    const {name, difficulty, duration, season, countries} = req.body;
    try {
        const [activity, created] = await Activity.findOrCreate({//el primero me da una tabla con los datos que le estoy pidiendo y el segundo es un booleano, si da false es porque ya estaba creado, y si da true es xq lo creo
            where: { name: name},
            defaults: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season
            }
        });
        
        if (created === true) {
            let paises = await Country.findAll({
                where: { 
                    id: countries 
                } 
            });

            for (let value of paises) {
            await value.addActivity(activity.dataValues.id);//lleno la tabla intermedia, haciendo la relacion entre la actividad creada y
            } 
            res.json(activity);
        } 
        res.send('That activity already exists');
    } catch (error) {
        console.log(error);
    }
});

router.get('/activity', async (req, res) => {
    try{
        const activities = await Activity.findAll({ 
            attributes: ["name", "id"]
        });
        if (activities.length !== 0) {
            res.json(activities);
        } else {
            res.json([{name: "There is no activities"}]);
        }
    } catch(error){
        res.json(error)
    }
});

module.exports = router;
