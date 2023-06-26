import DrinkOrder from './Types'

interface TableProps {
    data: DrinkOrder[];
    onRemove: (index: number) => void;
    selectedLocation: string;
  }
  
  const Table: React.FC<TableProps> = ({ data, onRemove, selectedLocation }) => {
    const handleRemove = (index: number) => {
        onRemove(index);
      };

    const filteredDrinks = data
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.Location === selectedLocation)

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Drink</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrinks.map(({ item, index }) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Drink}</td>
              <td><button onClick={() => handleRemove(index)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
