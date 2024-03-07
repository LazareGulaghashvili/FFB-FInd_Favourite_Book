// fetch data 
export function fetchBook(num, apiUrl, array,) {      
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.items && data.items.length > 0) {
                const only_thumb = data.items.filter(item => item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail)
                array.splice(0, array.length, ...only_thumb.slice(0, num))          
            } 
        })
        .catch(error => {
          throw new Error (`Error fetching data: ${error.message}`);
        });
}
// cash
export function cash(name, value, num, URL, error ) {
  var newdate = new Date
  var milisec = newdate.getTime()
    if (localStorage.getItem(name) !== null) {
      const storedTime = JSON.parse(localStorage.getItem('time'));
      if (milisec - storedTime > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(name);
        localStorage.removeItem('time');
        // fetchBook(num,  URL, value)
        return []
      }
        const jsonarray = localStorage.getItem(name) 
        return JSON.parse(jsonarray)
    } else {
        fetchBook(num,  URL, value, error);
        setTimeout(() => {
        localStorage.setItem(name, JSON.stringify(value))
        localStorage.setItem('time', JSON.stringify(milisec))

        }, 2000);
    }
} 