import Org from "../model/organization.model"
import { IOrgValSchema } from "../validation/organization.validation"

class OrgService {
    async createOrg (payload:IOrgValSchema){
        const res = await Org.create(payload);
        return res;
    }
}

export default OrgService;