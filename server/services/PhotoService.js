const axios = require('axios');

class PhotoService {

    constructor() {
        this.cashedData = []
    }

    async getPhotosPack(iPageNumber) {
        const aPhotosRecords = await axios.get(`${process.env.BASE_URI}/photos?_page=${iPageNumber}&_limit=50`);

        return aPhotosRecords.data;
    }

    async getAutoSuggestUsers(photoTitleSubstring) {
        // cashedData should be stored in cash after common get requests
        let aSuggestedUsers = this.cashedData.map((item) => {
            if (item.title.includes(photoTitleSubstring)) {
                return item;
            }
        });
        return aSuggestedUsers;
    }

}
module.exports = new PhotoService();