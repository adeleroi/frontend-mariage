
import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'


const Tilt = ({options, move, src}) => {
    const el = React.useRef()
    React.useEffect(() => {
        if(!move){
            return
        }
        VanillaTilt.init(el.current, options)
    }, [options, move])
    return (
        <div ref={el} style={{margin: '10px 10px'}}>
            <div style={{
                width:"270px",
                boxShadow: '1px 4px 16px rgb(0, 0, 0, 0.7)',
                height:"400px",
                borderRadius: '12px', display: 'grid',
                placeItems: 'center'
                }}
            >
                <img src={src} alt="" width="100%" height="100%"/>
            </div>
        </div>
    )
}

export default Tilt