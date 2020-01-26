import http from 'axios'

export function fetchPneumoniaList() {
  return http.get(`/pneumonia/list`)
}
