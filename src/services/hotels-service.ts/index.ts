import { notFoundError, unauthorizedError } from "@/errors"
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { cannotShowHotels } from "@/errors";


async function checkEnrollment (userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment) throw notFoundError();
    if (enrollment.userId !== userId) throw unauthorizedError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();

    if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotShowHotels();
      }
    }
    
 


async function getHotels (userId: number) {

    await checkEnrollment(userId);

    const hotels = await hotelsRepository.findHotels();
    if (hotels.length === 0) throw notFoundError()

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