import { fetchApi } from './api';
import { Employee, CreateEmployeeInput, UpdateEmployeeInput } from '../types/employee';

export async function getEmployees(): Promise<Employee[]> {
  return fetchApi('/employees');
}

export async function createEmployee(data: CreateEmployeeInput): Promise<Employee> {
  return fetchApi('/employees', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateEmployee(id: string, data: UpdateEmployeeInput): Promise<Employee> {
  return fetchApi(`/employees/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteEmployee(id: string): Promise<Employee> {
  return fetchApi(`/employees/${id}`, {
    method: 'DELETE',
  });
}