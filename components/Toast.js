import React from 'react';
import useToast from '../libs/useToast';


function Toast({variant,content,left, top, time, anim, trigger, show }) {

    const { open, setOpen, styles } = useToast({variant,left, top, time, anim, show})


    const handleClose = () => {
        trigger(false)
    }

    //when trigger is called set open
    
    return (
        <>
            {
                show && <div style={styles} className='col-3 col-s-10 toast'>
                    {content && content}
                </div>
            }
        </>
    )
}

export default Toast
