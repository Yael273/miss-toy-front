import { Link } from "react-router-dom"


export function ToyPreview({ toy, onEditToy, onRemoveToy }) {

    return <section className="toy-preview">
        <h4>{toy.title}</h4>
        <p>price: {toy.price}</p>

        <div>
            <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
            <button onClick={() => { onEditToy(toy) }}>Change price</button>
            <Link to={`/toy/edit/${toy._id}`}>edit</Link>
        </div>
    </section>
}