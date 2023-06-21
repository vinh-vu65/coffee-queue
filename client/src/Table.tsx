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

    const filteredDrinks = data.filter((row) => row.Location === selectedLocation)

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
          {filteredDrinks.map((row, index) => (
            <tr key={index}>
              <td>{row.Name}</td>
              <td>{row.Drink}</td>
              <td><button onClick={() => handleRemove(index)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
