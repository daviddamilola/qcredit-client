import React from 'react'

function useToast({variant,left,top, content, time, show}) {


    const variants = {
        success: 'green',
        danger: 'red',
        warning: 'yellow',
        default: 'black',
    }

    const [styles, setStyles] = React.useState({
        position: 'absolute',
        left: left?left:'35%',
        top: top?top:'5%',
        background: variant?variants[variant]: variants.default,
        animationName: 'animatetop',
        animationDuration: '0.4s',
        margin:' 0 auto',
    })

    React.useEffect(() => {
        const id = setTimeout(() => {
            setOpen(false)
        }, time?time:3000)

        return clearTimeout(id)
    }, [show])

    return {
        open, setOpen, styles
    }
}

export default useToast;
