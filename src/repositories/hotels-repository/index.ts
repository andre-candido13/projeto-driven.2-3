import { prisma } from "@/config";

async function findHotels () {

return prisma.hotel.findMany();

}

async function getHotelWithRooms (hotelId: number) {
    return prisma.hotel.findFirst({
        where: {
            id: hotelId
        },
        include: {
            Rooms: true

        }
    })
}


const hotelsRepository = {
    findHotels,
    getHotelWithRooms
}

export default hotelsRepository;
