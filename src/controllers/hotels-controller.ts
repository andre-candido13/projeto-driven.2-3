import { AuthenticatedRequest } from "@/middlewares";
import { NextFunction, Response } from "express";
import  httpStatus  from "http-status";
import hotelsService from "@/services/hotels-service.ts";



export async function getHotels (req: AuthenticatedRequest, res: Response, next: NextFunction) {

  const userId = req.userId
try {
    const hotels = await hotelsService.getHotels(userId)
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
   next(error);
  
}
}


export async function getHotelById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
try {
  const userId = req.userId
  const hotelId = req.params

  const getHotel = await hotelsService.getHotelById(Number(userId), Number(hotelId))

  return res.status(httpStatus.OK).send(getHotel);
} catch (error) {
 next(error)
}
}




