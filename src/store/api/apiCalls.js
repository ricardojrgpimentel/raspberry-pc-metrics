class ApiCalls {
  static msiProperties(url) {
    const request = new Request(`${url}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
    return fetch(request).then(response => {
      if (response.status === 200) {
        return response.json()
      }
      return response.json().then(response => { throw (response) })
    }).catch(error => {
      throw (error)
    })
  }
}