import '../styles/languageSelector.css'

const LangaugeSelector = ({ handleChange }: { handleChange: React.ChangeEventHandler}) => {

    // const [selectedValue, setSelectedValue] = useState<Language>();

    // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedValue(event.target.value as Language)
    // }

  return (
    <div id='language-selector' className='language-selector'>
        <select onChange={handleChange}>
            <option value={"javascript"}>Javascript</option>
            <option value={"python"}>Python</option>
            <option value={"java"}>Java</option>
        </select>

    </div>
  )
}

export default LangaugeSelector