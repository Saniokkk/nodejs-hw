import createHttpError from "http-errors"
import bcrypt from "bcrypt"
import { createSession, setSessionCookies } from "../services/auth.js"
import { Session } from "../models/session.js"
import { User } from "../models/user.js"

export async function registerUser(req, res) {
  const { username, email, password } = req.body

  const user = await User.findOne({ email })
  if (user) throw createHttpError(400, "Email in use")

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    email,
    password: hashedPassword,
    username // mongoose pre-save створить, якщо не задано
  })

  const newSession = await createSession(newUser._id)

  setSessionCookies(res, newSession)

  res.status(201).json(newUser)
}

export async function loginUser(req, res) {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) throw createHttpError(401, "Invalid credentials")

  const isValidPassword = bcrypt.compare(password, user.password)

  if (!isValidPassword) throw createHttpError(401, "Invalid credentials")


  await Session.deleteOne({ email })

  const newSession = await createSession(user._id)

  setSessionCookies(res, newSession)

  res.status(200).json(user)
}