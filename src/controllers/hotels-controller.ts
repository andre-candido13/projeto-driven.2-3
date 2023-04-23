import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import  httpStatus  from "http-status";
import hotelsService from "@/services/hotels-service.ts";



export async function getHotels (req: AuthenticatedRequest, res: Response) {

  const userId = req.userId
try {
    const hotels = await hotelsService.getHotels(Number(userId))
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
  }
  if (error.name === 'CannotShowHotelsError') {
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}
}


export async function getHotelById(req: AuthenticatedRequest, res: Response) {
try {
  const userId = req.userId
  const hotelId = req.params

  const getHotel = await hotelsService.getHotelById(Number(userId), Number(hotelId))

  return res.status(httpStatus.OK).send(getHotel);
} catch (error) {
  return res.sendStatus(httpStatus.NO_CONTENT);
}
}





