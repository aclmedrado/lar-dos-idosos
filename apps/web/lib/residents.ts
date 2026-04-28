import { fetchApi } from './api';
import { Resident, CreateResidentInput, UpdateResidentInput } from '../types/resident';

export async function getResidents(): Promise<Resident[]> {
  return fetchApi('/residents');
}

export async function createResident(data: CreateResidentInput): Promise<Resident> {
  return fetchApi('/residents', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateResident(id: string, data: UpdateResidentInput): Promise<Resident> {
  return fetchApi(`/residents/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteResident(id: string): Promise<Resident> {
  return fetchApi(`/residents/${id}`, {
    method: 'DELETE',
  });
}