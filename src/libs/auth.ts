import { request } from "./request";

export const loginWidthCredentials = async (data: any) => 
  request('api/login', {
    method: 'POST',
    data,
  }).then((data) => data)