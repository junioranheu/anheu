
export default function Dropdown({ placeholder, data, ref, name, onChangeHandler }) {
    return (
        <select className='input' ref={ref} name={name} onChange={onChangeHandler}>
            <option disabled selected value>{placeholder}</option>

            {
                data?.map((item, i) => (
                    <option key={item.id} value={item.id}>{item.texto}</option>
                ))
            }
        </select>
    )
}