import { notFoundError, unauthorizedError } from "@/errors"
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository.ts";
import ticketsRepository from "@/repositories/tickets-repository";
import { paymentRequiredError } from "@/errors";
import { Hotel, Room } from "@prisma/client";


async function checkEnrollment (userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!enrollment) throw notFoundError();
    //if (enrollment.userId !== userId) throw unauthorizedError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();

    if (ticket.status !== 'PAID' || ticket.TicketType.isRemote === true|| ticket.TicketType.includesHotel === false) {
        throw paymentRequiredError();
      }

      return [enrollment, ticket]

      
    }

async function getHotels (userId: number) {

    await checkEnrollment(userId);

    const hotels = await hotelsRepository.findHotels();
    if (hotels.length === 0) throw notFoundError()

    return hotels;
  }


async function getHotelById (hotelId: string, userId: number): Promise<Hotel & { Rooms: Room[] }>  {

  const IdHotel = Number(hotelId)

await checkEnrollment(userId)

const getHotelWithRooms = await hotelsRepository.getHotelWithRooms(IdHotel);
if (!getHotelWithRooms) throw notFoundError();

return getHotelWithRooms

}


const hotelsService = {
    getHotels,
    getHotelById
}

export default hotelsService;