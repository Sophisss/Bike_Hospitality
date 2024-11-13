/**
 * Fetch data from the address and return the json object.
 * 
 * @param {*} address address to fetch data from
 * @returns data fetched from the address
 */
async function fetcher(address) {

  let json = null;

  try {
    const response = await fetch(address, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
    json = await response.json();
  } catch (error) {
    console.error(error);
  }

    return json;
}

export default fetcher;