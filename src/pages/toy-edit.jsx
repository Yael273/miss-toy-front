import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { loadToys } from "../store/action/toy.action"


export function ToyEdit(){

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    // const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    return <section className="toy-edit">
        <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

<form onSubmit={onSaveToy}>
    <label htmlFor="title">Title : </label>
    <input type="text"
        name="title"
        id="title"
        placeholder="Enter title..."
        value={toyToEdit.title}
        onChange={handleChange}
    />
    <label htmlFor="price">Price : </label>
    <input type="number"
        name="price"
        id="price"
        placeholder="Enter price"
        value={toyToEdit.price}
        onChange={handleChange}
    />

    <div>
        <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
        <Link to="/toy">Cancel</Link>
    </div>
</form>
    </section>
}