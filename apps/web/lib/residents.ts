import { fetchApi } from './api';
import { Resident, CreateResidentInput } from '../types/resident';

export async function getResidents(): Promise<Resident[]> {
  return fetchApi('/residents');
}

export async function createResident(data: CreateResidentInput): Promise<Resident> {
  return fetchApi('/residents', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}