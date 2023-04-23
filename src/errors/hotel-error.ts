import { ApplicationError } from '@/protocols';

export function cannotShowHotels(): ApplicationError {
  return {
    name: 'CannotShowHotel',
    message: 'Error to show Hotels!',
  };
}