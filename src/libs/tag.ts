import { requestWithAuthorized } from "./request";

export const getTags = async (query?: any) => 
  requestWithAuthorized('tags?' + new URLSearchParams(query))
  .then((data) => data)
  .catch(() => [])

export const addTag = async (data: any) => 
  requestWithAuthorized('tags', {
    method: 'POST',
    data
  }).then((data) => data)

export const updateTagById = async (id: number, data: any) => 
  requestWithAuthorized(`tags/${id}`, {
    method: 'PUT',
    data
  }).then((data) => data)

export const deleteTag = async (id: number) => 
  requestWithAuthorized(`tags/${id}`, {
    method: 'DELETE',
  }).then((data) => data)

export const addTagToTask = async (data: any) => 
  requestWithAuthorized('tag-task', {
    method: 'POST',
    data
  }).then((data) => data)