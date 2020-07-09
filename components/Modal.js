import React from 'react'

function Modal() {
    return (
        <div id="myModal" className="modal col-12 col col__Center">
                        {/* <!-- Modal content --> */}
                        <div className="modal-content col-5 ">
                            <div className="modal-header row row__spread">
                                <h2 className="col-10">Confirm ?</h2>
                                <span className="close col-1 col col__Center">&times;</span>
                            </div>
                            <div className="modal-body padding col-12 col__Center">
                                <p>Are You Sure you want to reject ?</p>
                                <div className="row row__spread">
                                    <form action="" method="post" className="col-5">
                                        <button className="btn btnY" type="submit">YES</button>
                                    </form>
                                    <div className="col-5">
                                        <button className="btn btnN">No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default Modal
