import { notFoundError } from "@/errors"
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketsRepository from "@/repositories/tickets-repository";


async function checkEnrollment (userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();

  
}

async function getHotels (userId: number) {

    await checkEnrollment(userId);

    const hotels = await hotelsRepository.findHotels();
    if (!hotels || hotels.length === 0) {
      throw notFoundError();
    }
    return hotels;
  }


async function getHotelById (userId: number, hotelId: number) {

await checkEnrollment(userId)

const getHotelWithRooms = await hotelsRepository.getHotelWithRooms(hotelId);
if (!getHotelWithRooms) throw notFoundError();


return getHotelWithRooms

}


const hotelsService = {
    getHotels,
    getHotelById
}

export default hotelsService;