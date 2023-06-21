export class RGPTransaction {
    Name: string;
    Location: string;
    Drink: string | null;

    getName(): string {return this.Name}
    getLocation(): string {return this.Location}    
    getDrink(): string {
        if (this.Drink === null) {
            return ""
        } 
        return this.Drink
    }

    toDrinkOrder(): DrinkOrder {
        return new DrinkOrder(this.getName(), this.getDrink(), this.getLocation());
    }
}

export class DrinkOrder {
    Name: string;
    Drink: string;
    Location: string;

    constructor(name: string, drink: string, location: string) {
        this.Name = name;
        this.Drink = drink;
        this.Location = location;
    }
    getName(): string {return this.Name}
    getDrink(): string {return this.Drink}
    getLocation(): string {return this.Location}

    toString(): string {
        return `[${this.Name}, ${this.Drink}, ${this.Location}]`
    }
}



export function Deserialise(json: string): RGPTransaction {
    return Object.assign(new RGPTransaction(), JSON.parse(json))
}

export function IsHotDrink(deserialisedBody: RGPTransaction): boolean {
    return deserialisedBody.getDrink().length > 0
}
 