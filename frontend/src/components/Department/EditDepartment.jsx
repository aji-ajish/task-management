import { useParams } from "react-router-dom"
import MetaData from "../layouts/MetaData"
import SideMenu from "../layouts/SideMenu"


const EditDepartment = () => {

    const { id } = useParams()

    return (
        <>
            <MetaData title={"All Users"} />
            <SideMenu noClass>
                <main className="py-14 w-1/2 ">
                    <div className={`${'relative overflow-x-auto shadow-md sm:rounded-lg max-h-full '}`}>
                        {id}
                    </div>
                </main>
            </SideMenu>
        </>
    )
}

export default EditDepartment
