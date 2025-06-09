import { Request, Response, Router} from "express"

import connection from "../db/db"
import User from "../models/user.model"

export const router = Router();

router.get('/', (req: Request, res: Response) =>
{
    console.log("users route was called")
    res.json({msg: "MyWeather App user services - check"})

})

router.post('/auth/', async (req: Request, res: Response) => {
    const { email, password } = req.body

    // code to test the db connection
    let usr: User;
    try {
        let usr = await getPassword(email)
        console.log(`The user's password is ${usr.password}`)
    }
    catch (e: unknown) {
        if (typeof e === "string")
          console.log(e.toString())
    }

    res.json({msg: `Call to authenticate a user with email: ${email} password: ${password}`})
})

router.post('/authz/', (req: Request, res: Response) => {
    res.json({msg: 'Call to authorize a user'})
})

/*
  User api functions defined in the section below
 */
const getPassword = (email: string): Promise => {
   return new Promise((resolve, reject) => {
     connection.query<User[]>(
        "SELECT password from user where email = ?", [email], 
          (err, row) => {
            if (err) 
              reject(err)
            else 
              resolve(row?.[0])
          }
     )
   })
}