import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  const allCookies = Object.keys(req.cookies);

  // console.log(allCookies);
  const subscriptions = allCookies.map((item: string) => {
    const serialized = serialize(item, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    return serialized;
  });
  console.log(subscriptions);
  if (!subscriptions)
    return res.status(400).json({
      status: "error",
      message: "user is not subcribed to this service",
    });

  res
    .setHeader("Set-Cookie", subscriptions)
    .send({ message: "Logout succesfull" });

  res.send({});
  return res.status(200).json({
    message: "Logout successful",
  });
}
