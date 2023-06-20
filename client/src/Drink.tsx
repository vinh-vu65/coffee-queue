import DrinkOrder from "./Types"

export default function Drink(props: DrinkOrder) {
    let name = props.Name
    let drink = props.Drink
    return (
        <div>
            Name: {name} ... Drink: {drink}
        </div>
    )
}
