import crypto from "crypto"

import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/time.js";
import { Session } from "../models/session.js";

export function createSession(userId) {
  const accessToken = crypto.randomBytes(30).toString("base64")
  const refreshToken = crypto.randomBytes(30).toString("base64")
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES)
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY)

  const newSession = Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil
  })
  return newSession
}


export function setSessionCookies(res, session) {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY
  }

  res.cookie("accessToken", session.accessToken, {
    ...cookieOptions,
    maxAge: FIFTEEN_MINUTES
  })
  res.cookie("refreshToken", session.refreshToken, {
    ...cookieOptions,
  })
  res.cookie("sessionId", session._id, {
    ...cookieOptions,
  })

}