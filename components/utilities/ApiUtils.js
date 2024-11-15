import fetcher from '../utilities/Fetcher';
import urls from '../utilities/Urls';
import { _listEmptyComponent } from '../utilities/Utils';

/**
 * Retrieves the list of provinces for a given region.
 * @async
 * @param {string} regioneId - The ID of the region.
 * @returns {Promise<Array>} - A promise that resolves to an array of provinces.
 * @throws Will throw an error if the fetch fails.
 */
export const getProvinceByRegione = async (regioneId) => {
    try {
        let json = await fetcher(urls.province.url + "&regione=" + regioneId);
        return json;
    } catch (error) {
        console.error("Error: " + error);
        throw error;
    }
};