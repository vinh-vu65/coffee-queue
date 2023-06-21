import DrinkOrder from './Types'

interface TableProps {
    data: DrinkOrder[];
    onRemove: (index: number) => void;
  }
  
  const Table: React.FC<TableProps> = ({ data, onRemove }) => {
    const handleRemove = (index: number) => {
        onRemove(index);
      };

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Drink</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
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
