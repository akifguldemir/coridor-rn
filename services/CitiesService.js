const GET_CITIES = '/cities'
import { BaseService } from "./BaseServices"

class CitiesService extends BaseService {

    getAllNews(){
        return this.get(GET_CITIES)
    }
}

export default new CitiesService()
