
export default function Dropdown({ placeholder, data, referencia, name, onChangeHandler }) {
    return (
        <select defaultValue='0' className='input' ref={referencia} name={name} onChange={onChangeHandler}>
            <option disabled value='0'>{placeholder}</option>

            {
                data?.map((item, i) => (
                    <option key={item.id} value={item.id}>{item.texto}</option>
                ))
            }
        </select>
    )
}