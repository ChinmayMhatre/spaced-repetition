import Link from "next/link"
const CommonNavLinks = () => {
    return (
        <ul className='flex items-center gap-6'>
            <li>
                <Link href={"/"}>
                    <h1 className='text-lg'>Learn</h1>
                </Link>
            </li>
            <li>
                <Link href={"/words"}>
                    <h1 className='text-lg'>Words</h1>
                </Link>
            </li>
        </ul>
    )
}

export default CommonNavLinks