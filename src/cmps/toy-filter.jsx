import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"


export function ToyFilter({setFilterBy}){

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    setFilterBy = useRef(utilService.debounce(setFilterBy))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        setFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <section className="toy-filter">
        <form>
            <label htmlFor="title">Title:</label>
            <input type="text"
                id="title"
                name="txt"
                placeholder="By title"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <button hidden>Filter</button>
        </form>
    </section>
}