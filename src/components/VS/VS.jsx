import FootballLineup from "../FootballLineup"

const VS = () => {
    return (
        <div>
            {/* <h1>VS Mode</h1> */}
        <div className="container py-4 mt-4">

            <div className="row">
                <div className="col-md-6 mb-4">
                    <FootballLineup isVS={true} />
                </div>
                <div className="col-md-6 mb-4">
                    <FootballLineup isVS={true} />
                </div>
            </div>
        </div>
        </div>
    )
}

export default VS;
