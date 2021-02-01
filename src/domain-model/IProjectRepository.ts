import { Consultant, Project } from ".";

export interface IProjectRepository {
  projectsForConsultant(consultant: Consultant): Promise<Array<Project>>;
}
