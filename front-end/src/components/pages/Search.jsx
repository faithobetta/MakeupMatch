
import Select from 'react-select'


const Search = () => {

    const options = [
        { value: 'barking_dagenham', label: 'Barking and Dagenham' },
        { value: 'barnet', label: 'Barnet' },
        { value: 'bexley', label: 'Bexley' },
        { value: 'brent', label: 'Brent' },
        { value: 'bromley', label: 'Bromley' },
        { value: 'camden', label: 'Camden' },
        { value: 'croydon', label: 'Croydon' },
        { value: 'ealing', label: 'Ealing' },
        { value: 'enfield', label: 'Enfield' },
        { value: 'greenwich', label: 'Greenwich' },
        { value: 'hackney', label: 'Hackney' },
        { value: 'hammersmith_fulham', label: 'Hammersmith and Fulham' },
        { value: 'haringey', label: 'Haringey' },
        { value: 'harrow', label: 'Harrow' },
        { value: 'havering', label: 'Havering' },
        { value: 'hillingdon', label: 'Hillingdon' },
        { value: 'hounslow', label: 'Hounslow' },
        { value: 'islington', label: 'Islington' },
        { value: 'kensington_chelsea', label: 'Kensington and Chelsea' },
        { value: 'kingston_upon_thames', label: 'Kingston upon Thames' },
        { value: 'lambeth', label: 'Lambeth' },
        { value: 'lewisham', label: 'Lewisham' },
        { value: 'merton', label: 'Merton' },
        { value: 'newham', label: 'Newham' },
        { value: 'redbridge', label: 'Redbridge' },
        { value: 'richmond_upon_thames', label: 'Richmond upon Thames' },
        { value: 'southwark', label: 'Southwark' },
        { value: 'sutton', label: 'Sutton' },
        { value: 'tower_hamlets', label: 'Tower Hamlets' },
        { value: 'waltham_forest', label: 'Waltham Forest' },
        { value: 'wandsworth', label: 'Wandsworth' },
        { value: 'westminster', label: 'Westminster' }
    ];
    
  return (
    <div>
      <Select options={options} />
    </div>
  
  )
}

export default Search
