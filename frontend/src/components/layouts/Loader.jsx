
export default function Loader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-red-700"></div>
                <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-400 animate-spin">
                </div>
            </div>
        </div>
    )
}