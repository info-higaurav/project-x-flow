import Team from "../model/team.model";
import { ITeam } from "../validation/team.validation";

class TeamService {
    async createTeam (payload:ITeam) {
        const res = await Team.create(payload);
        return res;
    }
}

export default TeamService;