/* eslint-disable react/no-unknown-property */
import "./informationBottom.css"

const InformationBottom = () => {
    return <div className="information__bottom">
        <div className="rows_per_page">
            <p>Rows per page: 0 </p>
        </div>
        <div className="pages">
            <p>1 of 2</p>
            {/* Arrow Left */}
            <div className="arrow_left">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path d="M7 13L1.07071 7.07071C1.03166 7.03166 1.03166 6.96834 1.07071 6.92929L7 1" stroke="#9FA2B4" strokeWidth="2" stroke-linecap="round"/>
                </svg>
            </div>
            {/* Arrow Right */}
            <div className="arrow_right">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path d="M1 13L6.92929 7.07071C6.96834 7.03166 6.96834 6.96834 6.92929 6.92929L1 1" stroke="#9FA2B4" strokeWidth="2" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
    </div>
}

export default InformationBottom