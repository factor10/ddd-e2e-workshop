import { Guid } from "guid-typescript";
import { Consultant, IConsultantAgent } from "src/domain-model";

export class ConsultantAgent implements IConsultantAgent {
  private consultantMap: Map<string, Consultant> = new Map<
    string,
    Consultant
  >();

  constructor() {
    const pelle = new Consultant(
      Guid.parse("11edb330-6b82-bc0a-a509-00340fd7125f"),
      "Per",
      "Persson"
    );
    this.consultantMap.set(pelle.person.fullName, pelle);

    const stina = new Consultant(
      Guid.parse("c10d7a1d-798e-cb7e-81c7-a3b8de5d3720"),
      "Stina",
      "Johansson"
    );
    this.consultantMap.set(stina.person.fullName, stina);

    const bruce = new Consultant(
      Guid.parse("597e30db-f055-ea56-f3d7-9744b0f17816"),
      "Bruce",
      "Wayne"
    );
    this.consultantMap.set(bruce.person.fullName, bruce);
  }

  theOneWithFullName(fullName: string): Consultant | undefined {
    return this.consultantMap.get(fullName);
  }

  theOneWithId(id: Guid): Consultant | undefined {
    return this.all().find((c: Consultant) => c.id.equals(id));
  }

  all(): Consultant[] {
    return Array.from(this.consultantMap.values());
  }
}
