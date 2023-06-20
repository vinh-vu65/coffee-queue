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
        return new DrinkOrder(this.getName(), this.getDrink());
    }
}

export class DrinkOrder {
    Name: string;
    Drink: string;

    constructor(name: string, drink: string) {
        this.Name = name;
        this.Drink = drink
    }
    getName(): string {return this.Name}
    getDrink(): string {return this.Drink}

    toString(): string {
        return `[${this.Name}, ${this.Drink}]`
    }
}



export function Deserialise(json: string): RGPTransaction {
    return Object.assign(new RGPTransaction(), JSON.parse(json))
}

export function IsHotDrink(deserialisedBody: RGPTransaction): boolean {
    return deserialisedBody.getDrink().length > 0
}
 