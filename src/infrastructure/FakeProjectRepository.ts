import {
  Consultant,
  Customer,
  IProjectRepository,
  Project
} from "src/domain-model";
import { ConsultantAgent, CustomerAgent } from "src/anti-corruption-layer";

export class FakeProjectRepository implements IProjectRepository {
  private data = new Array<Project>();
  private customerAgent = new CustomerAgent();
  private consultantAgent = new ConsultantAgent();

  constructor() {
    const customer = <Customer>this.customerAgent.theOneWithName("factor10");
    const newApp = new Project(customer, "New app");
    const dddPres = new Project(customer, "DDD presentation");

    const stina = <Consultant>(
      this.consultantAgent.theOneWithFullName("Stina Johansson")
    );
    const per = <Consultant>(
      this.consultantAgent.theOneWithFullName("Per Persson")
    );
    const bruce = <Consultant>(
      this.consultantAgent.theOneWithFullName("Bruce Wayne")
    );
    newApp.addConsultant(stina);
    newApp.addConsultant(per);
    newApp.addConsultant(bruce);
    dddPres.addConsultant(stina);

    this.data.push(newApp, dddPres);
  }

  projectsForConsultant(consultant: Consultant): Promise<Array<Project>> {
    return Promise.resolve(
      this.data.filter((p: Project) =>
        p.consultants
          .map(c => c.id.toString())
          .includes(consultant.id.toString())
      )
    );
  }
}
