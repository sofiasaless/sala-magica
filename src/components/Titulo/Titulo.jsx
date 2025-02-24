import './style.css'

export default function Titulo ( { titulo, upper } ) {
    return (
        <>
            <div className='titulo-body'>
                <h4 style={{textTransform: (upper)?'uppercase':'none'}}>{titulo}</h4>
                <div className='break'></div>
            </div>
        </>
    );
}