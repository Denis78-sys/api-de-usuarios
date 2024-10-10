import express from "express";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express()
app.use(express.json())

// Configuração do CORS para permitir todos os métodos necessários
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });


//MÉTODO GET
app.get('/usuarios', async (req, res) =>{
    let users = []
    try{
        users = await prisma.user.findMany()
    }catch(error){
        console.log(error)
    }
    res.status(200).json(users)
})

//MÉTODO POST
app.post('/usuarios', async (req, res) =>{
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).send('Usuário criado')
})

//MÉTODO DELETE
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({mensagem: "Usuário deletado"})
})

app.listen(3000)