const CITIES = '/cities'
import { BaseService } from "./BaseServices"

class CitiesService extends BaseService {

    getAllNews(){
        return this.get(CITIES)
    }
}

export default new CitiesService()
