export class Duration {
  constructor(private _minutes: number) {}

  public get minutes(): number {
    return this._minutes;
  }

  public get hours(): number {
    return this._minutes / 60;
  }

  static Create(input: string) {
    let minutes;
    if (input.includes("min")) {
      minutes = parseInt(input.replace("min", ""));
    } else if (input.includes(".")) {
      minutes = parseFloat(input) * 60;
    } else if (input.includes(":")) {
      const parts = input.split(":");
      minutes = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else {
      throw new Error("This format is not understood: " + input);
    }
    return new Duration(minutes);
  }

  toJSON(): Record<string, any> {
    return {
      minutes: this._minutes
    };
  }

  static fromJsonObject(durationObject: any): Duration {
    return new Duration(durationObject.minutes);
  }
}
